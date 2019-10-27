---
title: Learn RxSwift The Hard Way - Geolocation (三)
tags: ['iOS', 'RxSwift']
categories: ['Learn RxSwift The Hard Way']
date: 2016-06-03 09:25:13
path: Learn-RxSwift-The-Hard-Way-Geolocation
keywords: RxSwift
---

这里我们来从头实现 RxExample 的第三个例子：GeolocationExample。如果不知道如何开始，可以参考之前的几篇博文。

<!--more-->

你可以先运行一下代码，看一下效果。每当我们改变对应用程序定位的授权，界面都会发生相应的改变。

## GeolocationService

首先我们来看提供定位功能的类：

```swift
class GeolocationService {

    private (set) var autorized: Driver<Bool>
    private (set) var location: Driver<CLLocationCoordinate2D>

    static let instance = GeolocationService()
    private let locationManager = CLLocationManager()

    private init() {...}

}
```

这里我省略了 `init` 的内容，先来看接口，之后我们会回过头来看具体的实现。很显然，这里的 `GeolocationService` 是一个标准的单例。而前两个对于外部只读的变量，就是这个 Service 对外提供的接口。

不难猜测，这里的 `autorized` 表示是否有定位权限。目前知道这些就够了，先了解骨架，后面再深入细节。

## GeolocationViewController

我们来看 `GeolocationViewController` 的核心代码。

```swift
// TAG: 终极版本
geolocationService
	.autorized
	.drive(noGeolocationView.rx_driveAuthorization)
	.addDisposableTo(disposeBag)
```

噫…这里的 `drive` 是什么，`rx_driveAuthorization` 又是什么？我们先来看 `rx_driveAuthorization`

```
private extension UIView {
    var rx_driveAuthorization: AnyObserver<Bool> {
        return UIBindingObserver(UIElement: self) { view, authorized in
            if authorized {
                view.hidden = true
                view.superview?.sendSubviewToBack(view)
            }
            else {
                view.hidden = false
                view.superview?.bringSubviewToFront(view)
            }
        }.asObserver()
    }
}
```

> Tip：这里将 extension 声明为 private，可以将其限制在该代码文件中，类似的效果可以参考 [Swift：Selector 语法糖](http://swift.gg/2016/06/02/swift-selector-syntax-sugar/)

`rx_driveAuthorization` 为一个计算属性，类型为 `AnyObserver<Bool>`。虽然目前不知道 `UIBindingObserver` 是干什么用的，不过从代码可以推测出来，通过一个 `authorized` 布尔类型的变量来控制视图的状态。

来看 `UIBindingObserver` 的构造函数

```swift
init(UIElement: UIElementType, binding: (UIElementType, Value) -> Void)
```

`UIElement` 为 UI 元素，后面为一个函数，从 `binding` 这个函数名也可以看出，当订阅的事件发生的时候，会调用这个函数。其中第二个参数 `Value` 就是这个 observer 的订阅消息类型。

理解到这里，总结一下。`rx_driveAuthorization` 为一个订阅者（observer），订阅的消息类型是 bool，然后根据这个值来作出视图的相应变化。

我们先不管上面的 `drive`，如果按照我们之前的做法，如何来实现这个功能呢？虽然不推荐，但是我们可以写出下面容易理解的代码：

```swift
// TAG: 版本1
geolocationService.autorized
    .asObservable()
    .subscribeNext { [weak self] (autorized) in
        self?.noGeolocationView.rx_driveAuthorization.onNext(autorized)
    }
    .addDisposableTo(disposeBag)
```

> Tip: 这里如果不用 weak self，会造成循环引用哦。

上面的方式应该是最容易理解的。首先将 `autorized` 转为 Observable，然后订阅 next 事件，然后显式地发送 onNext 事件。虽然这种方式可行，但是有些不妥的。我们来一步一步优化。

改写成如下代码：

```swift
// TAG: 版本2
geolocationService.autorized
    .asObservable()
    .subscribe(noGeolocationView.rx_driveAuthorization)
```

这里直接用 `subscribe` 的方式来订阅。其实如果进入源码看的话，和上面我们实现的方式差不多，不过除了 next 事件，还有 complete 等事件的处理。

好了，现在版本 2 和我们的终极版本已经很像了。我来看看，`drive` 到底做了些什么。

> Tip: 其实我们不使用 `drive` 也可以完成相应的功能，就像上面那样。这些操作符 Unit（不知道怎么翻译），其实属于 RxCocoa，并不是标准的 Rx 框架。但是通过使用这些 Unit，确实可以让我们编程更加方便。详情可以参考最后的参考链接。

drive 源码：

```swift
public func drive<O: ObserverType where O.E == E>(observer: O) -> Disposable {
    MainScheduler.ensureExecutingOnScheduler()
    return self.asObservable().subscribe(observer)
}
```

从这里我们可以看出，其实 `drive` 函数保证了之后的操作是在主线程的。下面列举了使用 Unit 的一些好处：

- 不会发送错误 （错误会导致 dispose）
- 工作在主线程 （对于 UI 操作，不用再切换线程）
- 共享同一个值 （不用再使用 shareReplay）

OK，现在我们已经完全过渡到终极版本了。Nice work！

我们现在回过头来看 `GeolocationService` 的 `init` 方法。

片段：

```swift
autorized = Observable.deferred { [weak locationManager] in
        let status = CLLocationManager.authorizationStatus() // 1
        guard let locationManager = locationManager else {
            return Observable.just(status)
        }
        return locationManager
            .rx_didChangeAuthorizationStatus // 2
            .startWith(status) // 3
    }
    .asDriver(onErrorJustReturn: CLAuthorizationStatus.NotDetermined) // 4
    .map { // 5
        switch $0 {
        case .AuthorizedAlways:
            return true
        default:
            return false
        }
    }
```

1. 首先获取了一次地理位置授权状态
2. 这里使用了 RxCocoa 的扩展，监听授权状态的变化（相比于 delegate 的方式，是不是爽多了）
3. 将之前的 status 插入到序列的开头
4. 将 Observable 转为 Observable，因为它使不回发送 error 的，所以这里要告诉它如果发生 error 直接发送 `.CLAuthorizationStatus.NotDetermined`
5. 最后将其 map 到 bool 类型

OK，`location` 也是差不多的逻辑。你可以自己琢磨看看。

如果对 `Observable.deferred` 不是很理解，可以看看 [这里](https://github.com/futantan/RxSwiftCheatSheet#deferred)

示例代码可以参见 RxSwiftExample，或者[这里](https://github.com/futantan/PrayerBlogCode)

## 参考资料

https://github.com/ReactiveX/RxSwift/blob/master/Documentation/Units.md
http://t.swift.gg/d/39-021-units
