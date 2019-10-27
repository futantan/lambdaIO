---
title: compose
date: 2019-01-20 22:59:49
tags: ['fp']
path: fp-compose
---

![](./2019-1-20-compose.jpg)

在函数式编程的世界中，函数是基本单元，通过对一些函数的排列组合，构建了功能更加强大的函数，而这些的基础，是函数组合。

<!--more-->

我们通常会使用函数嵌套的方式来做：

```javascript
f(g(h(x)))
```

这是非常典型的例子，面向过程，将 `h(x)` 的结果给 `g`，然后再调用 `f`。当可读性不好的时候，我们会选择引入中间变量，将中间的计算结果赋值给一个变量，然后再进行下一步的操作。

那么在函数式的世界中，是如何处理的呢？

假设我们定义一个操作

$$\circ : (f \circ g)(x)=f(g(x))$$

那么上面的 `f(g(h(x)))` 可以表示为

$$(f \circ g \circ h)(x)$$

Beautiful math！这就是函数组合，左边的部分，由三个函数，组合成了一个全新的函数。

那么在编程的世界中，我们是如何做的呢？

```haskell
(f . g . h) x
```

这是 haskell 中的代码，与数学定义完全一致！

接下来我们尝试在 JavaScript 中来实现：

```javascript
const compose =
  (...fns) => (x) => fns.reduceRight((prev, curr) => curr(prev), x)

const addOne = x => x + 1;
const double = x => x * 2;

const addOneThenDouble = compose(double, addOne)
console.log(addOneThenDouble(3); // 8
```

非常简单，`fns` 是传入的所有函数的集合，然后从右向左，依次进行函数调用，将上一次的结果作为下一次调用的输入，最终得到结果。

对于 `compse` 的接口，最右的函数参数个数可以任意，然后其他的所有函数接收一个参数，并返回一个值，为了满足这个需求，修改代码：

```javascript
const putToArray = x => (Array.isArray(x) ? x : [x])

const compose = (...fns) => (...args) =>
  fns.reduceRight((prev, curr) => curr.apply(null, putToArray(prev)), args)
```

完成。
