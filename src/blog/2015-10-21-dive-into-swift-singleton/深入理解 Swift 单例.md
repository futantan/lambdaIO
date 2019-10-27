---
title: '深入理解 Swift 单例'
date: 2015-10-21 10:40:49
tags: ['数据库', 'mongodb']
path: dive-into-swift-singleton
---

Swift 中的单例是如何工作的呢

<!--more-->

在 OC 中，我们常常这样来写一个单利

```
@implementation MyManager
+ (id)sharedManager {
    static MyManager *staticInstance = nil;
    static dispatch_once_t onceToken;

    dispatch_once(&onceToken, ^{
        staticInstance = [[self alloc] init];
    });
    return staticInstance;
}
@end
```

使用 `dispatch_once_t` 来保证代码只被调用一次。而在 Swift 中，如下的方式，被认为是最佳实践：

```swift
private let sharedInstance = MyManager()

class MyManager  {
    class var sharedManager : MyManager {
        return sharedInstance
    }
}
```

为什么这种方式是可行的呢？

> private let sharedInstance = MyManager()

是如何保证只调用了一次，没有冲突的呢？

> The lazy initializer for a global variable (also for static members of structs and enums) is run the first time that global is accessed, and is launched as dispatch_once to make sure that the initialization is atomic. This enables a cool way to use dispatch_once in your code: just declare a global variable with an initializer and mark it private.

其中的奥秘在于，Swift 中的全局变量，在初始化的时候，都会使用 `dispatch_once` 来保证原子性。所以，说 Swift 天生支持单例模式，也不过分。
