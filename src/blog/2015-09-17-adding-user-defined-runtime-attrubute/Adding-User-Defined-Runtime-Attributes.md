---
title: 使用 Interface Builder 添加运行时属性
path: adding-user-defined-runtime-attrubute
date: 2015-09-17 21:28:41
tags: [iOS]
categories: ['Tips']
---

使用 Interface Builder 可以帮助我们快速的创建原型，定义界面样式。但是对于一些 Interface Builder 中没有的属性参数，我们一般需要通过代码来指定它的属性，能否让 Interface Builder 帮我们完成这个工作呢？

<!--more-->

## 解决办法

我们可以使用 `Runtime Attributes`。

Interface Builder 没有相关属性选项的时候，我们可以为其添加 `Runtime Attributes`。当 nib 文件被加载的时候，会为每个添加的 Attributes 调用 `setValue:forKeyPath:`。

## 步骤

1. 在 Interface Builder 中打开 StoryBoard 或 xib 文件
2. 选中需要定义属性的目标
3. 选择 View > Utilities > Show Identity Inspector <center>![选择User Defined Runtime Attributes](./14424974256894.jpg)</center>
4. 选择加号，输入相应的属性，选择对应的类型，最后输入要设置的值。

例如：

在有个图片，我希望它能够显示为圆形图标。而美工给我的是正方形，咋办呢？美工，去！再给我切份儿图来！这显然不是一个牛逼程序员的作风，我们可以使用上面的方式来完成。

<center>![原始图片](./14424985152291.jpg)</center>

添加动态属性如下

<center>![添加属性](./14424985519169.jpg)</center>
最终运行效果如图

<center>![运行效果](./14424985975405.jpg)</center>
