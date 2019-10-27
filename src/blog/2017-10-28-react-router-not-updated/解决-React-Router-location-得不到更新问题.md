---
title: 解决 React Router location 得不到更新问题
tags: ["React Router"]
categories: []
date: 2017-10-28 15:03:22
path: react-router-not-updated
keywords:
---

![](/media/redux-and-react-router.png)
React Router 可以帮助我们在单页面应用中管理 url，但是如果理解不当，也会存在一些潜在的 bug。

<!--more-->

例如:

```js
const HeaderComp = ({ location }) => <div>{location}</div>

const Header = connect(mapStateToProps)(withRouter(HeaderComp))
```

上述代码中，先是使用 `withRouter` 期望将 `location` 参数传入 `HeaderComp`，之后又 connect 到了 redux store。但是这里会发现，`location` 的值不会随着浏览器 url 的变化而更新。

```js
render() {
  // ...
  selector.shouldComponentUpdate = false
}

// ...

if (nextProps !== selector.props || selector.error) {
  selector.shouldComponentUpdate = true
  selector.props = nextProps
  selector.error = null
}
```

上面的代码是 `react-redux` 源码的片段，在 connect 所生成的高阶组件中，有如上两个片段。在每次 `render` 的时候，会将 `shouldComponentUpdate` 置为 false，之后每次比较 `props` 和 `nextProps` 是否不同，如果不同，才去触发 render。

React Router 是通过 `context` 来将路由等信息通知到下游的组件的，所以，上述代码中 `Header` 的 `props` 中并不会有路由的信息，在 `shouldComponentUpdate` 方法中判定为 false，因此 HeaderComp 不会更新 location。

解决的办法也很直接，将上述的代码改为：

```js
withRouter(connect(mapStateToProps)(HeaderComp))
```

这样一来，locatin 等参数会注入到 connect 所生成的高阶组件中， `shouldComponentUpdate` 会判定为 true，我们就拿到了期待的路由信息。
