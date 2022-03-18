---
layout: post
title: "从零开始，开发一个 Web Office 套件（11）：支持中文输入法（or 其它使用输入法的语言）"
date: "2022-03-18T13:31:29.268Z"
---
从零开始，开发一个 Web Office 套件（11）：支持中文输入法（or 其它使用输入法的语言）
==================================================

> 这是一个系列博客，最终目的是要做一个基于 HTML Canvas 的、类似于微软 Office 的 Web Office 套件（包括：文档、表格、幻灯片……等等）。  
> 博客园：[《从零开始, 开发一个 Web Office 套件》系列博客目录](https://www.cnblogs.com/forzhaokang/p/15907371.html)  
> 富文本编辑器 Github repo 地址：[https://github.com/zhaokang555/canvas-text-editor](https://github.com/zhaokang555/canvas-text-editor)  
> 富文本编辑器 在线 Demo：[https://zhaokang555.github.io/canvas-text-editor/](https://zhaokang555.github.io/canvas-text-editor/)

2\. 富文本编辑器（MVP）
===============

2.23 Feature：通过中文输入法，输入中文
-------------------------

### 2.23.1 基本原理

输入中文（或者其它需要输入法的语言），跟输入英文的不同之处在于：我们通过键盘输入的文字，并不是直接显示在input框里。而是要通过输入法进行映射、选择，再填入input框里。

这里就牵扯到三个事件，我们可以看下MDN文档：

*   `compositionstart`：[https://developer.mozilla.org/zh-CN/docs/Web/API/Element/compositionstart\_event](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/compositionstart_event)
*   `compositionupdate`: [https://developer.mozilla.org/zh-CN/docs/Web/API/Element/compositionupdate\_event](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/compositionupdate_event)
*   `compositionend`: [https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionend\_event](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionend_event)

上面的文档里还有demo可以玩儿，通过它可以更好地帮助我们理解这三个事件代表的含义：

![](https://img2022.cnblogs.com/blog/716127/202203/716127-20220315102413682-1216360811.gif)

同时，我们还需要了解下`InputEvent`的以下两个属性：

*   `InputEvent.isComposing`: [https://developer.mozilla.org/zh-CN/docs/Web/API/InputEvent/isComposing](https://developer.mozilla.org/zh-CN/docs/Web/API/InputEvent/isComposing)
*   `InputEvent.inputType`: [https://developer.mozilla.org/zh-CN/docs/Web/API/InputEvent/inputType](https://developer.mozilla.org/zh-CN/docs/Web/API/InputEvent/inputType)

为了更形象地理解这两个属性，我做了一个小demo。对比了输入英文和中文时，这些属性的区别：

![](https://img2022.cnblogs.com/blog/716127/202203/716127-20220315103825639-571850653.gif)

### 2.23.2 算法

1.  在我们输入中文过程中，需要在编辑器中插入一些特殊的临时字符。我们称之为TempCompositionChar
2.  每当我们按一次键盘：
    1.  清空上一次插入的所有TempCompositionChar
    2.  将光标相对字符的位置（`cursorIdxInChars`，`cursorIdxInCurPara`）回退
    3.  插入新的CompositionChars
3.  当我们的输入法完成一次输入，将文字填充入input框里时（即：触发compositionend事件时）：将TempCompositionChar固定下来，改为CompositionChar

### 2.23.3 实现

新建`CompositionChar`类:

![](https://img2022.cnblogs.com/blog/716127/202203/716127-20220315153706879-2141796221.png)

在Store中添加如下方法：

*   插入单个字符
*   批量插入字符
*   清空所有临时字符
*   固定所有临时字符，将其转化为CompositionChar

![](https://img2022.cnblogs.com/blog/716127/202203/716127-20220315160807349-1249488518.png)

其中，char.moveCursorToMyRight是我们重构之后，从click回调中抽象出来的函数：

![](https://img2022.cnblogs.com/blog/716127/202203/716127-20220315161142111-360530914.png)

在input事件回调中，判断输入的是英文还是中文，然后调用相关逻辑：

![](https://img2022.cnblogs.com/blog/716127/202203/716127-20220315160924347-1259702436.png)

### 2.23.4 效果

![](https://img2022.cnblogs.com/blog/716127/202203/716127-20220315161310564-435445804.gif)

（未完待续）