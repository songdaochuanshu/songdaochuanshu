---
layout: post
title: "使用 AHK 在 VS Code 中根据上下文自动切换输入法状态"
date: "2022-03-17T12:32:30.632Z"
---
使用 AHK 在 VS Code 中根据上下文自动切换输入法状态
================================

在VSCode中根据上下文自动切换输入法状态，再也不用狂点shift了！

平常在**VS Code**打公式，中英文切换一直狂点 Shift 手都快按断了，于是试图用 AutoHotKey 搞一些自动切换输入法程序，让它根据当前输入环境自动切输入法。

之前在网上搜到的是切换键盘的（微软拼音和美式键盘），但是我的电脑上只有微软拼音。一开始搜不到简单易懂的切换中英文的方法，能搜到的只有一个日本人写的 AHK V1 版本，但基本看不懂。或许最好的方法是**找到接口，然后直接切中英文**，于是开始一通乱搜，最终用 **AHK V2 + Ultra IME Toggler 插件** 实现了功能

检测中英文状态的接口
----------

转机在这里，一通乱搜找到了这个

[![](https://github-readme-stats.vercel.app/api/pin/?username=mudssky&repo=myAHKScripts&show_owner=true)](https://github.com/mudssky/myAHKScripts)

这是用 **AutoHotKey V2 版本**写的，可读性要比 V1 好些。一番尝试，最终找到了判断当前输入法中英文的核心代码，如下所示

    DetectHiddenWindows True
    isEnglishMode(){
        hWnd := winGetID("A")
        result := SendMessage(
            0x283, ; Message : WM_IME_CONTROL
            0x001, ; wParam : IMC_GETCONVERSIONMODE
            0,     ; lParam ： (NoArgs)
            ,      ; Control ： (Window)
                   ; Retrieves the default window handle to the IME class.
            "ahk_id " DllCall("imm32\ImmGetDefaultIMEWnd", "Uint", hWnd, "Uint")
        )
        ; 返回值是0表示是英文模式，其他值表明是中文模式
        return result == 0
    }
    

这一段代码使用 `SendMessage` 来获得输入法的状态，其中：

*   `0x283` 信息代表的是 `WM_IME_CONTROL` ，即“控制输入法”；
*   `0x001` 对应的信息是 `IMC_GETCONVERSIONMODE` ，即“拿到输入法中英文状态”。
*   另外用 `winGetID` 拿到窗口。

`SendMessage()` 最后返回 `0` 或者 `1` ，分别代表中英文模式。

然后只要根据返回值，就可以判断中英文模式了。能判断了就好办，可以根据需要发送按键来切中英文了。

去掉注释后（就是分号 `;` 后面的部分），代码如下，是不是很简单？

    DetectHiddenWindows True
    isEnglishMode(){
        hWnd := winGetID("A")
        result := SendMessage(
        	0x283, 0x001, 0,, "ahk_id " DllCall("imm32\ImmGetDefaultIMEWnd", "Uint", hWnd, "Uint")
        )
        return result == 0
    }
    

后面可以加上类似这种代码，如下面的示例就是一个“强制左 Shift 切成中文”的方法：

    LShift::{
        if(isEnglishMode())
            Send "{Shift}"
    }
    

切换中英文状态的接口
----------

接下来更进一步，能不能直接用 `WinApi` 控制输入法中英文？

查了好久，最终发现和上面的是邻居：**把 `0x001` 改成 `0x002` 就是 `IMC_SETCONVERSIONMODE` ，即控制中英文状态的接口**！这个怀疑不同输入法不一样，有的似乎是 `0x006` 。

然后将 `lParam` 传一个参数，一般 `1025` 表示中文，`0` 表示英文，参考[这篇文章](https://zhuanlan.zhihu.com/p/425951648)。这样执行函数，就能直接设定中英文模式！

如下面就是一个完整的左 Shift 切成中文的 ahk V2 程序，简单粗暴：

    LShift::{
        DetectHiddenWindows True
        hWnd := winGetID("A")
        SendMessage(
            0x283, ; Message : WM_IME_CONTROL
            0x002, ; wParam : IMC_SETCONVERSIONMODE
            1025,  ; lParam ：1025 - CN
            ,
            "ahk_id " DllCall("imm32\ImmGetDefaultIMEWnd", "Uint", hWnd, "Uint")
        )
    }
    

是不是很好用！

与 VS Code 联动！
-------------

折腾这个的原意是 **免去在 VSCode 上写 \\(LaTeX\\) 和 `markdown` 时切换中英文的麻烦** 。于是采取简单粗暴的方法：把上述 ahk 程序封装成exe，切成中英文分别写一个。然后写一个扩展！省事一点，调用 `HyperScopes` 插件拿到当前的 `Scopes` ，如果检测到公式环境，就自动切成英文，公式外面切成中文，只要调用相应的 exe 即可。

最后成功实现，效果如下图（**注意输入法状态**）：

![image](https://img2022.cnblogs.com/blog/2276410/202203/2276410-20220317180119551-2087693593.gif)

实测切换的延时大概 0.02s，基本感受不到了。

如果想体验一下测试版，可以从 [Github](https://github.com/yfzhao20/Ultra-IME-for-VSCode/tree/main/ime) 上或者 [蓝奏云-密码7o5t](https://wwe.lanzouy.com/b0213ygtg)下载 `IMEtoCN.exe` 和 `IMEtoEN.exe` ，放到一个特定的文件夹，再将这个文件夹**添加到环境变量**（可能需要重启计算机），插件市场搜索 **`Ultra IME Toggler`** 安装，然后就可以体验了！

来 Github 给个 ⭐ 呀！

[![](https://github-readme-stats.vercel.app/api/pin/?username=yfzhao20&repo=Ultra-IME-for-VSCode&show_owner=true)](https://github.com/yfzhao20/Ultra-IME-for-VSCode)

* * *

_原文链接：[https://www.cnblogs.com/yf-zhao/p/16018481.html](https://www.cnblogs.com/yf-zhao/p/16018481.html) 转载请注明出处！_