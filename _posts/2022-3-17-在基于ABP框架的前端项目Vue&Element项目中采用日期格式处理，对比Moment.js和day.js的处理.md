---
layout: post
title: "在基于ABP框架的前端项目Vue&Element项目中采用日期格式处理，对比Moment.js和day.js的处理"
date: "2022-03-17T02:40:59.125Z"
---
在基于ABP框架的前端项目Vue&Element项目中采用日期格式处理，对比Moment.js和day.js的处理
---------------------------------------------------------

Day.js 是一个轻量的处理时间和日期的 JavaScript 库，和 Moment.js 的 API 设计保持完全一样. 如果您曾经用过 Moment.js, 那么您已经知道如何使用 Day.js。简单地说，只要你会Moment.js，那么你就会Day.js! 但是我们知道的，Moment.js 的大小是200多KB,而Day.js的大小却是2 KB，瘦身很多但却几乎拥有同样强大的 API。

Day.js 是一个轻量的处理时间和日期的 JavaScript 库，和 Moment.js 的 API 设计保持完全一样. 如果您曾经用过 Moment.js, 那么您已经知道如何使用 Day.js。简单地说，只要你会Moment.js，那么你就会Day.js!

但是我们知道的，Moment.js 的大小是200多KB,而Day.js的大小却是2 KB，瘦身很多但却几乎拥有同样强大的 API。

现在框架基本上都是多端应用的了，所以在ABP框架中整合Winform管理端、Vue&element的BS前端，以及公司动态网站用于发布产品和网站信息等都是常见的应用，有时候，我们还需要根据功能的需要，增加一些小程序的支持，这些对于Web API后端来说，都是很容易接入的应用处理。

