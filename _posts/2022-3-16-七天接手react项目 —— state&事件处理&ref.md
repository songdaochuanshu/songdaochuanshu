---
layout: post
title: "七天接手react项目 —— state&事件处理&ref"
date: "2022-03-16T10:21:21.687Z"
---
七天接手react项目 —— state&事件处理&ref
=============================

state&事件处理&ref
--------------

在 [react 起步](https://www.cnblogs.com/pengjiali/p/16002317.html "上文") 一文中，我们学习了 react 相关知识：`jsx`、`组件`、`props`。本篇将继续研究 `state`、`事件处理`和`ref`。

### state

State 与 props 类似，但是 state 是**私有**的，并且完全受控于当前组件 —— 官网

react 中的 props 用来接收父组件传来的属性，并且是**只读**的。

由此，我们能**猜测** state 就是组件`自身属性`。

_Tip_：是否感觉像 vue 组件中的 data，请接着看！

    var app = new Vue({
        ...
        // 状态
        data: {
            message: 'Hello Vue!',
            seen: true
        }
    })
    

#### 初步体验

这是一个官方示例：

    class Clock extends React.Component {
        constructor(props) {
            super(props) // 这里等于 super()
            this.state = { date: new Date() };
        }
    
        render() {
            return (
                <div>
                    <h1>Hello, world!</h1>
                    <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
                </div>
            );
        }
    }
    ReactDOM.render(
        <Clock />,
        document.getElementById('root')
    );
    

网页显示：

    Hello, world!
    // 当前时间
    It is 11:20:26.
    

_Tip_：`toLocaleTimeString()` 方法返回该日期对象时间部分的字符串，该字符串格式因不同语言而不同

如果不初始化 state 或不进行方法绑定，则不需要为 React 组件实现构造函数 —— 官网\_[constructor](https://zh-hans.reactjs.org/docs/react-component.html#constructor "constructor")

由此可以**猜测** state 能在构造函数中初始化。那么必须调用 `super()` 不？请看示例：

    constructor() {
        // super()
        console.log('this', this)
        this.state = { date: new Date() };
    }
    

浏览器控制台报错如下：

    Uncaught ReferenceError: this hasn't been initialised - super() hasn't been called
    

_Tip_：在构造函数中访问 this 之前，一定要调用 `super()`，它负责初始化 this，如果在调用 super() 之前访问 this 会导致程序报错 —— 类 （class）\_[继承](https://www.cnblogs.com/pengjiali/p/14488228.html#%E7%BB%A7%E6%89%BF "继承")

#### 不要直接修改 State

不要直接修改 State ——官网-[正确地使用 State](https://zh-hans.reactjs.org/docs/state-and-lifecycle.html#using-state-correctly "正确地使用 State")

假如我们直接修改 state 会发生什么？请看示例：

    class Clock extends React.Component {
        constructor() {
            super()
            this.state = { date: new Date() }
            setInterval(() => {
                // 直接修改 state
                this.state.date = new Date()
                console.log(this.state.date)
            }, 1000)
        }
    
        render() {
            // ... 不变
        }
    }
    

我们期望每过一秒，时间都能更新。但现实是，页面内容静止**不变**，但控制台输出的时间却在改变：

    // 页面输出
    Hello, world!
    It is 16:07:00.
    

    // 控制台输出
    Mon Mar 14 2022 16:07:01 GMT+0800 (中国标准时间)
    Mon Mar 14 2022 16:07:02 GMT+0800 (中国标准时间)
    Mon Mar 14 2022 16:07:03 GMT+0800 (中国标准时间)
    Mon Mar 14 2022 16:07:04 GMT+0800 (中国标准时间)
    ...
    

_Tip_：我们可以通过 `forceUpdate()` 方法来强制更新，但我们通常不会这样使用。vue 也有一个类似的方法 `vm.$forceUpdate()`

    setInterval(() => {
        this.state.date = new Date()
        console.log(this.state.date)
        // 强制更新。通常不用
      + this.forceUpdate()
    }, 1000)
    

#### setState

##### 通过 setState() 修改 state

继续上面的例子，让 Clock 组件在页面中每过一秒都会自动更新时间：

    class Clock extends React.Component {
        constructor(props) {
            super(props)
            this.state = { date: new Date() }
            // bind() 方法会返回一个新的函数，里面绑定 this，否则 tick() 报错如下：
            // Uncaught TypeError: this.setState is not a function
            setInterval(this.tick.bind(this), 1000)
        }
        tick() {
            // 通过 setState 修改 state
            this.setState({
                date: new Date()
            })
        }
        render() {
            // ... 不变
        }
    }
    

页面显示：

    Hello, world!
    It is 15:07:06.
    
    // 一秒后显示
    Hello, world!
    It is 15:07:07.
    

##### 合并还是替换

当你调用 `setState()` 的时候，React 会把你提供的对象**合并**到当前的 state —— 官网\_“State 的更新会被合并”

这个不难证明。请看示例：

    class Clock extends React.Component {
        constructor() {
            super()
            this.state = { date: new Date(), name: 'pengjili' }
            setInterval(this.tick.bind(this), 1000)
        }
        tick() {
            // state 初始化时是两个属性，现在是一个属性
            this.setState({
                date: new Date()
            })
        }
        render() {
            return (
                <div>
                    <h1>Hello, world! {this.state.name}</h1>
                    <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
                </div>
            );
        }
    }
    

页面显示：

    // 每秒时间都会改变，但 `pengjiali` 一直显示
    Hello, world! pengjili
    It is 15:20:24.
    

倘若是替换，`pengjiali` 就为空了。

##### State 的更新可能是异步的

出于性能考虑，React 可能会把多个 `setState()` 调用合并成一个调用

例如，调整购物车商品数：

    this.setState({quantity: 2})
    

在同一周期内会对多个 `setState` 进行批处理，如果在同一周期内多次设置商品数量增加，则相当于：

    Object.assign(
      previousState,
      {quantity: state.quantity + 1},
      {quantity: state.quantity + 1},
      ...
    )
    

后调用的 `setState()` 将覆盖同一周期内先调用 setState 的值，因此商品数仅增加一次。

因此，如果后续状态取决于当前状态，建议使用函数的形式代替：

    this.setState((state, props) => {
      return {quantity: state.quantity + 1};
    })
    

这个函数用上一个 state 作为第一个参数，将此次更新被应用时的 props 做为第二个参数。

##### render() 执行几次

修改 Clock 组件的 `render()` 方法：

    render() {
      + console.log(1)
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
    

控制台输出：

    1
    ⑨ 1
    

组件一挂载就得渲染，输出第一行的 `1`，然后每过一秒就会在第二行输出，这里统计到第 `9` 秒。

所以，`render()` 执行 `1 + N` 次。N 在这里表示状态更改了 9 次。

#### 公有实例字段优化 state 初始化

请看示例：

    <script>
        class Dog {
            age = 18
            constructor(name) {
                this.name = name
            }
        }
    
        let d = new Dog('peng')
        console.log('d: ', d);
    </script>
    

控制台输出：`d: Dog {age: 18, name: 'peng'}`

[公有实例字段](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes/Public_class_fields#%E5%85%AC%E6%9C%89%E5%AE%9E%E4%BE%8B%E5%AD%97%E6%AE%B5 "公有实例字段") `age = 18` 等价于给实例定义了一个属性 `age`。于是我们可以将通过次语法来优化 state 的初始化。

优化前：

    class Clock extends React.Component {
        constructor() {
            super()
            this.state = { date: new Date() }
            setInterval(this.tick.bind(this), 1000)
        }
    }
    

优化后：

    class Clock extends React.Component {
        state = { date: new Date() }
        constructor() {
            super()
            
            setInterval(this.tick.bind(this), 1000)
        }
    }
    

_Tip_：`setInterval()` 通常会移出构造函数，例如放在某生命钩子函数中，所以整个构造函数 `constructor()` 都可以省略

#### 在函数组件中使用 state

**Hook 是 React 16.8 的新增特性**。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性 —— 官网-[Hook API 索引](https://zh-hans.reactjs.org/docs/hooks-reference.html "Hook API 索引")

前面我们一直是在 class 组件中使用 state。就像这样：

    class Clock extends React.Component {
        state = { date: new Date(), name: 'pjl' }
        constructor() {
            super()
            setInterval(this.tick.bind(this), 1000)
        }
        tick() {
            this.setState({
                date: new Date()
            })
        }
        render() {
            return (
                <div>
                    <h1>Hello, world! {this.state.name}</h1>
                    <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
                </div>
            );
        }
    }
    

而通过 `useState` Hook 能让我们在函数组件使用 `state`。实现上述相同的功能：

     function Clock() {
        // 一个 state 就得调用一次 useState()
        const [name] = React.useState('pjl')
        // 解构赋值
        const [date, setDate] = React.useState(new Date())
    
        setInterval(() => {
            // 更新 state
            setDate(new Date())
        }, 1000)
    
        return (
            <div>
                <h1>Hello, world! {name}</h1>
                <h2>It is {date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
    

*   一个 state 就得调用一次 useState(initialState)
*   React.useState 返回一个 state，以及更新 state 的函数
*   在初始渲染期间，返回的状态 (state) 与传入的第一个参数 (initialState) 值相同
*   在后续的重新渲染中，useState 返回的第一个值将始终是更新后最新的 state

_Tip_：请问控制台输出几次 a：

    function Clock() {
        console.log('a')
        // ... 不变
    }
    

答案是：`1 + N` 次。Clock 函数被反复的调用，但 `useState()` 返回的第一个值始终是更新后最新的 state，所以能猜出 react 做了特殊处理。

### 事件处理

#### 事件命名采用小驼峰式

React 事件的命名采用**小驼峰式**（camelCase），而不是纯小写。例如在 html 中通常都是[小写](https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalEventHandlers "全局事件处理程序")，就像这样：

    // onclick - 小写
    <button onclick="alert('Hello world!')">click</button>
    

下面这个组件，每点击一次 button，控制台就会输出一次 `lj`：

    class EventDemo1 extends React.Component {
        handleClick() {
            console.log('lj')
        }
        render() {
            return (
                <button onClick={this.handleClick}>
                    click
                </button>
            );
        }
    }
    

_Tip_：使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串 —— 官网

倘若将 `onClick` 改成 `onclick`，浏览器控制台将报错如下：

    Warning: Invalid event handler property `onclick`. Did you mean `onClick`?
    

#### 事件中的 this

假如我们在 EventDemo1 中读取状态。就像这样：

    class EventDemo1 extends React.Component {
        state = { name: 'lj' }
        handleClick() {
            console.log(typeof this)
            // 读取状态
            console.log(this.state.name)
        }
        render() {
            return (
                <button onClick={this.handleClick}>
                    click
                </button>
            );
        }
    }
    

控制报错：

    undefined
    Uncaught TypeError: Cannot read properties of undefined (reading 'state')
    

我们根据错误信息能推测出在 `handleClick()` 方法中没有 `this`。

_Tip_：现在有一个事实：即我们自己的方法中没有 this，而 render() 方法中却有 this。猜测 react 只帮我们处理了 render() 方法中的 this。

所以，我们需要处理一下自定义方法中的 `this`。请看实现：

    class EventDemo1 extends React.Component {
        state = { name: 'lj' }
       
        handleClick = () => {
            console.log(typeof this)
            console.log(this.state.name)
        }
        render() {
            // ...
        }
    }
    

每次点击 button，都会输出：

    object
    lj
    

处理 this 的方法有两点：

*   将原型中的方法移到实例上来
*   使用箭头函数。由于箭头函数没有 this，而将箭头函数中的 this 输出来，却正好就是实例

_Tip_：还可以只使用箭头函数来绑定 this，就像这样：

    class EventDemo1 extends React.Component {
        state = { name: 'lj' }
        handleClick() {
            console.log(typeof this)
            // 读取状态
            console.log(this.state.name)
        }
        render() {
            return (
                // 箭头函数
                <button onClick={() => this.handleClick()}>
                    click
                </button>
            );
        }
    }
    

#### 使用 preventDefault 阻止默认行为

在 html 中我们阻止默认行为可以通过 `return false`。就像这样：

    // 每次点击 button，控制将输出 'You clicked submit.'，而不会提交
    <body>
        <form onsubmit="console.log('You clicked submit.'); return false">
            <button type="submit">Submit</button>
        </form>
    </body>
    

但是在 react 却不能通过返回 false 的方式阻止默认行为。而必须显式的使用 `preventDefault`。就像这样：

    function Form() {
      function handleSubmit(e) {
        // 阻止默认行为
        e.preventDefault();
        console.log('You clicked submit.');
      }
    
      return (
        <form onSubmit={handleSubmit}>
          <button type="submit">Submit</button>
        </form>
      );
    }
    

### ref

我们首先**回忆**一下 vue 中的 ref：

ref 被用来给元素或子组件注册引用信息 —— vue 官网

引用信息将会注册在父组件的 `$refs` 对象上。请看示例：

    <!-- `vm.$refs.p` will be the DOM node -->
    <p ref="p">hello</p>
    
    <!-- `vm.$refs.child` will be the child component instance -->
    <child-component ref="child"></child-component>
    

如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例。

那么 react 中的 ref 是否也是这个作用？我们可以从其用法上去做判断。

React 支持一个特殊的、可以附加到任何组件上的 ref 属性。此属性可以是一个由 `React.createRef()` 函数创建的对象、或者一个回调函数、或者一个字符串（遗留 API） —— 官网-[ref](https://zh-hans.reactjs.org/docs/glossary.html#refs "ref")

于是我们知道在 react 中 ref 属性可以是一个对象、回调函数，亦或一个字符串。

#### String 类型的 Refs

下面这个例子将 ref 分别应用在 `dom 元素`和`子组件`中：

    class ASpan extends React.Component {
        render() {
            return <span>click</span>
        }
    }
    
    class EventDemo1 extends React.Component {
        handleClick() {
            console.log(this.refs)
            console.log(this.refs.aButton.innerHTML)
        }
        render() {
            return (
                // 箭头函数
                <button ref="aButton" onClick={() => this.handleClick()}>
                    <ASpan ref="aSpan" />
                </button>
            );
        }
    }
    

点击按钮，控制台输出：

    {aSpan: ASpan, aButton: button}
    <span>click</span>
    

_Tip_：用法上和 vue 中的 `vm.$refs` 非常相似。

_注_：如果你目前还在使用 `this.refs.textInput` 这种方式访问 refs ，我们建议用`回调函数`或 `createRef API` 的方式代替 —— 官网-[过时 API：String 类型的 Refs](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs "过时 API：String 类型的 Refs")

#### 回调 Refs

React 也支持另一种设置 refs 的方式，称为“回调 refs”。它能助你更精细地控制何时 refs 被设置和解除 —— 官网-`回调 Refs`

将字符串式 Refs 示例改成`回调式`。请看示例：

    class EventDemo1 extends React.Component {
        handleClick() {
            console.log(this.refs)
            console.log(this.button.innerHTML)
        }
        setButtonRef = (element) => {
            this.button = element
        }
        render() {
            return (
                // 使用 `ref` 的回调函数将按钮 DOM 节点的引用存储到 React
                // 实例上（比如 this.button）
                <button ref={this.setButtonRef} onClick={() => this.handleClick()}>
                    click
                </button>
            );
        }
    }
    

点击按钮，控制台输出：

    {}
    click
    

回调函数中接受 React 组件实例或 HTML DOM 元素作为参数，以使它们能在其他地方被存储和访问。

##### 内联函数

可以将 refs 回调函数直接写在 ref 中。就像这样：

    // 与上面示例效果相同
    <button ref={element => this.button = element} onClick={() => this.handleClick()}>
        click
    </button>
    

##### 回调次数

如果 ref 回调函数是以内联函数的方式定义的，在更新过程中它会被执行**两次**，第一次传入参数 null，然后第二次会传入参数 DOM 元素 —— 官网-`关于回调 refs 的说明`

请看示例：

    class EventDemo1 extends React.Component {
        state = { date: new Date() }
        constructor() {
            super()
            setInterval(() => {
                this.setState({ date: new Date() })
            }, 3000)
        }
        render() {
            return (
                <button ref={element => { this.button = element; console.log('ref'); }}>
                    click {this.state.date.toLocaleTimeString()}
                </button>
            );
        }
    }
    

首先输出 `ref`，然后每过 3 秒就会输出 2 次 `ref`。

_Tip_：大多数情况下它是无关紧要的 —— 官网

#### createRef API

将回调 refs 的例子改成 createRef 形式。请看示例：

    class EventDemo1 extends React.Component {
        constructor() {
            super()
            this.button = React.createRef()
            // this.textInput = React.createRef()
        }
        handleClick() {
            // dom 元素或子组件可以在 ref 的 current 属性中被访问
            console.log(this.button.current.innerHTML)
        }
        render() {
            return (
                <button ref={this.button} onClick={() => this.handleClick()}>
                    click
                </button>
            )
        }
    }
    

每点击一下 button，控制台将输出一次 `click`。

Refs 是使用 React.createRef() 创建的，并通过 ref 属性附加到 React 元素。在构造组件时，通常将 Refs 分配给实例属性，以便可以在整个组件中引用它们 —— 官网-`创建 Refs`

如果需要在增加一个 ref，则需要再次调用 `React.createRef()`。

#### 在函数组件中使用 ref

你不能在函数组件上使用 ref 属性，因为他们没有实例 —— 官网-`访问 Refs`

而通过 `useRef` Hook 能让我们在函数组件使用 `ref`。重写 class 组件 EventDemo1：

    function EventDemo1() {
        const button = React.useRef(null)
    
        function handleClick() {
            console.log(button.current.innerHTML)
        }
        return (
            <button ref={button} onClick={() => handleClick()}>
                click
            </button>
        )
    }
    

每点击一下 button，控制台将输出一次 `click`。

    const refContainer = useRef(initialValue);
    

useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue） —— 官网-[useref](https://zh-hans.reactjs.org/docs/hooks-reference.html#useref "useref")

作者：[彭加李](https://www.cnblogs.com/pengjiali/)  
出处：[https://www.cnblogs.com/pengjiali/p/16013170.html](https://www.cnblogs.com/pengjiali/p/16013170.html)  
本文版权归作者和博客园共有,欢迎转载,但未经作者同意必须保留此段声明,且在文章页面明显位置给出原文连接。