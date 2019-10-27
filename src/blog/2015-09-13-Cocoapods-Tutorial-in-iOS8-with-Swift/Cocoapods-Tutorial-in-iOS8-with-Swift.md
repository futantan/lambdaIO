---
title: '在 iOS8 中使用 Swift 和 Cocoapods'
path: Cocoapods-Tutorial-in-iOS8-with-Swift
date: 2015-09-13 20:54:38
tags: [Swift]
categories: ['译文']
---

> 本文章翻译独家授权给[SwiftGG](http://swift.gg/)
> 原文地址 [iOSCreator](http://www.ioscreator.com/tutorials/cocoapods-tutorial-ios8-swift)

Cocoapods 是 iOS 应用的包管理程序。它简化了第三方库的导入并且将帮你处理库之间的依赖。在这个教程中，我们将会使用 cocoa pods 导入 `FontBlaster` 这个第三方库。使用 `FontBlaster` 这个库可以在项目中更加方便地使用第三方的字体。本教程的环境基于 iOS8 和 Xcode6.4。

<!--more-->

打开 Xcode 使用 `Single View Application` 创建一个项目。项目名称可以使用 `IOS8SwiftCocoapodsTutorial`，其他配置项可以自定义。选择 Swift 作为开发语言，并且设备项选中 `iPhone`。

![新建项目](https://images.squarespace-cdn.com/content/v1/52428a0ae4b0c4a5c2a2cede/1543322910345-HTQB0MULG7QC5BGSGOBR/ke17ZwdGBToddI8pDm48kCGB6pFYsV9E0cfclSyD7st7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmXTM9TT8IybkDOGA8gvvh4kAqHFySWs7HXC310hy2Pcbywq2OdO2u9LSdO9PkVp1W/single-view-xcode-template.png?format=2500w)

咱们的这个教程中会用到一个字体，可以从[这里](http://www.ioscreator.com/s/OpenSans-Bold.ttf)下载，并加入到项目中。接下来，关闭 Xcode 项目并打开终端。首先我们需要安装 cocoa pods。这个过程将会用到 ruby 环境，而 Mac OS X 系统已经自带了 ruby。在终端中输入如下命令：

> sudo gem install cocoapods

---

> 译者注：因某些原因不能安装成功的同学，可以参考唐巧的这篇[博客](http://blog.devtang.com/blog/2014/05/25/use-cocoapod-to-manage-ios-lib-dependency/)

接下来使用以下命令 clone 项目

> pod setup --verbode

然后进入 Xcode 项目文件目录，生成 `Podfile` 文件

> pod init

之后需要编辑 `Podfile` 文件，让它包含 FontBlaster 这个第三方库。使用如下命令打开它

> open -a Xcode Podfile

编辑后的 Podfile 文件如下

```
# Uncomment this line to define a global platform for your project
platform :ios, '8.0'
use_frameworks!

target 'IOS8SwiftCocoapodsTutorial' do
pod 'FontBlaster', '1.0.8'
end

target 'IOS8SwiftCocoapodsTutorialTests' do

end
```

> 译者注：这里的版本号 1.0.8 为译者加上，FontBlaster 已经支持 Swift 2.0，如果不指定为该版本号，会下载最新的 FontBlaster，这要求 Xcode 7.x 版本。如果你使用的是 Xcode6.x 版本，需要指定该版本号。

项目的 target 是 iOS8.0，`use_frameworks!` 这句是必须的，因为 Swift 使用的是框架而不是静态库。`pod 'FontBlaster'` 告诉 Cocoapods 你想在项目中使用 FontBlaster 。保存对文件的修改，并在终端中输入以下命令

> pod install

FontBlaster 和相关依赖都会被自动安装。同时会新建一个 `IOS8SwiftCocoapodTutorial.xcworkspace` 文件。打开这个 workspace，找到 Storyboard。向其中拖入一个 `Label`，并放在视图的中间偏上位置。

![放入Label](https://images.squarespace-cdn.com/content/v1/52428a0ae4b0c4a5c2a2cede/1543328480908-WXR9NVUMMOKG5QL2H9XY/ke17ZwdGBToddI8pDm48kLBBj6ovg5YoF7k1aDevdoFZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpwtUA7WTJR4O59jGm2vQ7P9yfcE_25NI3GaNbx1ZMQ_4swVhyLvkYfe0hkVpdKj0AM/cocoapods-storyboard.png?format=1500w)

点击 `Assistant Editor`，确保 `ViewController.swift` 和 Storyboard 可以同时显示，按住 `Ctrl` 同时从 Label 向 swift 文件中拖拽，随后创建如下 Outlet

![创建 Outlet](https://images.squarespace-cdn.com/content/v1/52428a0ae4b0c4a5c2a2cede/1543325879040-QBX9JC6714I3ARQHPGXN/ke17ZwdGBToddI8pDm48kH92mv46acrDs7cBhUwniCRZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpyQdjM9vc2BMmpCuLepkjhNmdcfOhgEh3wI9FWhQh0QwcojNvnnHGZdvP9kDBcQBCQ/label-outlet.png?format=1500w)

在 `ViewController.swift` 文件的开始，导入 `FontBlaster`。

> import FontBlaster

修改 `viewDidLoad` 代码：

```swift
  override func viewDidLoad() {
    super.viewDidLoad()
    
    FontBlaster.debugEnabled = true
    FontBlaster.blast()
    label.font = UIFont(name: "OpenSans-Bold", size: 30.0)
    label.text = "Testing Cocoapods"
  }
```

`debugEnabled` 属性被设置为 `true`，用来观察从 `bundle` 中加载字体的日志信息，通过调用 `blast()` 方法，`bundle` 中的所有字体都会被加载。编译运行程序，查看运行效果。

> 译者注：如果遇到 `No fonts were found in the bundle path` 提示，可以到 `'Targets' -> 'Build Phases' -> 'Copy Bundle Resources'` 中手动添加字体文件。

![运行效果](https://images.squarespace-cdn.com/content/v1/52428a0ae4b0c4a5c2a2cede/1543328676695-13HOV4RJAEM6VB0KMR8B/ke17ZwdGBToddI8pDm48kPoh0Ncehwv-FoXM5t_lmvtZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpw78wyuMjrjfQ_sEs4uOhVPm0YVw5Smh2vt-Du0iZvtYdlZpBjfYIseywGqtXQRtFU/cocoapods-simulator.png?format=1500w)

你可以从 [Github](https://github.com/ioscreator/ioscreator) 上下载本教程的代码。
