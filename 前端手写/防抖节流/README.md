## 防抖

[JavaScript专题之跟着underscore学防抖](https://github.com/mqyqingfeng/Blog/issues/22)

> 防止抖动
>
> 事件多次触发，只有当n秒内不再触发才执行，否则重新计时
>
> 重在清除定时器

适用场景如：文本编辑器实时保存，调整页面大小

**基础版**

处理 this 指向，event 对象

此处注意：如 setTimeout 内未使用箭头函数，需提前获取 this

```javascript
const debounce = (func, delay) => {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, arguments);
    }, delay);
  };
};
```

**进阶版**

增加立即执行

```javascript
const debounce = (func, delay, immediate) => {
  let timeout;
  return function () {
    if (timeout) clearTimeout(timeout);
    const callNow = !timeout;
    timeout = setTimeout(() => {
      func.apply(this, arguments);
    }, delay);
    if (immediate && callNow) func.apply(this, arguments);
  };
}
```

## 节流

[JavaScript专题之跟着 underscore 学节流](https://github.com/mqyqingfeng/Blog/issues/26)

> 控制流量
>
> 一段时间内只执行一次
>
> 重在控制标志位

适用场景如：获取滚动条位置 scroll

**基础版**

```javascript
// 依靠时间戳 => 有头无尾
const throttle = (func, delay) => {
  let previous = 0;
  return function () {
    const context = this;
    let now = +new Date();
    if (now - previous > delay) {
      func.apply(context, arguments);
      previous = now;
    }
  };
};

// 依靠定时器 => 无头有尾
const throttle = (func, delay) => {
  let tag = false;
  return function () {
    if (!tag) {
      tag = true;
      setTimeout(() => {
        func.apply(this, arguments);
        tag = false;
      }, delay);
        // 移动位置，也可改造为立即执行
        // func.apply(this, arguments);
    }
  };
};
```

1. 第一种事件会立刻执行，第二种事件会在 n 秒后第一次执行
2. 第一种事件停止触发后没有办法再执行事件，第二种事件停止触发后依然会再执行一次事件



[codepen](https://codesandbox.io/s/competent-nobel-gukun?file=/src/index.js)