---
layout: post
title: "如何用webgl(three.js)搭建处理3D隧道、3D桥梁、3D物联网设备、3D高速公路、三维隧道桥梁设备监控-第十一课"
date: "2022-03-17T09:17:32.949Z"
---
如何用webgl(three.js)搭建处理3D隧道、3D桥梁、3D物联网设备、3D高速公路、三维隧道桥梁设备监控-第十一课
==============================================================

如何用three.js实现桥梁、隧道、3D桥梁、3隧道、3D大桥、3D高速公路、智慧制造、物联网3D、物业3D监控、物业基础设施可视化运维、3d建筑,webGL,threejs,bim管理系统

**开篇废话：**

跟之前的文章一样，开篇之前，总要写几句废话，大抵也是没啥人看仔细文字，索性我也想到啥就聊啥吧。

这次聊聊疫情，这次全国多地的疫情挺严重的，本人身处深圳，深圳这几日报导都是几十几十的新增病例，整个深圳都按下了暂停键。在此也真诚的感谢在一线辛苦抗疫的医护工作者、自愿者以及政府工作人员们。

疫情起起伏伏，着实对经济的冲击还是挺大的，大家也都切身感受到了疫情对我们的生活影响了，社会上也出现了一些质疑的声音，有质疑动态清零的，也有标榜国外放弃抗疫的。国外的国情、政治文化，我们且按下不表。

且说说我个人的观点吧，首先我也是快十年的老党员了，深知我党的宗旨：全心全意为人民服务。一切为了人民，保障人民的生命财产安全。这些年，特别是疫情这两年，也能看出我党维护宗旨的坚定与决心。

政府的任何一个决策都是经过深思熟虑，深入研究调查的，比如动态清零政策，无论从经济、政治、文化角度，我们都有充足的理由需要这样做，再从死亡率角度讲，无论死亡率有多低，发生在任何一个家庭，都是不可接受的。

加上我国人口基数大，如果放弃动态清零，病毒发生变异的可能性会增加，如果往好的方向变异也就罢了，但如果往坏的方向变异，那损失是不可计量的。

这些日子居家办公中，一时兴起，讲了些自己的观点，闲话少叙，我们进入正题

**项目背景：**

