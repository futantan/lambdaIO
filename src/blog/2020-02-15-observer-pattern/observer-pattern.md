---
title: 《消失的设计模式》系列之观察者模式
date: 2020-02-16 18:51:21
tags: ['design pattern', 'the disappearing design pattern']
desc: 观察者模式
path: observer-pattern
---

> 设计模式是面向对象的有用工具，但是编程语言的发展和多种编程范式混合编程的可能，使很多的模式被语言特性取代，或者被其他编程范式解决。

## 要解决的问题

假如你想创建一个机器人，在发布文章的时候，自动同步到知乎、简书等其他的平台。在这里，我们有 3 个实体，一个是发布文章，在该事件发生的时候，分别通知知乎和简书的实体进行同步。同时为了可扩展性，需要支持可能的其他的平台。为了解决这类问题，我们可以使用观察者模式。

## 定义

> 在对象之间定义一对多的依赖，当一个对象改变时，依赖它的对象都会收到通知，并自动更新。

## 面向对象的方式

### UML

![uml](https://raw.githubusercontent.com/futantan/the-disappearing-design-patterns/master/src/observer/observer-uml.png)

如上图所示，

- `Subject` 接口定义了主题的行为，在我们的例子中，是发布文章。它持有一系列遵循 `Observer` 接口的实例。可以通过 `registerObserver` 进行添加，`removeObser` 进行移除，最终通过 `notifyObservers` 通知所有的观察者
- `Observer` 接口定义了观察者的行为

### 代码

首先定义 `Observer` 接口：

```typescript
interface Observer {
  update(newBlog: string)
}
```

包含一个 `update` 方法。

接下来分别定义两个 `Observer`：

```typescript
class ZhihuObserver implements Observer {
  update(newBlog) {
    console.log('publishing to zhihu...', newBlog)
  }
}

class JianshuObserver implements Observer {
  update(newBlog) {
    console.log('publishing to jianshu...', newBlog)
  }
}
```

在收到通知（`update` 方法被调用）的时候，将新文章的内容打印出来。

定义 `Subject` 接口：

```typescript
interface Subject {
  registerObserver(o: Observer)
  removeObserver(o: Observer)
  notifyObservers(newBlog: string)
}
```

这里由于我们需要告知观察者新文章的内容，`notifyObservers` 接受了一个 `string` 类型的参数。

```typescript
class BlogWriter implements Subject {
  private observers: Observer[] = []

  registerObserver(o: Observer) {
    this.observers.push(o)
  }
  removeObserver(o: Observer) {
    this.observers = this.observers.filter(v => v !== o)
  }
  notifyObservers(blog: string) {
    this.observers.forEach(o => {
      o.update(blog)
    })
  }
}
```

`BlogWriter` 类实现了 `Subject` 接口：

- 拥有一个私有的 `observers` 来存储已注册的 Observer。
- `registerObserver` 方法将一个 Observer 存储到 `observers` 数组中
- `removeObserver` 方法将指定的 Observer 移除
- `notifyObservers` 方法通知所有的 `observers`（调用其 `update` 方法）

来看运行效果：

```typescript
const subject: Subject = new BlogWriter()
const zhihu = new ZhihuObserver()
subject.registerObserver(zhihu)
subject.registerObserver(new JianshuObserver())
subject.notifyObservers('hello')
// publishing to zhihu... hello
// publishing to jianshu... hello
subject.removeObserver(zhihu)
subject.notifyObservers('world')
// publishing to jianshu... world
```

[面向对象完整代码](https://github.com/futantan/the-disappearing-design-patterns/blob/master/src/observer/observer.oo.ts)

## 戴上函数式的思考帽

其实**问题的本质**是将一系列的执行过程**存储**起来，在特定事件发生的时候，**执行**这些过程。

我们来修改 `Observer` 的定义：

```typescript
type Observer = (newBlog: string) => void
```

非常直白，就是一个函数定义。那么对应的 `Observer` 就可以改成：

```typescript
const zhihuObserver: Observer = newBlog => {
  console.log('publishing to zhihu...', newBlog)
}

const jianshuObserver: Observer = newBlog => {
  console.log('publishing to jianshu...', newBlog)
}
```

就是两个函数定义而已。此时 `BlogWriter` 类变成了：

```typescript
class BlogWriter implements Subject {
  private observers: Observer[] = []
  registerObserver(o: Observer) {
    this.observers.push(o)
  }
  removeObserver(o: Observer) {
    this.observers = this.observers.filter(v => v !== o)
  }
  notifyObservers(blog: string) {
    this.observers.forEach(o => {
      o(blog)
    })
  }
}
```

实际上，我们可以更进一步，去掉类的枷锁：

```typescript
const createBlogWriter = (): Subject => {
  let observers: Observer[] = []
  return {
    registerObserver: (o: Observer) => {
      observers.push(o)
    },
    removeObserver: (o: Observer) => {
      observers = observers.filter(v => v !== o)
    },
    notifyObservers(blog: string) {
      observers.forEach(o => o(blog))
    },
  }
}
```

这里我们创建了一个函数，`createBlogWriter` 该函数的返回值是一个实现了 `Subject` 接口的对象。代码逻辑和之前面向对象的方式相同，不过这里我们使用了闭包来承担私有变量的作用。来看最终的运行效果：

```typescript
const subject = createBlogWriter()
subject.registerObserver(zhihuObserver)
subject.registerObserver(jianshuObserver)
subject.notifyObservers('hello')
// publishing to zhihu... hello
// publishing to jianshu... hello
subject.removeObserver(zhihuObserver)
subject.notifyObservers('world')
// publishing to jianshu... world
```

我们再来看一遍函数式的代码：

```typescript
const createBlogWriter = (): Subject => {
  let observers: Observer[] = []
  return {
    registerObserver: (o: Observer) => {
      observers.push(o)
    },
    removeObserver: (o: Observer) => {
      observers = observers.filter(v => v !== o)
    },
    notifyObservers(blog: string) {
      observers.forEach(o => o(blog))
    },
  }
}
```

非常简洁。而这里真正的强大之处在于，`Observer` 只是一个函数类型，任何接收一个类型为 `string -> void` 的函数都可以作为 `Observer`！

[函数式完整代码](https://github.com/futantan/the-disappearing-design-patterns/blob/master/src/observer/observer.fp.ts)

## 总结

本着 **do not call me, I will call you!** 的理念，观察者模式可以在其他对象发生某些变化的时候得到通知。其**本质**是存储计算过程，稍后执行，换句话说，就是将一些函数存下来，在适当的时候调用而已，如此简单。而越来越多的语言将函数视为一等对象，所以函数作为参数传入，存储，再执行这种模式会非常简单易用。