![](https://img2020.cnblogs.com/blog/8867/202111/8867-20211111115835313-670379105.png)

而基于Vue + Element 的前端界面，前端功能模块包括用户管理、组织机构管理、角色管理、菜单管理、功能管理及权限分配，日志管理、字典管理、产品管理等管理功能，可实现用户的功能及数据权限进行控制管理。

![](https://img2020.cnblogs.com/blog/8867/202108/8867-20210816102141271-868784741.png)

公司动态门户网站，有时候用于我们发布网站信息和产品信息的一个门户网站，采用了Bootstrap-Vue界面组件，由于大多数门户网站都是基于Bootstrap栅格系统的，因此基于最新Bootstrap-Vue界面组件也就是最佳选择的了，而且可以重用很多Bootstrap的网站模板案例。这样也同时保持了前端模块同时也是基于Vue的，摒弃了以前基于JQuery的繁琐操作DOM处理。

![](https://img2020.cnblogs.com/blog/8867/202111/8867-20211111120812804-1739671729.png)

由于现在微信小程序的广泛应用，有时候我们针对一些业务模块功能，可以根据需要推出一些小程序应用场景，这些对接我们的统一授权系统，以及统一的WebAPI调用机制即可满足。

![](https://img2020.cnblogs.com/blog/8867/202111/8867-20211111121219020-724576388.jpg)

而这些基于Vue的前端，采用类库对日期格式化，或者进行转换的需求场景很多，因此我们我们需要借助JS类库进行日期的处理，比较好的推荐使用day.js的处理。

### 1、day.js的安装和使用

安装day.js

npm install dayjs -s

然后在项目代码中引入即可：

import dayjs from "dayjs"; // 导入日期js
或者
var dayjs = require('dayjs')

import \* as dayjs from 'dayjs'
import \* as isLeapYear from 'dayjs/plugin/isLeapYear' // 导入插件
import 'dayjs/locale/zh-cn' // 导入本地化语言
dayjs.extend(isLeapYear) // 使用插件
dayjs.locale('zh-cn') // 使用本地化语言

详细了解可以参考地址：[https://dayjs.fenxianglu.cn/](https://dayjs.fenxianglu.cn/) 或者 [https://dayjs.gitee.io/zh-CN/](https://dayjs.gitee.io/zh-CN/) 或者 [https://github.com/iamkun/dayjs](https://github.com/iamkun/dayjs)

Day.js 支持几十个国家语言，但除非手动加载，多国语言默认是不会被打包到工程里。但你可以随意在各个语言之间自由切换：

dayjs('2018-05-05').locale('zh-cn').format() // 在这个实例上使用简体中文

直接调用 `dayjs()` 将返回一个包含当前日期和时间的 Day.js 对象。

var now = dayjs()

可以对调用dayjs对格式进行处理或者转换。

dayjs("12-25-1995", "MM-DD-YYYY")
dayjs('2018 三月 15', 'YYYY MMMM DD', 'zh-cn')

dayjs('1970-00-00', 'YYYY-MM-DD').isValid() // true
dayjs('1970-00-00', 'YYYY-MM-DD', true).isValid() // false
dayjs('1970-00-00', 'YYYY-MM-DD', 'es', true).isValid() // false

默认情况下，Day.js 只包含核心的代码，并没有安装任何插件.

您可以加载多个插件来满足您的需求，例如官方提供的插件就有：

*   AdvancedFormat 扩展了 dayjs().format API 以支持更多模版
*   RelativeTime 增加了 .from .to .fromNow .toNow 4个 API 来展示相对的时间 (e.g. 3 小时以前).
*   IsLeapYear 增加了 .isLeapYear API 返回一个 boolean 来展示一个 Dayjs's 的年份是不是闰年.
*   WeekOfYear 增加了 .week() API 返回一个 number 来表示 Dayjs 的日期是年中第几周.
*   IsSameOrAfter 增加了 .isSameOrAfter() API 返回一个 boolean 来展示一个时间是否和一个时间相同或在一个时间之后.
*   IsSameOrBefore 增加了 .isSameOrBefore() API 返回一个 boolean 来展示一个时间是否和一个时间相同或在一个时间之前.

Day.js 支持像这样的链式调用：

dayjs().add(7, 'day')
dayjs('2019-01-25').add(1, 'day').subtract(1, 'year').year(2009).toString()

Day.js 对象还有很多查询的方法。

Is Before表示 Day.js 对象是否在另一个提供的日期时间之前。

dayjs().isBefore(dayjs('2011-01-01')) // 默认毫秒

dayjs().isBefore('2011-01-01', 'year')

Is Same 检查一个 Dayjs 对象是否和另一个 Dayjs 对象时间相同。

Is After 表示 Day.js 对象是否在另一个提供的日期时间之后。

还有其他查询时间区间的函数，如下所示。 

![](https://img2022.cnblogs.com/blog/8867/202203/8867-20220314151557485-1535993784.png)

如下面一个应用代码函数:

    /\*\*
     \* 当前日期gantt状态
     \* row: object 当前行信息
     \* date: string 当前格子日期
     \* unit: string 时间单位，以天、月、年计算
     \*/
    dayGanttType(row, date, unit \= "days") {
      let start\_date \= row.startTime;
      let end\_date \= row.endTime;
      let between \= dayjs(date).isBetween(start\_date, end\_date, unit);
      if (between) {
        return "item-on";
      }
      let start \= dayjs(start\_date).isSame(date, unit);
      let end \= dayjs(end\_date).isSame(date, unit);
      if (start && end) {
        return "item-on item-full";
      }
      if (start) {
        return "item-on item-start";
      }
      if (end) {
        return "item-on item-end";
      }
    },

###  2、Moment.js的安装和使用

Moment.js是一个轻量级的JavaScript时间库，它方便了日常开发中对时间的操作，提高了开发效率。 moment.js作为日期处理工具，虽然它和day.js对比显得有点笨重，不过依旧很多项目在广泛的使用者。

npm的安装如下处理。

npm install moment --save

实例代码

var now = moment(); //取当前时间
now.format('YYYY-MM-DD'); //格式化输出
var day = moment("9/12/2010 19:05:25", "MM/DD/YYYY HH🇲🇲ss"); //字符串转换成时间格式

详细的官方提供案例如下所示。

日期格式化

moment().format('MMMM Do YYYY, h:mm:ss a'); // 三月 14日 2022, 3:23:46 下午
moment().format('dddd');                    // 星期一
moment().format("MMM Do YY");               // 3月 14日 22
moment().format('YYYY \[escaped\] YYYY');     // 2022 escaped 2022
moment().format();                          // 2022-03-14T15:23:46+08:00

相对时间

moment("20111031", "YYYYMMDD").fromNow(); // 10 年前
moment("20120620", "YYYYMMDD").fromNow(); // 10 年前
moment().startOf('day').fromNow();        // 15 小时前
moment().endOf('day').fromNow();          // 9 小时内
moment().startOf('hour').fromNow();       // 24 分钟前

日历时间

moment().subtract(10, 'days').calendar(); // 2022/03/04
moment().subtract(6, 'days').calendar();  // 上星期二15:23
moment().subtract(3, 'days').calendar();  // 上星期五15:23
moment().subtract(1, 'days').calendar();  // 昨天15:23
moment().calendar();                      // 今天15:23
moment().add(1, 'days').calendar();       // 明天15:23
moment().add(3, 'days').calendar();       // 下星期四15:23
moment().add(10, 'days').calendar();      // 2022/03/24

多语言支持

moment.locale();         // zh-cn
moment().format('LT');   // 15:23
moment().format('LTS');  // 15:23:46
moment().format('L');    // 2022/03/14
moment().format('l');    // 2022/3/14
moment().format('LL');   // 2022年3月14日
moment().format('ll');   // 2022年3月14日
moment().format('LLL');  // 2022年3月14日下午3点23分
moment().format('lll');  // 2022年3月14日 15:23
moment().format('LLLL'); // 2022年3月14日星期一下午3点23分
moment().format('llll'); // 2022年3月14日星期一 15:23

虽然moment 的功能强大但是体积也最大，moment.min.js 的体积为51K，dayjs.min.js 体积为7K，dayjs 和 moment 的接口几乎完全一致，相互切换的学习成本极低，如果新项目使用，可以优先考虑dayjs。dayjs的API和moment几乎一模一样，所以如果想要替换到现有的momentjs代码，直接替换为dayjs即可，调用语句绝大部分情况下可以一字不改。

![](http://www.cnblogs.com/Images/OutliningIndicators/None.gif)主要研究技术：代码生成工具、会员管理系统、客户关系管理软件、病人资料管理软件、Visio二次开发、酒店管理系统、仓库管理系统等共享软件开发  
专注于[Winform开发框架/混合式开发框架](http://www.iqidi.com/Framework/index.html)、[Web开发框架](http://www.iqidi.com/Framework/WebIntroduce.htm)、[Bootstrap开发框架](http://www.iqidi.com/Framework/BootstrapIndex.html)、[微信门户开发框架的研究及应用](http://www.iqidi.com/Framework/WeixinIndex.htm)。  
  转载请注明出处：  
![](http://www.cnblogs.com/Images/OutliningIndicators/None.gif)撰写人：伍华聪  [http://www.iqidi.com](http://www.iqidi.com/)     

posted on 2022-03-17 09:29  [伍华聪](https://www.cnblogs.com/wuhuacong/)  阅读(85)  评论(0)  [编辑](https://i.cnblogs.com/EditPosts.aspx?postid=16004307)  [收藏](javascript:void(0))  [举报](javascript:void(0))