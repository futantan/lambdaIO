---
title: Learn RxSwift The Hard Way - Introduction (一)
tags: ['iOS', 'RxSwift']
categories: ['Learn RxSwift The Hard Way']
date: 2016-05-03 22:15:52
path: Learn-RxSwift-The-Hard-Way-Introduction
keywords: RxSwift
---

![](http://7qnang.com1.z0.glb.clouddn.com/16-5-3/38541829.jpg)
从这篇博文开始，我准备开一个新的坑，来记录一下学习 RxSwift 的过程。

<!--more-->

## Why?

RxSwift 和 ReactiveCocoa 很类似，是一个函数式响应式编程（Functional Reactive Programming）框架，[Ray](https://www.raywenderlich.com/126522/reactivecocoa-vs-rxswift) 出了一篇比较两个框架的文章，如果你不知道该如何选取，可以看看这一篇文章。我选择的原因也很简单，我想使用纯 Swift 😂

## 阅读 Documents

[RxSwift](https://github.com/ReactiveX/RxSwift)的 README 文档中有一些简短的介绍，包括其中的链接，都通读一遍，大概对 RxSwift 有了一个大致的了解。

后面 clone 了 RxSwift 的代码，将其中的 playground 跑一遍，熟悉一下常用的操作符，
![](http://7qnang.com1.z0.glb.clouddn.com/16-5-3/48780598.jpg) 我在 [GitHub](https://github.com/futantan/RxSwiftCheatSheet) 上创建了一个 repo，将会记录一下常用的操作符及其作用（虽然 playground 跑过了，但是用的时候还是想要查看一下用法，可能刚入门还是不太熟悉吧）

目前 RxSwift 的中文文档和示例代码什么的还不是很健全，我打算使用最笨的方式，读 RxSwift Example 源码，并且自己重写一遍来学习。所以接下来的几篇博客会记录我在重写过程中遇到的问题和解决办法。

Happy Hacking!
