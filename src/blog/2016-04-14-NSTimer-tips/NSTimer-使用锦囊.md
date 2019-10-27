---
title: NSTimer 使用锦囊
tags: [iOS, NSTimer]
date: 2016-04-14 9:36:05
path: NSTimer-tips
---

![](./14605987599888.jpg)
来看看你是否被 NSTimer 坑过吧 ^\_^

<!--more-->

完整的示例代码可以可以从 [这里](https://github.com/futantan/PrayerBlogCode) 获得。

新建一个工程，再添加一个 VC，SecondViewController 效果图如下：
![14605514256732](./14605514256732-1.jpg)

可以观察到，最左边，为了方便控制器间的跳转，我们将其嵌入 Navigation Controller 中。第一个 VC 中有一个按钮，`next VC` 点击之后，会跳转到下一个控制器中；第二个控制器中添加了两个按钮，完整的代码逻辑如下：

```swift
class SecondViewController: UIViewController {

  weak var timer: NSTimer?

  override func viewDidLoad() {
    super.viewDidLoad()

    // Do any additional setup after loading the view.
  }

  deinit {
    print("in deinit")
    timer?.invalidate()
  }

  @IBAction func onFireButtonClicked(sender: AnyObject) {
    timer = NSTimer.scheduledTimerWithTimeInterval(2, target: self, selector: #selector(sayHello), userInfo: nil, repeats: true)
  }

  func sayHello(timer: NSTimer) {
    print("hello")
    print(timer)
  }

  @IBAction func onInvalidateButtonClicked(sender: AnyObject) {
    timer?.invalidate()
  }

}
```

## 注意点

1. timer 是 weak 的
2. swift 2.2 中 #selector 的用法
3. selector 的函数，也就是 sayHello 是可以接收参数的

我们来分别讨论。

对于第一点，NSTimer 的官方文档有如下说明

> Timers work in conjunction with run loops. To use a timer effectively, you should be aware of how run loops operate—see NSRunLoop and Threading Programming Guide. Note in particular that run loops maintain strong references to their timers, so you don’t have to maintain your own strong reference to a timer after you have added it to a run loop.

注意，这里说 run loops 将会对 timer 持有强引用，所以我们不需要也不应该在代码中对 timer 使用强引用。

引用的示意图如下

![](./14605527787801.jpg)

第二点是 swift 2.2 的更新，终于不怕写错函数名了。你可以[从这里](http://swifter.tips/selector/)了解更多。

关于第三点，官方文档是这么说的：

> The selector should have the following signature: timerFireMethod: (including a colon to indicate that the method takes an argument). The timer passes itself as the argument, thus the method would adopt the following pattern:
> `- (void)timerFireMethod:(NSTimer *)timer`

So far so good!

但是，大家试试点击 `fire` 按钮，然后直接用右滑返回手势将 VC 移出，会发现，控制台不停的在输出，VC 的`deinit`方法并没有调用，我们的 timer 并没有停止！

原因也是显而易见的，因为 Timer 没有被停止，而 Timer 因为 target action 的关系，有拥有 VC 的强引用，所以一直 VC 一直得不到释放，除非我们手动调用 invalidate 方法。

为了让 Timer 不持有 VC 的强引用，我们使用一个闭包来替代 target action 的方式：

```swift
extension NSTimer {
  public class func scheduledTimerWithTimeInterval(timeInterval: NSTimeInterval, repeats: Bool = false, block: () -> ()) -> NSTimer {
    return scheduledTimerWithTimeInterval(timeInterval,
                                          target: self,
                                          selector: #selector(_executeBlockFromTimer),
                                          userInfo: block,
                                          repeats: repeats)
  }

  class func _executeBlockFromTimer(timer: NSTimer) {
    // execute block
  }
}
```

但是这里出现一个问题，
![](./14605550546067.jpg)

在 [SOF](http://stackoverflow.com/questions/28211973/swift-closure-as-anyobject) 上有个解决办法，加个中间层，修改后的代码如下：

```swift
extension NSTimer {
  private class FTTimerClosureWraper {
    private (set) var timerClosure: () -> ()

    init(timerClosure: () -> () ) {
      self.timerClosure = timerClosure
    }
  }

  public class func scheduledTimerWithTimeInterval(timeInterval: NSTimeInterval, repeats: Bool = false, block: () -> ()) -> NSTimer {
    return scheduledTimerWithTimeInterval(timeInterval,
                                          target: self,
                                          selector: #selector(_executeBlockFromTimer),
                                          userInfo: FTTimerClosureWraper(timerClosure: block),
                                          repeats: repeats)
  }

  class func _executeBlockFromTimer(timer: NSTimer) {
    if let timerClosureWraper = timer.userInfo as? FTTimerClosureWraper {
      timerClosureWraper.timerClosure()
    }
  }
}
```

添加上面的方法之后，我们就可以来使用它啦。将 `onFireButtonClicked` 方法中的 timer 改为如下：

```swift
timer = NSTimer.scheduledTimerWithTimeInterval(2, repeats: true, block: {
      print("hey, our block")
    })
```

这时候再使用右滑返回，发现会输出 “in deinit”，证明 VC 已经被正确的释放了。

当然，如果你在闭包中捕获了 self，记得使用 weak，例如：

```swift
timer = NSTimer.scheduledTimerWithTimeInterval(2, repeats: true, block: { [weak self] in
 self?.test()
})
```

完整的示例代码可以可以从 [这里](https://github.com/futantan/PrayerBlogCode) 获得。

## 参考资料

- [NSTimer](https://developer.apple.com/library/ios/documentation/Cocoa/Reference/Foundation/Classes/NSTimer_Class/)
- [iOS 中的 NSTimer](http://blog.callmewhy.com/2015/07/06/weak-timer-in-ios/)
- [内存管理，WEAK 和 UNOWNED](http://swifter.tips/retain-cycle/)
- [Swift NSTimer and Blocks (Closures)](http://blog.fivelakesstudio.com/2015/11/nstimer-and-blocks-closures.html)