随着三维可视化技术越来越普及，应用的行业也是越来越多，前面的文章，我们介绍了[三维园区](https://www.cnblogs.com/yeyunfei/p/15579303.html)，[三维机房（数据中心）](https://www.cnblogs.com/yeyunfei/p/13447395.html)，[三维消防模拟](https://www.cnblogs.com/yeyunfei/p/9629405.html)，[三维库房](https://www.cnblogs.com/yeyunfei/p/10473039.html)，[档案室](https://www.cnblogs.com/yeyunfei/p/8811228.html)，[数字孪生](https://www.cnblogs.com/yeyunfei/p/15676559.html)，等等。

鉴于可视化方案的直观可控，及时反馈，冲击力强，美观大气等特点。对于桥梁，隧道上三维可视化系统也有充分的必要性与实用性。

  **一、方案设计：**

 针对桥梁隧道方案，初步设计以监控物联网设备为主，前置设备将数据传给中间网关，网关再将数据传给平台，平台端与三维进行数据交互

采用rest方式提供接口协议，websoket方式实时监控告警。

三维端以主动获取方式去拉去数据。对于实时性要求高的数据，比如告警、应力值等采用websoket方式保持实时性。

![](https://img2022.cnblogs.com/blog/800616/202203/800616-20220317115136272-1654740469.png)

1.动态加载

在系统的某些场景中采用了模型动态加载技术，比如在自动巡检功能，初期方法是在点击自动巡检时加载所有设备模型到场景中，这时设备数量稍多便会造成运行卡顿，为了解决这个问题，采取即时加载即时删除的方法，设置加载阀值和移除阀值，当camera运行到接近装置设备时达到加载阀值，在这时加载此装置设备中所有的设备模型，然后装置设备打开、巡检此设备，当camera继续运行远离此装置设备，装置设备关闭后达到移除阀值，移除此装置设备中的所有设备模型，循环往复直至巡检结束。这样，既保证了巡检的功能性，也使运行更加流畅。

2.用克隆代替加载新模型

当要往场景中加载场景中有存在的模型时，用clone（）方法克隆已加载模型代替加载新模型，这样能够减少内存占用率。

3.处理模型文件

　在建模时就应该注意尽量减少不必要的点边面，将能够合并的边和面进行合并操作，将相同的模型材质也进行合并，以减少模型的复杂度，导出模型后再对模型文件进行压缩。

4.模型制作技术

本系统大量采用代码模型来制作所需的设备模型，Three.js有专用的模型库，非常容易使用，在呈现复杂的几何体或场景时非常有优势。

 **二、效果与代码实现：**

2.1、隧道全景

按照等比例，将隧道建模，采用透明透视方式为隧道顶部建模，方便看清内部设备与结构

![](https://img2022.cnblogs.com/blog/800616/202203/800616-20220316103423368-1368864896.gif)

 模型还是采用数据代码形式实现，例如添加标记模型

ModelBussiness.prototype.addMark = function (name,position,scale) {
    var markjson = \[{ "name": name, "objType": "picIdentification", "size": scale, "position": position, "imgurl": "../img/3dImg/qp4.png", "showSortNub": 327, "show": true, "customType1": "", "customType2": "", "animation": null, "dbclickEvents": null, "BindDevId": null, "BindDevName": null, "devInfo": null, "BindMeteId": null, "BindMeteName": null }\];
}

2.2、服务机房

前置设备通过有线（稳定）方式，传输数据到服务机房的中间网关上，网关再传给本地中转平台，平台再上云台数据。

![](https://img2022.cnblogs.com/blog/800616/202203/800616-20220316103444224-1726154417.gif)

 2.3、设备监控

隧道内支持多种设备类型监控，通过参数化方案，载入模型。

  DevTypes: {
        "FXD": "风向袋",
        "QXG": "气象仪",
        "GDSXJ": "固定摄像机",
        "YKSXJ": "遥控摄像机",
        "ZPSXJ": "抓拍摄像机",
        "WBJCY": "微波车辆检测器",
        "MJSQBB": "门架式情报板",
        "XBSQBB": "悬臂式情报板",
        "QYKZQ": "区域控制器",
        "SKBXHD": "四可变信号灯",
        "CDZSD": "车道指示灯",
        "XBGZ": "悬臂杆子",
        "GZ1": "杆子1",
        "GZ2": "杆子2",
        "FJ": "风机",
        "IPGB": "IP广播",
        "JJDH": "紧急电话",
        "KBXHD1": "单个变信号灯",
        "KBXHD2": "二可变信号灯",
        "KBXHD3": "三可变信号灯",
        "DD": "灯带",
        "HZBJQ": "火灾报警",
        "QBB": "情报板",
        "QBB2": "情报板2",
        "XSQBB": "限速情报板",
        "COVI": "covi检测器",
        "QGJCQ": "光强检测器",
        "FSY": "风速仪",
        "JTSJJCQ": "交通事件检测器",
    }

主要参数如下：

  {
            show: true,
            dataId:"f101",//数据id
            type: "FJ",//类型 风机
            name: "fj1",//唯一性
            position: { x: -950, y: 55, z: -70 },//位置
            scale: { x: 0.05, y: 0.05, z: 0.05 },//缩放
            rotation: { x: 0, y: Math.PI/2, z: 0 }//旋转
        }

 ![](https://img2022.cnblogs.com/blog/800616/202203/800616-20220316103459681-1243723832.gif)

设备模型支持动态调整

/\*
type:类型（见TypeConfig.json文件）
name:名称（命名规则）名称+桩号 ，所有特殊符号用下划线替换
position:在三维中的位置，可通过任意添加一个位置，然后调整到合适位置，格式{x:0,y:0,z:0}
scale:模型的缩放，格式{x:1,y:1,z:1} x y z的值大于0
rotation:模型旋转，格式{x:0,y:0,z:0} x y z的值取值范围是0到Math.PI\*2
show:是否显示
dataId:关联的数据id
callBack:添加成功后回调
\*/
ModelBussiness.prototype.addOrUpdataModel \= function (type, name, position, scale, rotation, show, dataId, callBack) {
    var \_this = this;
    $.each(Config.DevModels, function (\_index, \_obj) {
        if (\_obj.type == type && \_obj.name == name) {
            \_obj.position \= position;
            \_obj.scale \= scale;
            \_obj.rotation \= rotation;
            \_obj.show \= show;
            \_obj.dataid \= dataid;
        }
    });
    var obj = WT3DObj.commonFunc.findObject("dev\_" + type + "\_" + name);
    if (obj) {
        if (position) {
            obj.position.x \= position.x;
            obj.position.y \= position.y;
            obj.position.z \= position.z;
        }
        if (scale) {
            obj.scale.x \= scale.x;
            obj.scale.y \= scale.y;
            obj.scale.z \= scale.z;
        }
        if (rotation) {
            obj.rotation.x \= rotation.x;
            obj.rotation.y \= rotation.y;
            obj.rotation.z \= rotation.z;
        }
        obj.visible \= show;

    } else {
        Config.DevModels.push({
            show: show,
            dataId: dataId,//数据id
            type: type,//类型 
            name: name,//唯一性
            position: position,//位置
            scale: scale,//缩放
            rotation: rotation//旋转
        });
        var json = \_this.createModel(type, name, position, scale, rotation, show);
        WT3DObj.commonFunc.loadModelsByJsons(\[json\], { x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }, true, true, function () {
            if (callBack) {
                callBack();
            }
        });
    }
  
}

设备模型快速定位

/\*
type:类型（见TypeConfig.json文件）
name:名称（命名规则）名称+桩号 ，所有特殊符号用下划线替换
callBack:定为完成后回调函数
\*/
ModelBussiness.prototype.LocationObj \= function (type, name, callBack) {
    var obj = WT3DObj.commonFunc.findObject("dev\_" + type + "\_" + name);
    if (obj) {
        CloseDistance(obj, function () {
            if (callBack) {
                callBack();
            }
        });
    }
    return obj;
}

 2.3、通用隧道

 增加通用隧道模型，以用来适配不同场景下，匹配大部分隧道场景。既直观展示，又模拟场景。

 ![](https://img2022.cnblogs.com/blog/800616/202203/800616-20220316103829717-1197407842.gif)

同时提供通用方法，比如通用数据弹窗回调等:

//////////////////////回调方法/////////////////////////////
/\*
单击回调配置
model：模型对象
dataInfo 包含了关联的业务数据 比如数据dataId
\*/
function clickDevCallBack(model, dataInfo) {
    var showHtml = "<div >此处显示自定义内容</div>";
    layer.tips(showHtml, '#MarkMessageHelper', {
        closeBtn: 1,
        shade: 0.1,
        shadeClose: true,
        area: \["300px", "300px"\],
        maxWidth: 1000,
        maxHeight: 350,
        skin: 'louBox',
        time: 0,//是否定时关闭，0表示不关闭
        cancel: function (index, layero) {
        
        },
        success: function () {

        },
        tips: \[1, "rgba(14, 188, 255,1)"\] //还可配置颜色
    });
}
/\*
双击回调配置
model：模型对象
dataInfo 包含了关联的业务数据 比如数据dataId
\*/
function dbClickDevCallBack(model,dataInfo) {
    
    //举例
    var showHtml = "<div >此处显示自定义内容</div>";
    layer.open({
        type: 1,
        title: model.name+"自定义弹窗案例【"+dataInfo.dataId+"】",
        shade: \[0.1\],
        area: \['500px', '500px'\],
        anim: 2,
        content: showHtml, //iframe的url，no代表不显示滚动条
        end: function () { //此处用于演示
        }
    });
}

 **三、桥隧一体**

**3.1、桥梁隧道全景**

此场景包含两座大桥，中间夹着一座隧道，比较经典的桥隧场景

由于场景涉及范围较广，为提升适配机器性能，在大场景下，我们采用大模，涵盖主体建筑。概况监测。

 ![](https://img2022.cnblogs.com/blog/800616/202203/800616-20220316103844569-852581961.gif)

**3.2、单独展示桥梁模型**

双击单个主体后，进入主体细模，详细展示模型与模型上所监控的设备单体。

 ![](https://img2022.cnblogs.com/blog/800616/202203/800616-20220316104229577-571560861.gif)

//双击选中
ModelBussiness.prototype.dbClickSelectCabinet = function (\_obj, \_face) {
    if (!\_obj.visible) {
        return;
    }
   // layer.msg("【双击设备接口】设备名称" + \_obj.name);
    //datainfo表示配置的数据 可以根据datainfo.dataId获取与数据的关联关系
    var datainfo = getInfoByModelName(\_obj.name);
    console.log(datainfo);
    dbClickDevCallBack(\_obj, datainfo);
}

 **3.3、桥梁设备监管**

另一座桥梁细模设备监测。

![](https://img2022.cnblogs.com/blog/800616/202203/800616-20220316104240707-1270770367.gif)

设备模型状态修改

//修改模型状态
/\*
type:类型（见TypeConfig.json文件）
name:名称（命名规则）"dev\_"+类型+"\_"+名称+桩号 ，所有特殊符号用下划线替换
state:字符串  在线:1 离线:0 故障:-1
            风向袋的状态值：1\_度数 度数的取值范围0到Math.PI\*2
            四可变信号灯:10000 第一位表示在线 离线 故障
                                后面四位分别表示每个灯的亮和灭 
\*/
ModelBussiness.prototype.changeDevCtrlState \= function (type,name, state) {
    var \_this = this;
    var modelJson = "";
    var obj = WT3DObj.commonFunc.findObject("dev\_" + type + "\_" + name);
    if (!obj&&obj.name.indexOf("dev\_")!=0) {
        return;
    }
    
    switch (type) {
        case "XSQBB"://可变限速标志 状态：30、40、50、60、80、100、120、异常、故障 130、140、150、160、180、1100、1120 、 0 -1
            state = parseInt(state);
            if (state > 0) {
                if (state > 100) {
                    obj.children\[0\].freshData(state);
                    obj.children\[0\].position.z = -5;
                    obj.children\[0\].matrixAutoUpdate = true;
                } else {
                    obj.children\[0\].freshData(state);
                    obj.children\[0\].position.z = -30;
                    obj.children\[0\].matrixAutoUpdate = true;
                }
            } else {
                obj.children\[0\].freshData("")
            }
            break;
        case "CDZSD"://车道指示灯 正绿背头  正红背绿  正红背红 1 2 3
            {
                if (parseInt(state) == 1) {
                    WT3DObj.commonFunc.setObjSkinImg(obj, 0, "../img/3dImg/go.png");
                    WT3DObj.commonFunc.setObjSkinImg(obj, 1, "../img/3dImg/stop.png");
                } else if (parseInt(state) == 2) {
                    WT3DObj.commonFunc.setObjSkinImg(obj, 0, "../img/3dImg/stop.png");
                    WT3DObj.commonFunc.setObjSkinImg(obj, 1, "../img/3dImg/go.png");
                } else if (parseInt(state) == 3) {
                    WT3DObj.commonFunc.setObjSkinImg(obj, 0, "../img/3dImg/stop.png");
                    WT3DObj.commonFunc.setObjSkinImg(obj, 1, "../img/3dImg/stop.png");
                }
            }
            break;
        case "KBXHD1"://单个变信号灯 红、黄、绿 黑 左 右1 2 3 4 5 6
            { 
                if (parseInt(state) == 1) {
                    WT3DObj.commonFunc.setObjSkinImg(obj, 0, "../img/3dImg/redlight.png");
                } else if (parseInt(state) == 2) {
                    WT3DObj.commonFunc.setObjSkinImg(obj, 0, "../img/3dImg/yellowlight.png");
                } else if (parseInt(state) == 3) {
                    WT3DObj.commonFunc.setObjSkinImg(obj, 0, "../img/3dImg/golight.png");
                } else if (parseInt(state) == 4) {
                    WT3DObj.commonFunc.setObjSkinImg(obj, 0, "../img/3dImg/nolight.png");
                } else if (parseInt(state) ==5) {
                    WT3DObj.commonFunc.setObjSkinImg(obj, 0, "../img/3dImg/left.png");
                } else if (parseInt(state) ==6) {
                    WT3DObj.commonFunc.setObjSkinImg(obj, 0, "../img/3dImg/right.png");
                }
            }
            break;
        case "KBXHD2":
            {
                var stateArray = (state + "").split("");

                if (stateArray\[0\] == "1") {
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[4\], 1, "../img/3dImg/redlight.png");
                } else if (stateArray\[0\] == "2") {
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[4\], 1, "../img/3dImg/yellowlight.png");
                } else if (stateArray\[0\] == "3") {
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[4\], 1, "../img/3dImg/golight.png");
                } else if (stateArray\[0\] == "4"){
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[4\], 1, "../img/3dImg/nolight.png");
                } else if (stateArray\[0\] == "5") {
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[4\], 1, "../img/3dImg/left.png");
                } else if (stateArray\[0\] == "6") {
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[4\], 1, "../img/3dImg/right.png");
                }

                if (stateArray\[1\] == "1") {
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[3\], 1, "../img/3dImg/redlight.png");
                } else if (stateArray\[1\] == "2") {
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[3\], 1, "../img/3dImg/yellowlight.png");
                } else if (stateArray\[1\] == "3") {
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[3\], 1, "../img/3dImg/golight.png");
                } else if (stateArray\[1\] == "4") {
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[3\], 1, "../img/3dImg/nolight.png");
                } else if (stateArray\[1\] == "5") {
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[3\], 1, "../img/3dImg/left.png");
                } else if (stateArray\[1\] == "6") {
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[3\], 1, "../img/3dImg/right.png");
                }
            }
            break;
        case "KBXHD3":
            {
                var stateArray = (state + "").split("");

                if (stateArray\[0\] == "1") {
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[2\], 1, "../img/3dImg/redlight.png");
                } else if (stateArray\[0\] == "2") {
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[2\], 1, "../img/3dImg/yellowlight.png");
                } else if (stateArray\[0\] == "3") {
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[2\], 1, "../img/3dImg/golight.png");
                } else if (stateArray\[0\] == "4"){
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[2\], 1, "../img/3dImg/nolight.png");
                } else if (stateArray\[0\] == "5") {
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[2\], 1, "../img/3dImg/left.png");
                } else if (stateArray\[0\] == "6") {
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[2\], 1, "../img/3dImg/right.png");
                }


                if (stateArray\[1\] == "1") {
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[5\], 1, "../img/3dImg/redlight.png");
                } else if (stateArray\[1\] == "2") {
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[5\], 1, "../img/3dImg/yellowlight.png");
                } else if (stateArray\[1\] == "3") {
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[5\], 1, "../img/3dImg/golight.png");
                } else if (stateArray\[1\] == "4"){
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[5\], 1, "../img/3dImg/nolight.png");
                } else if (stateArray\[1\] == "5") {
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[5\], 1, "../img/3dImg/left.png");
                } else if (stateArray\[1\] == "6") {
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[5\], 1, "../img/3dImg/right.png");
                }
                if (stateArray\[2\] == "1") {
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[4\], 1, "../img/3dImg/redlight.png");
                } else if (stateArray\[2\] == "2") {
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[4\], 1, "../img/3dImg/yellowlight.png");
                } else if (stateArray\[2\] == "3") {
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[4\], 1, "../img/3dImg/golight.png");
                } else if (stateArray\[2\] == "4"){
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[4\], 1, "../img/3dImg/nolight.png");
                } else if (stateArray\[2\] == "5") {
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[4\],1, "../img/3dImg/left.png");
                } else if (stateArray\[2\] == "6") {
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[4\], 1, "../img/3dImg/right.png");
                }
            }
            break;

        case "SKBXHD"://四可变信号灯 在线 离线 故障  4种信号灯单独显示(灭/亮) 1 0 -1 10000(后面四位表示每个信号灯状态)
            {
                var stateArray = (state + "").split("");

                if (stateArray\[0\] == "1") {
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[2\], 1, "../img/3dImg/redlight.png");
                } else if (stateArray\[0\] == "2") {
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[2\], 1, "../img/3dImg/yellowlight.png");
                } else if (stateArray\[0\] == "3") {
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[2\], 1, "../img/3dImg/golight.png");
                } else if (stateArray\[0\] == "4") {
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[2\], 1, "../img/3dImg/nolight.png");
                } else if (stateArray\[0\] == "5") {
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[2\], 1, "../img/3dImg/left.png");
                } else if (stateArray\[0\] == "6") {
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[2\], 1, "../img/3dImg/right.png");
                }

                if (stateArray\[1\] == "1") {
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[0\], 1, "../img/3dImg/redlight.png");
                } else if (stateArray\[1\] == "2") {
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[0\], 1, "../img/3dImg/yellowlight.png");
                } else if (stateArray\[1\] == "3") {
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[0\], 1, "../img/3dImg/golight.png");
                } else if (stateArray\[1\] == "4") {
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[0\], 1, "../img/3dImg/nolight.png");
                } else if (stateArray\[1\] == "5") {
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[0\], 1, "../img/3dImg/left.png");
                } else if (stateArray\[1\] == "6") {
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[0\], 1, "../img/3dImg/right.png");
                }
                if (stateArray\[2\] == "1") {
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[3\], 1, "../img/3dImg/redlight.png");
                } else if (stateArray\[2\] == "2") {
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[3\], 1, "../img/3dImg/yellowlight.png");
                } else if (stateArray\[2\] == "3") {
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[3\], 1, "../img/3dImg/golight.png");
                } else if (stateArray\[2\] == "4") {
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[3\], 1, "../img/3dImg/nolight.png");
                } else if (stateArray\[2\] == "5") {
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[3\], 1, "../img/3dImg/left.png");
                } else if (stateArray\[2\] == "6") {
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[3\], 1, "../img/3dImg/right.png");
                }
                if (stateArray\[3\] == "1") {
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[4\], 1, "../img/3dImg/redlight.png");
                } else if (stateArray\[3\] == "2") {
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[4\], 1, "../img/3dImg/yellowlight.png");
                } else if (stateArray\[3\] == "3") {
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[4\], 1, "../img/3dImg/golight.png");
                } else if (stateArray\[3\] == "4") {
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[4\], 1, "../img/3dImg/nolight.png");
                } else if (stateArray\[3\] == "5") {
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[4\], 1, "../img/3dImg/left.png");
                } else if (stateArray\[3\] == "6") {
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[4\], 1, "../img/3dImg/right.png");
                }
            }
            break;
        case "DD"://照明灯带（1亮、2正常、3暗）
            {
                obj.children\[2\].visible = true;
                if ((state) == 1) {
                    obj.children\[2\].material.opacity = 0.6;
                   // obj.children\[2\]
                } else if ((state) == 2) {
                    obj.children\[2\].material.opacity = 0.3;
                } else if ((state) == 3) {
                    obj.children\[2\].material.opacity = 0.1;
                }
            }
            break;
        case "HZBJQ"://火灾报警 有声音、无声音）
            {
                if ((state) == 1) {
                    obj.children\[1\].visible = true;
                } else if ((state) == 2) {
                    obj.children\[1\].visible = false;
                }
            }
            break;
        case "IPGB"://广播 （有声音 1、无声音 2）
            {
                if ((state) == 1) {
                    obj.children\[0\].visible = true;
                } else if ((state) == 2) {
                    obj.children\[0\].visible = false;
                }
            }
            break;
        case "JJDH"://紧急电话 （有声音 1、无声音 2）
            {
                if ((state) == 1) {
                    obj.children\[1\].visible = true;
                } else if ((state) == 2) {
                    obj.children\[1\].visible = false;
                }
            }
            break;

        case "FJ"://风机 停止、正转、反转 1 2 3
            {
                if (obj.runInterval) {
                    clearInterval(obj.runInterval);
                }
                if ((state) == 1) {
                    obj.children\[0\].rotation.z = 0;
                    obj.children\[1\].rotation.z = 0;
                    obj.children\[0\].matrixAutoUpdate = true;
                    obj.children\[1\].matrixAutoUpdate = true;
                    setTimeout(function () {
                        obj.children\[0\].matrixAutoUpdate = false;
                        obj.children\[1\].matrixAutoUpdate = false;
                    }, 100);
                } else if ((state) == 2) {
                    obj.children\[0\].matrixAutoUpdate = true;
                    obj.children\[1\].matrixAutoUpdate = true;
                    obj.runInterval \= setInterval(function () {
                        obj.children\[0\].rotation.z += 0.5;
                        obj.children\[1\].rotation.z += 0.5;
                    }, 50);
                } else if ((state) ==3) {
                    obj.children\[0\].matrixAutoUpdate = true;
                    obj.children\[1\].matrixAutoUpdate = true;
                    obj.runInterval \= setInterval(function () {
                        obj.children\[0\].rotation.z -= 0.5;
                        obj.children\[1\].rotation.z -= 0.5;
                    }, 50);
                }
              
            }
            break;

        case "FXD"://风向袋 参照实际,三维图上示意处理 1\_度数
            {
                var stateArray = state.split("\_");
                var degree = parseFloat(stateArray\[1\]);//y轴旋转度数
                obj.rotation.y = degree;
            }
            break;
        case "QBB"://情报板 state：文字图片地址
        case "QBB2":
            {
                if (state!="") {
                    WT3DObj.commonFunc.setObjSkinImg(obj.children\[1\], 5, state);
                } 
            }
            break;
       
    }
}

