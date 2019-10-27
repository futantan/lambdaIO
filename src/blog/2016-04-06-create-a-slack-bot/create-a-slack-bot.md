---
path: create-a-slack-bot
title: 铲屎官翻身记（Slack bot）
tags: ['Slack']
date: 2016-04-06
---

![](./14599097880604.jpg)

今天来做一回翻身的铲屎官，使用 Slack bot 来简化我们的工作流程。（主要是因为我的 bot 以 miao 命名，所以 😂 ）

<!--more-->

## 简介

[Hubot][1] 是一个机器人，可以帮助我们完成很多事情，一个懒癌患者， 宁愿花 3 个小时写代码，也不愿意花 2 个小时完成重复的工作，所以，如果你有懒癌的话，不妨试试 Hubot。这里我将与 Slack 结合使用。

你可以从[这里][2]查看 Hubot 的使用说明。如果同我一样，是使用 Slack 的话，可以在[这里][3] 查看如何使用 hubot－slack。

## 准备工作

[Readme 文件][4] 已经写得很清楚了，这里也记录一下吧。

```bash
npm install -g hubot coffee-script yo generator-hubot
mkdir -p /path/to/hubot
cd /path/to/hubot
yo hubot
npm install hubot-slack --save
```

上述代码正确执行完毕之后，你的小机器人就可以正常运行了。你可以使用一下命令在本地进行测试：

```bash
HUBOT_SLACK_TOKEN=xxxx-xxxx-xxxx-xxxx-xxxx ./bin/hubot --adapter slack
```

注意 `HUBOT_SLACK_TOKEN＝`后面的值需要求改为你的 token。你需要在 `Slack->Browse apps->Hubot` 中新建一个，然后在这里取得 token 的值。

OK，我们会在下一次介绍如何调教我们的 bot，下次见。

Happy Hacking!

[1]: https://hubot.github.com/
[2]: https://hubot.github.com/docs/
[3]: https://github.com/slackhq/hubot-slack
[4]: https://github.com/slackhq/hubot-slack
[image-1]: /media/14599097880604.jpg
