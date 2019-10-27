---
title: Realm 入坑系列之 String 数组
tags: [Realm]
categories: ['Realm 入坑系列']
date: 2016-03-06 22:17:48
path: fuck-realm-string-array
keywords: Realm, 数组, 坑
---

Realm 中为了建立一对多的数据模型关系，需要使用 List。List 在使用上和 Array 非常类似，然而，当我们需要表示 Swift 中的基本类型的时候，坑就来了...

<!--more-->

假设我们从服务端获取了一个字段 `tags`，这个字段是一个 String 类型的数组，我们的第一反应是这样来建立数据模型：

```
let tags = List<String>()
```

然而编译器会无情打脸

![](./14572748135230.jpg)
在 Realm 中，数据类型必须继承自 `Object`，这一点都不酷，真的...

在查看了很久官方文档之后，得出一个结论，这种写法确实是不行的。于是你必须在为了表示 String 类型，而将 String 在包裹在一个 继承自 Object 的类中，向如下的写法：

```swift
class RealmString: Object {
  dynamic var stringValue = ""
}
```

确实这是目前唯一的解决办法，如果你有更好的解决方案，可以留言。

当然，在我们无法改变结果的时候，就让我们来完善一下过程，将上面的变量声明代码改为：

```swift
let _backingTags = List<RealmString>()
var tags: [String] {
  get {
    return _backingTags.map { $0.stringValue }
  }
  set {
    _backingTags.removeAll()
    _backingTags.appendContentsOf(newValue.map({ RealmString(value: [$0]) }))
  }
}
```

上面我们定义了一个计算属性，通过 \_backingTags 来作为实际的存储值，然后使用 tags 作为使用的接口，稍微优雅了一点。

enjoy~