![](https://img2022.cnblogs.com/blog/800616/202203/800616-20220316104256838-1235374579.gif)

 **3.5、隧道分离展示**

![](https://img2022.cnblogs.com/blog/800616/202203/800616-20220316104318618-1796083562.gif)

 **3.6、隧道内设备展示**

 ![](https://img2022.cnblogs.com/blog/800616/202203/800616-20220316104330293-1897806097.gif)

/\*
//显示设备状态
type:   设备类型 见Config.DevTypes
name:   设备名称 
state: 1：停用（灰色）
       2：故障（红色）
       3：正常（自身颜色）
\*/
ModelBussiness.prototype.setDevState \= function (type, name, state) {
    var \_this = this;
    var obj = WT3DObj.commonFunc.findObject("dev\_" + type + "\_" + name);
    if (obj) {
        var box = new THREE.Box3();
        box.setFromObject(obj);
        var positionY = obj.position.y+30;
        if (box&&box.max) {
            positionY \= box.max.y + 18;
        }
        var objStateMarkModelName = "dev\_" + type + "\_" + name + "\_stateMark";
        var objStateMark = WT3DObj.commonFunc.findObject(objStateMarkModelName);
        if (objStateMark) {
            WT3DObj.destoryObj(objStateMarkModelName);
        }
        if (state == 1 || state == 2) {
            var mark = {
                "name": objStateMarkModelName,
                "objType": "picIdentification",
                "size": { "x": 30, "y": 30 },
                "position": { "x": obj.position.x, "y": positionY, "z": obj.position.z },
                "imgurl": "../img/3dImg/" + (state == 1 ? "qp3.png" : "qp4.png"),
                "showSortNub": 1
            };
            var temObj = WT3DObj.createObjByJson(mark);
            temObj.material.depthTest \= false;
            temObj.visible \= obj.visible;
            WT3DObj.addObject(temObj);
        }
        WT3DObj.commonFunc.flashObjs(\[obj\], obj.name \+ "\_flashanimation\_", 0x000000, -1, 200, 0);
        if (state == 1) {
            setTimeout(function () {
                WT3DObj.commonFunc.flashObjs(\[obj\], obj.name \+ "\_flashanimation\_", 0x333333, 0, 200, 0);
                \_this.flashObjsNames.push(obj.name);
            }, 500);
        } else if (state == 2) {
            setTimeout(function () {
                WT3DObj.commonFunc.flashObjs(\[obj\], obj.name \+ "\_flashanimation\_", 0xff0000, 0, 200, 0);
                \_this.flashObjsNames.push(obj.name);
            }, 500);
        } else if (state==3) {
            var \_index = \_this.flashObjsNames.indexOf(obj.name);
            if (\_index >= 0) {
                \_this.flashObjsNames.splice(\_index, 1);
                WT3DObj.commonFunc.flashObjs(\[obj\], obj.name \+ "\_flashanimation\_", 0x000000, -1, 200, 0);
            }
        }

    }
}

技术交流 1203193731@qq.com

交流微信：

　　　　![](https://img2018.cnblogs.com/blog/800616/201903/800616-20190306111130020-1677299606.png)

如果你有什么要交流的心得 可邮件我

其它相关文章：

[如何用three.js实现数字孪生、3D工厂、3D工业园区、智慧制造、智慧工业、智慧工厂-第十课](https://www.cnblogs.com/yeyunfei/p/15676559.html)

[使用webgl(three.js)创建3D机房，3D机房微模块详细介绍(升级版二)](https://www.cnblogs.com/yeyunfei/p/10484241.html)

[如何用webgl(three.js)搭建一个3D库房-第一课](https://www.cnblogs.com/yeyunfei/p/7899613.html)

[如何用webgl(three.js)搭建一个3D库房,3D密集架,3D档案室,-第二课](https://www.cnblogs.com/yeyunfei/p/8811228.html)

[使用webgl(three.js)搭建一个3D建筑，3D消防模拟——第三课](https://www.cnblogs.com/yeyunfei/p/8910482.html)

[使用webgl(three.js)搭建一个3D智慧园区、3D建筑，3D消防模拟，web版3D,bim管理系统——第四课](https://www.cnblogs.com/yeyunfei/p/9629405.html)

[如何用webgl(three.js)搭建不规则建筑模型，客流量热力图模拟](https://www.cnblogs.com/yeyunfei/p/10473050.html)

 [使用webgl(three.js)搭建一个3D智慧园区、3D建筑，3D消防模拟，web版3D,bim管理系统——第四课（炫酷版一）](https://www.cnblogs.com/yeyunfei/p/11151890.html)

使用webgl(three.js)搭建3D智慧园区、3D大屏，3D楼宇，智慧灯杆三维展示，3D灯杆，web版3D,bim管理系统——第六课
=====================================================================

[如何用webgl(three.js)搭建处理3D园区、3D楼层、3D机房管线问题（机房升级版）-第九课（一）](https://www.cnblogs.com/yeyunfei/p/15578120.html)