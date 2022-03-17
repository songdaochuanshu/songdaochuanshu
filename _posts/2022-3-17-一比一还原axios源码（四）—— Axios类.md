---
layout: post
title: "一比一还原axios源码（四）—— Axios类"
date: "2022-03-17T04:23:11.801Z"
---
一比一还原axios源码（四）—— Axios类
========================

　　axios源码的分析，到目前为止，算上第0章已经四章了，但是实际上，还都没有进入axios真正的主线，我们来简单回顾下。最开始我们构建了get请求，写了重要的buildURL方法，然后我们处理请求体请求头，响应体响应头，这样我们就可以传json对象了，然后还加入了promise，让我们可以链式点用，最后还加了错误处理，让我们可以更好的操作请求信息。

　　但是，大家发现了没有，目前为止我们所写的核心其实就是一个XMLHttpRequest对象，所有的内容都围绕着这个对象。代码也没有做太清晰的分割，那么今天，我们就来完成axios的核心主题，也就是Axios类，有了这个，大家就可以通过一些直观的方法来快速的调用axios的请求API了。

　　依照惯例，从axios的API入手，我们今天要实现的内容如下：

![](https://img2022.cnblogs.com/blog/1184971/202202/1184971-20220228110242040-372171102.png) 

　　那么接下来我们就进入正题吧。

　　首先，我们在core文件夹下创建一个Axios文件。声明一个Axios类：

export default function Axios(config) {}

　　这个axios很简单，我们暂时这样，什么都不需要。然后我们在Axios的原型上挂载一个request方法，这个方法是真正的请求方法，也就是说，所有的axios请求，其实都是request。

Axios.prototype.request = function (url, config) {
  if (typeof url === "string") {
    if (!config) {
      config \= {};
    }
    config.url \= url;
  } else {
    config \= url;
  }
  return dispatchRequest(config);
};

　　首先我们来看下，request方法实际上有两个核心，一个是**参数的重载**，听起来很高大上，实际上就是可以传一个参数，也可以把url单独抽离出来作为参数及其他的config来传递，最重要的就是dispatchRequest，上面说所有的axios的请求都是request，那么其实request，就是dispatchRequest。我们来看下，怎么搞出来的dispatchRequest。

　　![](https://img2022.cnblogs.com/blog/1184971/202203/1184971-20220301153924775-43453888.png)

 　　还记不记得之前lib根目录下的axios，没错，把里面的代码复制过来就可以了。那axios就没东西了，我们改下axios里的代码：

import Axios from "./core/Axios";
import bind from "./helpers/bind";
import utils from "./utils";
/\*\*
 \* Create an instance of Axios
 \*
 \* @param {Object} defaultConfig The default config for the instance
 \* @return {Axios} A new instance of Axios
 \*/
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance();

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

export default axios;

　　诶？怎么代码风格变了？好吧，我承认这是从axios源码复制过来的，毛都没改，就改了改引用。然后呢，这个createInstance实际上就是个工厂函数。创建并返回axios的实例。我们暂时不看extend和bind具体的源码，从字面意思来看，instance实例上绑定request方法，也就是说，我可以直接使用axios.request。extend就是把某些东西，也就是复制了属性到实例上。OK，到此，核心的axios体系基本上完成了。但是我们还漏了一个很重要的事情，就是本章最开始的调用方式，我们希望可以在实例上直接调用get、post等方法。那么我们来看下代码：

// Provide aliases for supported request methods
utils.forEach(
  \["delete", "get", "head", "options"\],
  function forEachMethodNoData(method) {
    /\*eslint func-names:0\*/
    Axios.prototype\[method\] \= function (url, config) {
      return this.request(
        mergeConfig(config || {}, {
          method: method,
          url: url,
          data: (config || {}).data,
        })
      );
    };
  }
);

utils.forEach(\["post", "put", "patch"\], function forEachMethodWithData(method) {
  /\*eslint func-names:0\*/
  Axios.prototype\[method\] \= function (url, data, config) {
    return this.request(
      mergeConfig(config || {}, {
        method: method,
        url: url,
        data: data,
      })
    );
  };
});

　　上面把方法分成了两类，一类是有body的，一类是没有的。然后调用request，把参数传进去就好了，简单的一批。至于mergeConfig方法，咱们稍后面再说。我会尽可能的把他们都注释一遍，可以去源码里查阅，因为这些东西都差不多可以拆出来，单独使用，不在axios的核心线上，utils是单纯的工具，与业务无关，而helpers包含了对业务的一定的抽象和关联。到这里，我们就可以使用axiso.get这样的方法来调用接口了。

　　那，额外的，我们来分析下bind、extend和mergeConfig方法：

#### 1.bind

　　我们先来看下代码：

export default function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args\[i\] \= arguments\[i\];
    }
    return fn.apply(thisArg, args);
  };
}

