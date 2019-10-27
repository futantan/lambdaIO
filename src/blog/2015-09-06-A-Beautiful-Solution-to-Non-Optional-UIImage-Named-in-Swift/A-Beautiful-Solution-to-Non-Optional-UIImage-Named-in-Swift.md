---
title: 在 Swift 中解决 UIImage 可选型的优雅姿势
path: A-Beautiful-Solution-to-Non-Optional-UIImage-Named-in-Swift
date: 2015-09-06 11:19:23
tags: [Swift]
categories: ['译文']
---

> 原文链接：[A Beautiful Solution to Non-Optional UIImage Named in Swift](http://natashatherobot.com/non-optional-uiimage-named-swift/)  
> 原文日期：2015/08/30

昨天，我抽空看了[WWDC15 Swift 实战视频](https://developer.apple.com/videos/wwdc/2015/?id=411)，对在 Swift 中如何正确使用图片名称的建议特别喜欢。

<!--more-->

问题的关键在于 `UIImage:named:` 函数有一个硬编码的 string 类型的参数，返回一个 UIImage 可选型。这意味着可能会因为输入错误而导致 UIImage 返回 nil，之后强制解包造成错误。

很显然的一个解决办法是提供一个常量文件，包含了所有图片文件名常量，但是这样做并没有在根本上解决上述问题。在 Swift 中，有一个更加优雅的方式。可以通过扩展 UIImage 类型，让其包含一个枚举类型，枚举类型中包含所有的图片名，并添加一个便利构造器(convenience initializer)使得可以通过 enum 作为参数来初始化 UIImage：

```swift
//  UIImage+Extension.swift
import UIKit

extension UIImage {

    enum AssetIdentifier: String {
        // Image Names of Minions
        case Bob, Dave, Jorge, Jerry, Tim, Kevin, Mark, Phil, Stuart
    }

    convenience init!(assetIdentifier: AssetIdentifier) {
        self.init(named: assetIdentifier.rawValue)
    }
}
```

添加了上面的代码文件之后，当需要在应用程序中使用 UIImage 时，就可以像下面这样来初始化：

```swift
let minionBobImage = UIImage(assetIdentifier: .Bob)
```

上面初始化的方法多么简洁漂亮！首先，你可以使用非常方便的枚举值——不用再使用硬编码的方式！同时，枚举值还可以使用自动补全功能！其次，返回的 UIImage 不再是一个可选值了——可以确定这个图片对象是存在的。

> 译者注：可能有读者会有疑问，写个枚举，不也是会出现打字错误什么的吗？可以通过文章最后的链接看看开源的实现，其实都是通过脚本命令，自动生成的这个枚举代码文件，并不是手动添加的，所以大可放心。

对这届 WWDC，令我印象最深的就是让编译器帮助你做更多的事情。对图片名称，使用枚举类型进行包装，不仅可以让 IDE 帮助你自动补全，还可以保证返回的 UIImage 是存在的。

我想测试一下这个功能，在 github 上创建了一个[demo](https://github.com/NatashaTheRobot/ImageNamingInSwift)。如果你想看看在项目中如何使用这个技巧，可以下载我的代码试试。

**更新**

好多读者提醒我，有一些开源的库，使用脚本，能够将图片文件名自动导入到枚举类型中
gihub 地址：

- [Shark](https://github.com/kaandedeoglu/Shark)
- [SwiftGen](https://github.com/AliSoftware/SwiftGen)
