---
title: 函数式编程之 map
tags: ['函数式编程']
date: 2016-04-01 11:07:13
path: functional-programming-map
---

我们常常需要对一个数组中的每一个元素进行相应的转换，例如，下面这个函数将数组中的每个元素增加 1.

```swift
func incrementArray(xs: [Int]) -> [Int] {
  var result: [Int] = []
  for x in xs {
    result.append(x + 1)
  }
  return result
}
```

<!--more-->

然而仔细考虑之后我们会发现，如果有其他的转化操作，就需要再重新写一个函数，而其他的代码逻辑都是相同的，所以，这里我们可以将转化部分的逻辑抽取成一个闭包，如下：

```swift
func doSomeThingOnArray(xs: [Int], transform: Int -> Int) -> [Int] {
  var result: [Int] = []
  for x in xs {
    result.append(transform(x))
  }
  return result
}
```

这样，我们就将会变化的代码抽取出来了，例如将所有元素乘 2:

```swift
doSomeThingOnArray([1, 2, 3]) { (element) -> Int in
  return element * 2
}
```

然而代码写到这里，并不是一个很好的版本，因为这里的类型的信息是硬编码的，所以，我们来解决这个问题，并且将代码放到 Array 的 extension 中：

```swift
extension Array {
  func map<T>(transform: Element -> T) -> [T] {
    var result: [T] = []
    for x in self {
      result.append(transform(x))
    }
    return result
  }
}
```

于是我们就可以像下面这样使用我们自己定义的 map：

```swift
[1, 2, 3].map { (x) -> Int in
  return x + 1
}
```

当然，Swift 标准库中提供了 map 的实现，定义在 `SequenceType` 协议中。

> 参考资料 objc Functional Swift
