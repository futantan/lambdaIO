---
title: Learn RxSwift The Hard Way - Calculator (二)
tags: ['iOS', 'RxSwift']
categories: ['Learn RxSwift The Hard Way']
date: 2016-05-03 22:56:36
path: Learn-RxSwift-The-Hard-Way-Calculator
keywords: RxSwift
---

To RxSwift:
初次见面，请多关照。

<!--more-->

Demo 的 GitHub 地址：[RxSwiftDemo](https://github.com/futantan/PrayerBlogCode/tree/master/RxSwiftDemo)

这里我们将实现 RxSwift Demo 中最简单的一个例子，加法器。

<img src="/media/14622874699158.jpg" width="400" />

如图所示，有三个 UITextField，代表着三个输入的数字，最后是一个显示结果的 Label。这里的逻辑很简单，就不给大家展示代码了。

主要的逻辑代码如下：

```swift
Observable.combineLatest(number1.rx_text, number2.rx_text, number3.rx_text) {
  (textValue1, textValue2, textValue3) -> Int in
  return (Int(textValue1) ?? 0) + (Int(textValue2) ?? 0) + (Int(textValue3) ?? 0)
}
.map { $0.description }
.bindTo(result.rx_text)
.addDisposableTo(disposeBag)
```

其中，`combineLatest` 的效果可以从 http://rxmarbles.com/#combineLatest 这里很直观的看到。这里是将三个被加数的值进行计算，返回它们的和。`map` 将 Int 值转为 String，`bindTo` 将 String 值赋给了 result label。最后 `addDisposableTo` 是内存管理的东西，我们以后再谈。

从我们的第一个 Demo 中，就可以看出 RxSwift 的强大之处了。如果我们使用 Cocoa 的方式来实现，需要这监听这三个 TextField 的值变化，设置代理，然后进行计算，想想都头大。这里的代码简洁明了，爽！
