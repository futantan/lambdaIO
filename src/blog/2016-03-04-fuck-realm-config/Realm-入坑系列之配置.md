---
title: Realm 入坑系列之配置
tags: [Realm]
categories: ['Realm 入坑系列']
date: 2016-03-04 18:35:04
path: fuck-realm-config
keywords: Realm, 配置, 坑
---

最近准备着手跳进 [Realm](https://realm.io/cn/) 的坑，如果你对 Realm 还不熟悉，可以看看我之前的一篇[译文](http://www.futantan.com/2015/10/29/Building-a-ToDo-A-Realm-and-Swift/)。这里我们聊一聊，Realm 在使用之前，配置上的坑。（iOS 平台）

<!--more-->

## 环境

目前，我使用的是 Xcode 7.2，Realm Swift 的最新版本为 0.98.1。

## 坑

开始填坑，**注意** ：目前不支持 CocoaPods 1.0.0 版本，请一定使用 ~> 0.39.0 的 pod 版本，如果你已经升级到 1.0 以后的版本，可以试试 `pod _0.39_ install` 来安装依赖，具体的步骤，[官网](https://realm.io/docs/swift/latest/)都有说明，我就不多说了。

当然，这个**坑具有实效性**，请以官网说明为准。

## 小技巧

默认的数据库存放位置为 你的应用文件夹下的 `Documents` 目录，默认会生成一个 `default.realm` 的数据库文件，当然，如果你找不到模拟器的应用目录的话，可以跑一下下面的代码，来查看路径：

```swift
print(Realm.Configuration.defaultConfiguration.path!)
```

祝大家玩儿的愉快！
