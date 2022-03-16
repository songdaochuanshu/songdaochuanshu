---
layout: post
title: "JavaScript的事件循环机制浅析"
date: "2022-03-16T08:59:56.349Z"
---
JavaScript的事件循环机制浅析
===================

### **前言**

JavaScript是一门单线程的弱类型语言，但是我们在开发中，经常会遇到一些需要异步或者等待的处理操作。  
类似ajax，亦或者ES6中新增的promise操作用于处理一些回调函数等。

### **概念**

在JavaScript代码执行过程中，可以分为同步队列和异步队列。

1.  同步任务类似我们常说的立即执行函数，不需要等待可以直接进行，可以直接进入到主线程中去执行，类似正常的函数调用等。
    
2.  异步队列则是异步执行函数，类似ajax请求，我们在发起的过程中，会进入到一个异步队列，加载到任务当中时，需要进行等待，之后才能进行返回值的处理。
    

### **举个栗子**

下面一段代码，我们可以先了解一些一些关于事件循环机制的一些基本的原理

    
    console.log('1');
    setTimeout(function() {
      console.log('4');
    }, 0);
    Promise.resolve().then(function() {
      console.log('2');
    }).then(function() {
      console.log('3');
    });
    console.log('5');
    

我们将代码打印到控制台当中，输出结果是：1，5，2，3，4

我们知道，在JavaScript中，类似定时器，以及ES6新增的promise是异步函数，回到我们上面所说的队列的概念当中，不难得出，1和5为同步执行队列

在执行完同步队列中的代码之后，再执行异步队列中的代码。

### **TIP**

在解析异步队列的promise和定时器中，我们发现，定时器**setTimeout**是后执行于**promise**，这里我们引入JavaScript规范中的宏任务**（Macro Task**）和微任务**（Micro Task）**的概念

在JavaScript中，宏任务包含了：**script( 整体代码)、setTimeout、setInterval、I/O、UI 交互事件、setImmediate(Node.js 环境)**

微任务：**Promise、MutaionObserver、process.nextTick(Node.js 环境)**

再回到上面的定时器和promise的问题，这时候我们知道，JavaScript中，当有异步队列的时候，优先执行微任务，再执行宏任务

### **再次举个栗子**

假如在异步队列当中存在异步队列时，我们需要怎么处理

    console.log(1);
    setTimeout(function() {
      console.log(5);
    }, 10);
    new Promise(resolve => {
        console.log(2);
        resolve();
        setTimeout(() => console.log(3), 10);
    }).then(function() {
        console.log(4);
    })
    console.log(6);
    

将代码执行到控制台中，得出的打印顺序是：1,2,6,4,5,3

*   不同于例子1当中的promise，打印2是优先于6执行的，由此我们可以知道，new Promise在执行过程中，在未执行resolve或者rejected前，所执行的代码均为同步队列中的代码。
    
*   再看4，5，3的执行顺序，在执行微任务promise执行回调resolve之后，对应的then立即执行
    
*   在打印结果中，定时器5优先执行于---->属于微任务promise中的宏任务定时器3，定时器5这个宏任务是在promise微任务这个队列之后就加进去，在promise执行完成then回调之后，promise中的宏任务才加入到队列当中，因此在定时器5之后执行
    

### **总结**

在JavaScript中，宏任务包含了：**script( 整体代码)、setTimeout、setInterval、I/O、UI 交互事件、setImmediate(Node.js 环境)**

微任务：**Promise、MutaionObserver、process.nextTick(Node.js 环境)；**

在执行过程中，同步代码优先于其他任务队列中的代码，  
定时器，promise这类任务，在执行过程中，会先加入队列，  
在执行完同步代码之后，再根据宏任务和微任务的分类，先执行微任务队列，再执行宏任务队列。

文章个人博客地址：[JavaScript的事件循环机制](http://lewyon.xyz/eventLoop.html)