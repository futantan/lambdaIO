---
title: 搭建简单Mongodb服务器
date: 2015-01-20 23:40:49
tags: ['数据库', 'mongodb']
path: build-a-simple-mongodb
---

搭建简单的 Mongodb 服务器

<!--more-->

新建如下目录结构，其中`bin`存放 mongod 执行文件（可以放到这里），`conf/mongod.conf`

为配置文件，`data`存放数据库文件，`log`顾名思义，来存放日志信息

```bash
└── mongodb_simple
    ├── bin
    ├── conf
    │   └── mongod.conf
    ├── data
    └── log
```

`conf/mongod.conf`文件内容如下：

```
port = 12345
dbpath = data
logpath = log/mongod.log
fork = true
```

1. port 为端口号
2. dbpath 为 db 存放的路径
3. logpath 为日志路径文件
4. 是否后台运行

运行`mongod -f conf/mongod.conf`创建数据库。

DONE！

​
