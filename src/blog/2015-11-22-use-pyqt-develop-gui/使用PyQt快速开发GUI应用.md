---
title: 使用PyQt快速开发GUI应用
path: use-pyqt-develop-gui
tags: [python, GUI]
date: 2015-11-22 15:43:40
---

这篇博客主要目的是备忘 =.=

<!--more-->

上学期才用 PyQt 写过 Linux 的桌面应用，这学期实验室又有个需求，在 Win 上来写个演示的界面。这个任务一开始我是拒绝的，对于一个强烈反感在 Windows 环境下开发的人来说...和老师四目相对了几秒钟，“好的！”。

然而 PyQt 的开发姿势我居然忘记了...年纪大了果然记性不太好，滚回来写篇博客记录一下，方便以后还有类似搬砖的活儿。

## 准备工作

一开始肯定是搞定各种环境，不像 Linux 的命令行那样友好，安装包要自己一个个下。

- [python 包地址](https://www.python.org/)
- [pip 地址](https://pypi.python.org/pypi/pip)
- [PyQt 地址](https://www.riverbankcomputing.com/software/pyqt/download)

分别选择合适的包安装就可以了，然后配置好 python 和 pip 的环境变量。

## 装成设计师的样子

![QQ截图20151122155526](./QQ%E6%88%AA%E5%9B%BE20151122155526.png)

恩...开发环境还是 xp 的！

随便拖拽一些控件，摆个积木什么的，注意选中 `发送` 按钮，将它的 `objectName` 改为 `sendButton`，或者其他你喜欢的名字，后面会用到。

## 与 UI 交互

有 UI 的程序，界面最重要的作用是替代命令行在某个时刻发送一些命令，为了将 UI 导入我们的程序，需要做一些操作。

首先保存这个 UI 文件，不妨就叫做 `a.ui`。打开命令行工具，进入该文件的目录，利用 ui 文件生成 python 代码。这里如果用编辑器查看 ui 文件，其实就是个 xml，和 Android 与 iOS 的界面原理一致，使用如下代码，生成 UI 代码：

```shell
pyuic4 a.ui -o ui.py
```

选取喜爱的编辑器打开代码目录，新建一个 python 文件，代码如下

```python
import sys
from PyQt4 import QtCore, QtGui

from ui import Ui_MainWindow # 1


class MyApp(QtGui.QMainWindow):
    def __init__(self, parent=None):
        QtGui.QWidget.__init__(self, parent)
        self.ui = Ui_MainWindow()
        self.ui.setupUi(self)
        self.ui.sendButton.clicked.connect(self.sendButtonClicked) # 2

    def sendButtonClicked(self): # 3
    	print 123


if __name__ == "__main__":
    app = QtGui.QApplication(sys.argv)
    myapp = MyApp()
    myapp.show()
    sys.exit(app.exec_())
```

其他部分都是固定不变的。

1. 注释 1 处： `ui` 是生成的 `ui.py` 文件
2. 注释 2 处： 将 `sendButton` 按钮和 `sendButtonClicked` 绑定
3. 注释 3 出： 具体实现

了解了这些，基本就够用了。
