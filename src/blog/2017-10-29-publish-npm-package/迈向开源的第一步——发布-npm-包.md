---
title: 迈向开源的第一步——发布属于自己的 npm 包
tags: ['开源', 'npm']
categories: ['前端']
date: 2017-10-29 21:55:23
path: publish-npm-package
keywords: npm, package, publish
---

![NPM](https://i0.wp.com/realityonweb.com/wp-content/uploads/2015/06/npm.logo_.png?resize=262%2C103)

<!--more-->

> 本文整理自 [egghead.io](https://egghead.io/courses/publish-javascript-packages-on-npm)

## 添加版本控制

输入以下命令：

```bash
$ mkdir ftt-sensitive-words
$ cd ftt-sensitive-words
$ git init
$ git remote add origin git@github.com:futantan/ftt-sensitive-words.git
$ touch README.md
$ git add -A
$ git commit -m "Initial commit"
$ git push --set-upstream origin master
```

> 同时需要在 .gitignore 文件中加入 node_modules 等目录和文件

上述命令执行完毕之后，我们已经在 `github` 上初始化了我们的代码仓库，接下来需要初始化 `npm` 配置。

## 初始化 npm 配置

```bash
$ npm init
```

在随后的问答中，填入你想要的信息，例如

```
description: Filter out a list of sensitive words
entry point: build/index.js
keywords: filter, filtering, sensitive, words
```

> 注意这里的 `entry point`，我们会在后面解释

## 添加 build 脚本

为了能够使用 `ES6` 的语言特性，我们将会使用 `babel`：

```js
$ npm install babel-cli babel-preset-latest --save-dev
```

然后在 `package.json` 的 `scripts` 中添加如下命令：

```js
"build": "babel src -d build"
```

在运行 `npm run build` 之后，会将 `src` 目录中的代码「编译」（转换）之后放入 `build` 文件夹中。这也就是在第二步中，我们将 `entry point` 设置为 `build/index.js` 的原因。

同时，需要为 `babel` 做一些配置，将下面的代码放入 `package.json` 中：

```js
"babel": {
  "presets": [
    "latest"
  ]
},
```

接下来新建 `src/index.js` 文件：

```js
export default () => 'hello'
```

这时我们运行 `npm run build`，就会在 `build/` 文件夹中找到转化之后的代码。

## 添加 dev 脚本

为了能够在每次改动 `src` 目录中代码的时候，自动运行 `build`，我们添加 `watch` 这个包：

```bash
$ npm install watch --save-dev
```

在 `package.json` 的 `scripts` 中添加 `dev` 命令：

```
"dev": "watch 'npm run build' src"
```

运行 `npm run dev`，现在可以修改一下 `src/index.js` 文件的内容，查看效果。

## 添加 test 脚本

接下来为我们的项目添加 test 命令，这里我们使用 `jest`：

```bash
$ npm install jest --save-dev
```

在 `package.json` 的 `scripts` 中添加 `test` 命令：

```bash
"test": "jest"
```

新建 `src/index.test.js` 文件：

```js
/* src/index.test.js */
import sensitiveWords from '.'

test('says hello world', () => {
  expect(sensitiveWords()).toBe('hello world')
})
```

修改 `src/index.js` 文件的内容，来查看 `npm test` 的运行结果。和 `build` 命令一样，我们也可以监听文件的变化，自动运行测试命令。在 `package.json` 的 `scripts` 中添加如下命令：

```
"test:watch": "npm test -- --watch"
```

## 添加功能

在开发的过程中，可以开两个 terminal 窗口，分别运行以下两个命令

```
$ npm run dev
$ npm run test:watch
```

修改测试文件：

```js
/* src/index.test.js */
import sensitiveWords from '.'

test('replaces blacklisted words with aasterisks', () => {
  expect(
    sensitiveWords('The name of the NX will be the Nintedo Switch', ['switch'])
  ).toBe('The name of the NX will be the Nintedo ***')
})
```

修改 `index.js` 文件内容：

```js
/* src/index.js */
export default (content, words) =>
  content.replace(new RegExp(words.join('|'), 'i'), '***')
```

再添加一个测试用例：

```js
/* src/index.test.js */
test('replaces multiple instances of blacklisted words', () => {
  expect(
    sensitiveWords(
      'The name of the NX will be the Nintedo Switch. The switch will be awesome!',
      ['switch']
    )
  ).toBe('The name of the NX will be the Nintedo ***. The *** will be awesome!')
})
```

这时候会发现测试挂了，第二个 `switch` 并没有被替换掉，（测试的重要性！）
修改 `index.js` 文件 `new RegExp(words.join('|'), 'ig')`  
测试通过！！！

## 使用 npm link 进行测试

在将代码发布到 npm 之前，我们可以作为库的使用者，试着使用我们的库。`npm link` 可以满足我们的需求
name of the package: ftt-sensitive-words

运行如下命令

```
$ npm link
/usr/local/lib/node_modules/ftt-sensitive-words -> /Users/xxx/ftt-sensitive-words
$ mkdir some-project
$ cd some-project
$ npm init -y
```

这时运行 `npm link ftt-sensitive-words`，就可以将我们之前写的包 link 到当前的 `node_modules` 中，新建一个 `index.js` 文件，使用一下我们的代码吧！

```js
const senstiveWords = require('ftt-sensitive-words').default
const filtered = senstiveWords(
  'The new apple macbook pro will have a touchbar',
  ['pro', 'touchbar']
)

console.log(filtered)
```

```
$ node index.js
```

## 文档

为了能够让使用者更好地使用，在 `README.md` 中可以写一些使用的示例，例如：

```js
const senstiveWords = require('ftt-sensitive-words').default
const filtered = senstiveWords(
  'The new apple macbook pro will have a touchbar',
  ['pro', 'touchbar']
)
console.log(filtered)
// The new apple macbook *** will have a ***
```

## 发布

在 `package.json` 的 `scripts` 中添加 `prepublish` 命令：

```
"prepublish": "npm run build"
```

这样可以确保在 publish 之前，运行过 build。
这个时候还存在一个问题，我们的源码是在 `src` 文件中，我们希望库的使用者，使用 `build` 目录中的代码，所以，`src` 文件中的东西不应该作为 npm 包的一部分，这时候 `.npmignore` 就出场了。

```
$ touch .npmignore
```

在 `.npmignore` 文件中加入 `src/`。 `.npmignore` 与 `.gitignore` 功能类似，一个是针对 npm，一个是针对 git。

之后运行如下命令就可以发布了

```
$ npm adduser
$ npm publish
```

## update

为了更方便地管理代码的更新与发布，推荐使用 `np` 这个库。

```
$ npm install np --save-dev
```

在 `package.json` 的 `scripts` 中添加 `release` 命令：

```
"release": "np"
```

在修改代码之后，可以运行如下命令来进行更新。

```
$ npm run release
```

> Happy Hacking~
