---
title: 使用 IB 填坑记
tags: ['iOS', 'Interface Builder']
date: 2016-04-05 21:23:12
path: tips-for-IB
---

在自定义控件的时候，我们经常需要不断的运行程序来查看控件效果是否符合要求，但是每次编译运行都很浪费时间，所以我特别喜欢使用 IB 来预览效果。这篇博文主要记录两点使用注意事项。

<!--more-->

## IBInspectable

在使用`@IBInspectable`来标注属性的时候，一定要显式的指明变量类型，而不是用 type infer。如果不显式的指定，IB 将不能够识别这个属性。例如：

```swift
var bgColor: UIColor = UIColor.grayColor() {
  didSet {
    bgLayer.strokeColor = bgColor.CGColor
  }
}
```

如果没有显示的指定变量类型为 `UIColor` IB 中将不会有这个属性的选项。

## Runtime Attributes

你可以参考我的[这篇文章](http://www.futantan.com/2015/09/17/adding-user-defined-runtime-attrubute/)来看看 运行时属性 的功能。
其实，我们使用 `@IBInspectable` 的时候，其原理也是使用 Runtime Attributes 来进行属性的赋值：
![](./14598631079898.jpg)

这里需要注意的是，如果我们将其中的 `curValue` 从 `@IBInspectable` 中去掉，记得一定要回到上图这里，将这里的 `curValue` 手动删除！ Xcode 目前还没这么智能，如果运行时发现有些奇怪的赋值现象，很有可能坑在这里。

希望这两个坑能够节省你 10 分钟的 debug 时间 ^\_^
Happy Hacking!
