---
title: Objective-C Blocks 小测验
tags: ['Objective-c']
date: 2016-03-10 20:05:07
path: objective-c-blocks-quiz
keywords: Objective-c, block, quiz
---

![](/media/14576119117357.jpg)

图题是一个很有意思的网站的截图，有人专门申请了一个域名：[fuckingblocksyntax](http://fuckingblocksyntax.com/) 来表示对 OC 中 block 奇特写法的不满，当然题图无关，今天看到一个有意思的 block 测试网站，记录一下。

你可以在这里来先测试一下：
[Objective-C Blocks Quiz](http://blog.parse.com/learn/engineering/objective-c-blocks-quiz/)

<!--more-->

## Example A

```objective-c
void exampleA() {
  char a = 'A';
  ^{
    printf("%cn", a);
  }();
}
```

解释：  
这段代码在 MRC 和 ARC 的情况下都能正确执行。
因为 `exampleA` 的函数栈，在 block 执行完之前，并不会 pop，所以，无论函数中的 block 是在 stack 或是 heap 中，都能够被正确执行。

## Example B

```objective-c
void exampleB_addBlockToArray(NSMutableArray *array) {
  char b = 'B';
  [array addObject:^{
    printf("%cn", b);
  }];
}

void exampleB() {
  NSMutableArray *array = [NSMutableArray array];
  exampleB_addBlockToArray(array);
  void (^block)() = [array objectAtIndex:0];
  block();
}
```

解释：  
这段代码只有在 ARC 的情况下才能正确执行。
在 MRC 的情况下，block 分配在栈上，在 `exampleB_addBlockToArray` 返回之后，函数栈被弹出，这个 block 的地址就不再合法了。
在 ARC 的情况下，block 将会被拷贝到堆中，可以合法使用。

## Example C

```objective-c
void exampleC_addBlockToArray(NSMutableArray *array) {
  [array addObject:^{
    printf("Cn");
  }];
}

void exampleC() {
  NSMutableArray *array = [NSMutableArray array];
  exampleC_addBlockToArray(array);
  void (^block)() = [array objectAtIndex:0];
  block();
}
```

解释：  
这段代码在 MRC 和 ARC 的情况下都能正确执行。
因为 `exampleC_addBlockToArray` 中的 block 并没有捕获任何变量，是一个 `NSGlobalBlock`，既不在堆中，也不在栈上，所以可以像普通的 C 函数一样访问，不会存在任何问题。

## Exapmle D

```objective-c
typedef void (^dBlock)();

dBlock exampleD_getBlock() {
  char d = 'D';
  return ^{
    printf("%cn", d);
  };
}

void exampleD() {
  exampleD_getBlock()();
}
```

解释：  
这段代码只有在 ARC 的情况下才能正确执行。
block 分配在栈上，如果是 ARC，将会被拷贝到堆上。而 MRC 的情况下，函数执行结束，这个地址就不存在了，而且编译器会报错：`error: returning block that lives on the local stack`

## Example E

```objective-c
typedef void (^eBlock)();

eBlock exampleE_getBlock() {
  char e = 'E';
  void (^block)() = ^{
    printf("%cn", e);
  };
  return block;
}

void exampleE() {
  eBlock block = exampleE_getBlock();
  block();
}
```

解释：  
这段代码只有在 ARC 的情况下才能正确执行。
和 `Exapmle D` 的情况很类似，只不过这儿编译器在 MRC 情况下不会报错。

## 结论

`ARC` 大法好！
如果不使用 ARC（我觉得现在应该没有不用 ARC 的吧...）需要在传递 block 的时候，使用 `block = [[block copy] autorelease]`，这样可以让 block 拷贝到堆中。

声明：本文内容并非原创，而是大部分引用自上面所说的[网站](http://blog.parse.com/learn/engineering/objective-c-blocks-quiz/)
