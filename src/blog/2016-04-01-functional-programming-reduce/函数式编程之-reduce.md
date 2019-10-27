---
title: 函数式编程之 reduce
tags: ['函数式编程']
date: 2016-04-01 16:13:23
path: functional-programming-reduce
---

与 map 那篇文章类似，我们先来看需求，如果我们需要对一个数组求和，代码如下：

```swift
func sum(xs: [Int]) -> Int {
  var result: Int = 0
  for x in xs {
    result += x
  }
  return result
}
```

下面还是来封装变化点。

<!--more-->

这里的变化点与之前的 map 和 filter 相比多了一些，除了操作逻辑，类型信息之外，还需要提供一个初始值。封装之后的代码如下：

```swift
extension Array {
  func reduce<T>(initial: T, combine: (T, Element) -> T) -> T {
    var result = initial
    for x in self {
      result = combine(result, x)
    }
    return result
  }
}
```

可以像下面这样使用：

```swift
[1, 2, 3, 4].reduce(0) { result, element in
  return result + element
}
// 或者
[1, 2, 3, 4].reduce(0, combine: +)
```

在 `reduce` 的定义中，我们提供了两个参数，一个是 `initial` 提供初始值，同时提供了相关的类型信息，另一个是 `combine` 函数，将进行相应的转换逻辑。

## 使用 reduce 实现 map 和 filter

```swift
extension Array {
  func mapUsingReduce<T>(transform: Element -> T) -> [T] {
    return reduce([]) { (result, x) -> [T] in
      return result + [transform(x)]
    }
  }

  func filterUsingReduce(includeElement: Element -> Bool) -> [Element] {
    return reduce([]) { result, x in
      return includeElement(x) ? result + [x] : result
    }
  }
}
```

代码逻辑比较简单明了，就不多说了。需要注意的是，虽然我们可以使用 reduce 来实现 map 和 filter 的功能，但是可以观察到，这里面的性能是不高的，会在运行时造成很多份的数据 copy， 所以，还是使用系统自带的函数吧，源码和编译器都帮我们做了很多的优化。^\_^

> 参考资料 objc Functional Swift
