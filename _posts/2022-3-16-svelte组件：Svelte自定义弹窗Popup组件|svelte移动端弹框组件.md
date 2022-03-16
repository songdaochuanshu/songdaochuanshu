---
layout: post
title: "svelte组件：Svelte自定义弹窗Popup组件|svelte移动端弹框组件"
date: "2022-03-16T18:14:27.057Z"
---
svelte组件：Svelte自定义弹窗Popup组件|svelte移动端弹框组件
=========================================

基于Svelte3.x自定义多功能svPopup弹出框组件(组件式+函数式)

前几天有分享一个[svelte自定义tabbar+navbar组件](https://www.cnblogs.com/xiaoyan2017/p/15996146.html)，今天继续带来svelte自定义弹窗组件。

**svPopup** 一款基于 Svelte.js 开发的手机端弹框组件。汇集了msg、info、toast、alert、dialog、actionsheet等多种类型弹窗。支持 **25+** 参数自定义搭配组合、**组件式+函数式**两种调用方式。

![](https://img2022.cnblogs.com/blog/1289798/202203/1289798-20220316230953771-947069283.gif)

由于svelte框架比较新，一些相关的项目案例及自定义组件例子比较少，只能看官方语法文档，并结合之前开发的一些vue3弹窗插件，最后实现了如上图所示的svelte自定义弹框。

### **◆ 引入组件**

在需要使用弹窗功能的页面引入_Popup_组件。

import Popup, {svPopup} from '$lib/Popup'

其中 Popup 是组件式调用， svPopup 是函数式调用。

*   **组件式写法**

<Popup 
    bind:open\={isVisibleDialog}
    xclose
    xposition\="top"
    title\="标题信息"
    content\="这里是内容信息"
    btns\={\[
        {text: '确认', style: 'color:#f60;', click: () \=\> isVisibleDialog=false},
    \]}
    on:open={handleOpen}
    on:close={handleClose}
>
    <svelte:fragment slot\="content"\><h3\>自定义插槽显示插槽内容！！！</h3\></svelte:fragment\>
</Popup\>

*   **函数式写法**

let el = svPopup({
    title: '标题信息',
    content: '<p style='color:#df6a16;'>这里是内容信息</p>',
    xclose: true,
    xposition: 'top',
    shadeClose: false,
    btns: \[
        {text: '取消', click: () => { el.$set({open: false}) }},
        {text: '确认', style: 'color:#f90;', click: () => handleOK},
    \],
    onOpen: () \=> {},
    onClose: () \=> {}
})

一些简单的弹窗效果可以使用函数式调用，一些复杂的交互功能可以使用组件式自定义slot来实现功能。

![](https://img2022.cnblogs.com/blog/1289798/202203/1289798-20220316233908506-1488935349.png)

![](https://img2022.cnblogs.com/blog/1289798/202203/1289798-20220316233954838-1037127743.png)

<!-- msg提示 \-->
<Popup bind:open\={showMsg} anim\="fadeIn" content\="msg提示框测试（3s后窗口关闭）" shadeClose\="false" time\="3" />

<!-- 自定义多按钮 \-->
<Popup bind:open\={showMulityBtns} anim\="fadeIn" title\="<b style='color:red;'>温馨提示</b>" zIndex\="6666"
    content\="<div style='padding:10px 35px;'>是否检查软件更新并下载最新的更新？通过移动网络下载可能产生额外的费用。如果可能，通过WLAN网络下载。</div>"
    btns\={\[
        {text: '稍后提示', style: 'color:#2196f3;', click: () \=\> null},
        {text: '取消', style: 'color:#a9a9a9;', click: () => showMulityBtns=false},
        {text: '立即更新', style: 'color:#00e0a1;', click: handleInfo},
    \]}
/>

![](https://img2022.cnblogs.com/blog/1289798/202203/1289798-20220316234224266-1967813030.png)

![](https://img2022.cnblogs.com/blog/1289798/202203/1289798-20220316234249746-147365792.png)

![](https://img2022.cnblogs.com/blog/1289798/202203/1289798-20220316234331759-194331315.png)

<!-- 底部对话框 \-->
<Popup bind:open\={showFooter} anim\="footer" type\="footer" shadeClose\="false" zIndex\="1001"
    content\="确定删除该条数据吗？删除后可在7天之内恢复数据，超过7天后数据就无法恢复啦！"
    btns\={\[
        {text: '恢复', style: 'color:#00e0a1;', click: handleInfo},
        {text: '删除', style: 'color:#ee0a24;', click: () \=\> null},
        {text: '取消', style: 'color:#a9a9a9;', click: () => showFooter=false},
    \]}
/>

<!-- ActionSheet底部弹出式菜单 \-->
<Popup bind:open\={showActionSheet} anim\="footer" type\="actionsheet" zIndex\="2020"
    content\="弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内"
    btns\={\[
        {text: '拍照', style: 'color:#09f;', disabled: true, click: handleInfo},
        {text: '从手机相册选择', style: 'color:#00e0a1;', click: handleInfo},
        {text: '保存图片', style: 'color:#e63d23;', click: () \=\> null},
        {text: '取消', click: () => showActionSheet=false},
    \]}
/>

![](https://img2022.cnblogs.com/blog/1289798/202203/1289798-20220316234451400-878659200.png)

![](https://img2022.cnblogs.com/blog/1289798/202203/1289798-20220316234520003-21982872.png)

![](https://img2022.cnblogs.com/blog/1289798/202203/1289798-20220316234608733-1950613348.png)

<!-- Ios样式 \-->
<Popup bind:open\={showIos1} type\="ios" shadeClose\="false" title\="标题内容" zIndex\="1990"
    content\="弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内"
    btns\={\[
        {text: '知道了', click: () \=\> showIos1=false},
        {text: '确定', style: 'color:#00e0a1;', click: handleInfo},
    \]}
>
</Popup\>

<!-- Android样式 \-->
<Popup bind:open\={showAndroid1} type\="android" shadeClose\="false" xclose title\="标题内容" zIndex\="2000"
    content\="弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内"
    btns\={\[
        {text: '知道了', click: () \=\> showAndroid1=false},
        {text: '确定', style: 'color:#00e0a1;', click: handleInfo},
    \]}
>
</Popup\>

function handleInfo(e) {
    console.log(e)
    console.log('通过函数方式调用弹窗...')
    
    let el \= svPopup({
        title: '标题',
        content: \`<div style="padding:20px;">
            <p>函数式调用：<em style="color:#999;">svPopup({...})</em></p>
            
        </div>\`,
        btns: \[
            {
                text: '取消',
                click: () \=> {
                    // 关闭弹窗
                    el.$set({open: false})
                }
            },
            {
                text: '确认',
                style: 'color:#09f;',
                click: () \=> {
                    svPopup({
                        type: 'toast',
                        icon: 'loading',
                        content: '加载中...',
                        opacity: .2,
                        time: 2
                    })
                }
            },
        \]
    })
}

![](https://img2022.cnblogs.com/blog/1289798/202203/1289798-20220316235001392-368609905.png)

### **◆ Svelte弹窗编码实现**

*   支持如下参数自定义配置

<script>
    // 是否打开弹窗bind:open={showDialog}
    export let open = false
    // 弹窗标识符
    // export let id = 'svpopup-' + Math.random().toString(32)
    export let id = undefined
    // 标题
    export let title = ''
    // 内容
    export let content = ''
    // 弹窗类型
    export let type = ''
    // 自定义弹窗样式
    export let popupStyle = undefined
    // toast图标
    export let icon = ''
    // 是否显示遮罩层
    export let shade = true
    // 点击遮罩层是否关闭
    export let shadeClose = true
    // 遮罩层透明度
    export let opacity = ''
    // 是否显示圆角
    export let round = false
    // 是否显示关闭图标
    export let xclose = false
    // 关闭图标位置
    export let xposition = 'right'
    // 关闭图标颜色
    export let xcolor = '#333'
    // 弹窗动画
    export let anim = 'scaleIn'
    // 弹窗位置
    export let position = ''
    // 长按/右键弹窗
    export let follow = null
    // 弹窗自动关闭时间
    export let time = 0
    // 弹窗层级
    export let zIndex = 202203
    // 弹窗按钮组
    export let btns = null
    /\* export let btns = \[
        { text: '取消', style: 'color:#aaa', disabled: true, click: null },
        { text: '确定', style: 'color:#f90', click: null }
    \] \*/

    // 函数式打开|关闭回调
    export let onOpen = undefined
    export let onClose \= undefined

    // 接收函数式移除指令
    export let remove = undefined

    // ...

</script>

*   弹窗模板语法

<div class\="sv\_\_popup" class:opened class:sv\_\_popup-closed\={closeCls} id\={id} style\="z-index: {zIndex}" bind:this\={el}\>
    {#if bool(shade)}<div class\="vui\_\_overlay" on:click\={shadeClicked} style:opacity\></div\>{/if}
    <div class\="vui\_\_wrap"\>
        <div class\="vui\_\_wrap-section"\>
            <div class\="vui\_\_wrap-child {type&&'popupui\_\_'+type} anim-{anim} {position}" class:round style\="{popupStyle}"\>
                {#if title}<div class\="vui\_\_wrap-tit"\>{@html title}</div\>{/if}
                {#if icon&&type\=='toast'}<div class\="vui\_\_toast-icon"\>{@html toastIcon\[icon\]}</div\>{/if}
                {#if $$slots.content}
                    <div class\="vui\_\_wrap-cnt"\><slot name\="content" /></div\>
                {:else}
                    {#if content}<div class\="vui\_\_wrap-cnt"\>{@html content}</div\>{/if}
                {/if}
                <slot />
                {#if btns}
                    <div class\="vui\_\_wrap-btns"\>
                        {#each btns as btn,index}
                            <span class\="btn"style\="{btn.style}" on:click\={e =\> btnClicked(e, index)}>{@html btn.text}</span\>
                        {/each}
                    </div\>
                {/if}
                {#if xclose}<span class\="vui\_\_xclose {xposition}" style\="color: {xcolor}" on:click\={hide}\></span\>{/if}
            </div\>
        </div\>
    </div\>
</div\>

/\*\*
 \* @Desc     svelte自定义多功能弹框组件
 \* @Time     andy by 2022/3/15
 \* @About    Q：282310962  wx：xy190310
 \*/
<script>
    // ...
    import { onMount, afterUpdate, createEventDispatcher, tick } from 'svelte'
    const dispatch \= createEventDispatcher()

    let opened \= false
    let closeCls \= undefined
    let toastIcon \= {
        loading: '',
        success: '',
        fail: '',
    }

    const bool \= (boolean) => JSON.parse(boolean) ? true : false

    onMount(() \=> {
        console.log('监听弹窗开启...')
        return () => {
            console.log('监听弹窗关闭...')
        }
    })

    afterUpdate(() \=> {
        // console.log('监听弹窗更新...')
        /\* if(opened) {
            if(!open) {
                opened = false
                dispatch('close')
            }
        }else if(open) {
            opened = true
            dispatch('open')
        } \*/
    })

    $: if(open) {
        show()
    }else {
        hide()
    }

    /\*\*
     \* 打开弹窗
     \*/
    async function show() {
        if(opened) return
        opened \= true
        dispatch('open')
        typeof onOpen == 'function' && onOpen()

        zIndex \= getZIndex() + 1

        // 倒计时关闭
        if(time) {
            index++
            if(timer\[index\] != null) clearTimeout(timer\[index\])
            timer\[index\] \= setTimeout(() => {
                hide()
            }, parseInt(time)\*1000)
        }

        // 长按|右键菜单
        if(follow) {
            // ...
        }
    }

   /\*\*
     \* 关闭弹窗
     \*/
    function hide() {
        if(!opened) return
        closeCls \= true
        setTimeout(() \=> {
            opened \= false
            closeCls \= false
            open \= false
            // ...
        }, 200)
    }

    // 点击遮罩层
    function shadeClicked() {
        if(bool(shadeClose)) {
            hide()
        }
    }
    
    // ...// 临界坐标点
    function getPos(x, y, ow, oh, winW, winH) {
        let l \= (x + ow) > winW ? x - ow : x
        let t \= (y + oh) > winH ? y - oh : y
        return \[l, t\]
    }
</script>

Svelte官网有介绍，可以通过 _new Component_ 来实现挂载组件到**body**上。

 const component = new Component(options) 

import App from './App.svelte';

const app \= new App({
    target: document.body,
    props: {
        // assuming App.svelte contains something like
        // \`export let answer\`:
        answer: 42
    }
});

[https://svelte.dev/docs#run-time-client-side-component-api](https://svelte.dev/docs#run-time-client-side-component-api)

![](https://img2022.cnblogs.com/blog/1289798/202203/1289798-20220317000756676-898213888.png)

import Popup from './Popup.svelte'

let uuid \= function() {
    return 'svpopup-' + Math.floor(Math.random() \* 10000)
}

export function svPopup(options = {}) {
    options.id \= uuid()

    const mountNode \= document.createElement('div')
    document.body.appendChild(mountNode)

    const app \= new Popup({
        target: mountNode,
        props: {
            ...options,
            open: true,
            // 传入函数移除指令
            remove() {
                document.body.removeChild(mountNode)
            }
        }
    })
    return app
}

export default Popup

通过如上写法，就可以导出一个 Popup 组件及 svPopup 函数调用。

![](https://img2022.cnblogs.com/blog/1289798/202203/1289798-20220317001157371-274801193.png)

OK，以上就是svelte实现自定义弹窗组件的一些分享，希望对大家有所帮助~~💪

![](https://img2022.cnblogs.com/blog/1289798/202203/1289798-20220317001229719-980659657.gif)

本文为博主原创文章，未经博主允许不得转载，欢迎大家一起交流 QQ（282310962） wx（xy190310）