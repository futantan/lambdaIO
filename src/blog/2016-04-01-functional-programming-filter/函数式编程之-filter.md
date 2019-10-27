---
title: 函数式编程之 filter
tags: ['函数式编程']
date: 2016-04-01 11:13:23
path: functional-programming-filter
---

我们先来看需求。从指定的数组中过滤出符合条件的元素，我们先来看简单的情形：

```swift
let exampleFiles = ["README.md", "HelloWorld.swift", "FlappyBird.swift"]

func getSwiftFiles(files: [String]) -> [String] {
  var result: [String] = []
  for file in files {
    if file.hasSuffix(".swift") {
      result.append(file)
    }
  }
  return result
}
```

<!--more-->

与上一篇博客的思路一样，我们来封装变化点，首先是过滤的逻辑，其次是类型信息，最后将其放在 Array 的 extension 中：

```swift
extension Array {
  func filter(includeElement: Element -> Bool) -> [Element] {
    var result: [Element] = []
    for x in self where includeElement(x) {
      result.append(x)
    }
    return result
  }
}
```

代码的思路非常清晰，于是我们可以像下面一样使用 filter 方法：

```swift
[1, 2, 3].filter{ $0 > 2}
```

当然，Swift 标准库中提供了 filter 的实现，定义在 `SequenceType` 协议中。这里我们只是来自己实现一次。

> 参考资料 objc Functional Swift