　　咱们先来字面看一下，传入了一个fn和thisArg参数，然后返回了一个wrap函数。wrap里面根据wrap的arguments长度创建了个数组，然后挨个的把arguments的参数复制给args，然后再返回一个fn.apply。所以，字面意思咱们理解了，但是它到底干了啥呢？我们就拿用到了它的地方做个举例：

  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

　　那怎们把参数传进去，其实他就是：

return Axios.prototype.request.apply(context, args);

　　解释下这句话吧，就是request方法的this只想context，也就是new Axios(defaultConfig)，然后把args作为参数传进去，那args就是传给wrap的参数。那我们再写个例子：

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body></body>
  <script>
    function bind(fn, thisArg) {
      return function wrap() {
        console.log(arguments);
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args\[i\] \= arguments\[i\];
        }
        return fn.apply(thisArg, args);
      };
    }

    function A(config) {
      console.log(config);
    }
    A.prototype.request \= function () {
      console.log("request");
    };
    var context = new A({ a: 2, b: 3 });
    var instance = bind(A.prototype.request, context);
    instance(1, 2, 3);
  </script>
</html>

　　大家捋一下哦。我们再回到这块代码：

function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

　　最后，我们返回了instance，对吧？那么就意味着我们可以这样用：

instance({
   method:'post',
   // xxxxxx  
})

　　那我有个问题，最终这个传递的参数给了谁？如果不知道答案的话，那就再回头看一遍吧～～～。

#### 2.extend

　　extend方法，说白了，就是把a的属性，复制给b没了。我们来看下代码：

function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === "function") {
      a\[key\] \= bind(val, thisArg);
    } else {
      a\[key\] \= val;
    }
  });
  return a;
}

　　我们来看下，字面意思的话，就是，如果有thisArg，并且某一个b中的属性是一个函数，那么a中对应的key就是bind后的函数，否则就是单纯的复制。简单吧～～～。那这里我就不说bind是咋回事了啊，看不懂回头看啊。咱们这叫一步三回头。：）

#### 3.mergeConfig

　　这个呢，看起来复杂， 说起来简单，因为篇幅较长，我就不在这里说了，大家自己去项目中[对应的分支](https://github.com/zakingwong/zaking-axios/blob/c4/lib/core/mergeConfig.js)看注释哦。但是我简单说下，这个mergeConfig实际上使用了一种策略模式，简单点说其实就是根据不同的对象，来分配不同的合并方法。一共有那么1、2、3、4、5，哦对，四种合并策略（去看了源码你就知道我这里没说错了，我扩起来说是怕你骂我，你骂我倒无所谓，我怕你骂错了，嘻嘻）。

　　我们再来回顾下，今天的核心主线：

1.  创建Axios类。
2.  在Axios的原型上扩展核心request方法。
3.  扩展其他alias方法，内部就是调用的request。
4.  创建dispatchRequest，是request方法的核心（就是之前旧的lib/axios里的代码）。
5.  创建createInstance工厂函数，绑定数据到实例上。
6.  解释了bind、extend方法的含义，mergeConfig自己去代码看。

　　今天就做了这些，其实不复杂，跟着我，带你一比一还原axios（其实就是教你怎么抄）。额……咳咳……读书人的事，怎么能叫做抄呢～～我们下一章子再抄，哦不，再借鉴噢。

站在巨人的肩膀上，希望我可以看的更远。