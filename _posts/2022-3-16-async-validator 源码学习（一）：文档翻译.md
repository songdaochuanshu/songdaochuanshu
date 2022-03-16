---
layout: post
title: "async-validator 源码学习（一）：文档翻译"
date: "2022-03-16T09:17:17.643Z"
---
async-validator 源码学习（一）：文档翻译
============================

async-validator 是一个表单异步校验库，阿里旗下的 Ant-design 和 Element 组件库中的表单验证使用的都是 async-validator ，目前版本已更新到 4.0.7 ，下载量达到 1,067,202次，不仅支持 js ，同时也可支持 typeScript 。是一个功能超级强大的库，有兴趣的一起来了解了解。

async-validator 官网地址：  
https://www.npmjs.com/package/async-validator

* * *

async-validator 美中不足的是没有中文官方文档，看着英文的好费劲！网上百度了一堆都是低版本的翻译，现在升级到 4.0.7 了，有些性能废弃了，会出现一些不起作用的属性，所以今天帮大家也帮自己翻译一下，便于学习。

一、从入门到上手
--------

安装命令

npm i async-validator
// 或
npm install async-validator

使用方法：

// 引入异步
import Schema from 'async-validator'
// 定义规则描述
const des = {
 name: {
  type: "string",
  required: true,
  message: "内容不能为空"
 }
}
// 创建校验器
const validator = new Schema(des)
// 添加校验
validator.validate({ name: "值" }, (errors, field) => {
 if(errors){
  return new Error(\`校验失败\`)
 }
 // 校验失败
})

在 vue3 引入 Ant-design 组件中使用 async-validator ，使用实例：

<template>
 <div>
  <a-form style="width: 80%; margin: 0 auto;" :model="formData">
   <div>
     用户名：
     <a-input type="text" @blur="check" v-model:value="formData.username"></a-input>
   </div>
   <div>
    密码：
    <a-input type="passsword" v-model:value="formData.password"></a-input>
   </div>
   <a-button type="primary">提交</a-button>
  </a-form>
 </div>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'
import Schema from 'async-validator'
interface IFormData {
 username: string
 password: string
}
export default defineComponent({
 setup() {
  const formData \= reactive<IFormData>({
   username: '',
   password: '',
 })
 const des \= {
  username: \[
   {
    type: 'string',
    required: true,
    validator(rule, value) {
     return value != ''
    }
    message: '用户名不能为空',
   },
   {
     type: 'string',
     min: 6,
     max: 10,
     validator(rule, value) {
       return rule.min < value.length && value.length < rule.max
      },
      message: '长度 6-8',
     },
    \],
  }
  const validator \= new Schema(des)
  function check() {
   // 开始校验
   validator.validate({ username: formData.username }, (errors, fields) => {
    if (errors) {
     return new Error(\`不符合规则\`)
    }
    console.log('校验成功')
   }).then((res) \=> {
    console.log('res--->', res)
    })
  }
  return {
   formData,
   changeName,
  }
 }
})
</script>

Promise 使用方法

// 引入异步
import Schema from 'async-validator'
// 定义规则描述
const des = {
 name: {
  type: "string",
  required: true,
  message: "内容不能为空",
  asyncValidator: (rule,value) \=> {
   // @rule 获取到是此处限制规则
   // @value 获取到属性 name 的值
   return new Promise((resolve,reject) => {
    setTimeout(()\=>{ // 使用定时器模拟异步操作
    if(value != ""){
     resolve() //成功
    }else{
     reject("校验失败")
    }
    },2000)
   })
  }
 }
}
// 创建校验器
const validator = new Schema(des)
// 添加校验
validator.validate({ name: "值" }, (errors, field) => {
}).then(() \=> {
 console.log('校验成功')
}).catch(({ errors, fields } => {
  console.log('校验失败', errors)
}))

使用方法挺简单的，可以根据上述的实例进行简单修改就可以实现，也可以自己动手试试！

二、API 学习
--------

### **2.1、validate**

validate：添加校验的方法，使用语法：

validator.validate( source , \[options\], callback ): Promise

*   source 是需要校验的属性和值，必传参数。
*   options 是描述处理验证对象的选项。
*   callback 校验完成之后的回调函数。

该方法返回的是 Promise 对象，所以有：

*   then() 成功回调
*   catch(({ errors, fields })=>{}) 失败回调

Options 选项参数有：

*   suppressWarning：是一个 Boolean 值，是否抑制无效的内部警告。
*   first：是一个 Boolean 值，当第一个校验失败时，是否继续向后校验，如果为真，只返回第一个校验失败信息。
*   firstFields：是一个 Boolean 值或 字符串数组，当指定的第一个校验规则生成错误时调用回调，不再处理同一字段的验证规则，true 表示所有字段。

### 2.2、Rules

rules ：表示校验规则，通常有两种写法：

第一种：经常写成一个对象数组，便于给单个字段添加多个验证规则。使用如下：

const descriptor = {
 name:\[
  {
    type: 'string',
    required: true,
    validator(rule, value) {
     return value != ''
    }
    message: '用户名不能为空',
   },
   {
     type: 'string',
     min: 3,
     max: 8,
     validator(rule, value) {
      return rule.min < value.length && value.length < rule.max
     },
    message: '用户名长度 3-8',
   },
 \]
}

第二种：也可以定义成执行验证的函数，使用语法：

function (rule, value, callback, source, options)

*   rule 是源描述符中与正在验证的字段名相对应的验证规则，始终会为其分配一个字段属性，该属性包含要验证的字段名称
*   value 是校验属性的值。
*   callback 调用完成后调用的回调函数。
*   source 校验的源对象。
*   options 其他选项。

传递给 validate 或 asyncValidate 的选项将传递给验证函数，以便您可以在验证函数中引用瞬态数据（例如模型引用）。但是，保留了一些选项名称；如果使用选项对象的这些属性，它们将被覆盖。保留属性包括消息、异常和错误。

### 2.3、Type

type ：指示要校验的属性类型，它的类型值有：

*   string - 默认值，属性类型必须是字符串。
*   number - 必须是数字。
*   boolean - 是布尔值。
*   regexp - 是一个 RegExp 实例或 new RegExp 时不生成异常字符串
*   method - 必须是一个函数。
*   integer - 必须是数字和整数类型。
*   float - 必须是数字和浮点数。
*   array - 是数组，使用 Array.isArray 验证。
*   object - 是一个对象而且不是数组对象。
*   enum - 值必须存在于枚举中。
*   date - 值必须是由日期确定的有效值。
*   url - 是一个 url 类型。
*   hex - 十六进制。
*   email - 必须是 email 类型。
*   any - 可以为任意类型。

### 2.4、Required

required 属性代表源对象上必须存在该字段。

### 2.5、Pattern

rule 属性指示必须匹配正则表达式。

### 2.6、Range

通过使用 min(最小) 和 max(最大) 属性定义一个范围，对应字符串和数组会与 length 比较，对于数字会直接拿值比较。

### 2.7、Length

会使用 len 属性定义长度，对应字符串和数组会与 length 比较，数字会直接拿值进行比较。如果 min、max 和 len 同时出现时，len 优先使用。

### 2.9、Enumerable

enumerable 可枚举值。对于可以枚举出所有情况的类型，可使用枚举校验，如：

var descriptor = {
  role: {type: "enum", enum: \['admin', 'user', 'guest'\]}
}

### 2.10、Whitespace

通常将仅包含空格的必填字段视为错误。要为仅由空格组成的字符串添加附加测试，请将whitespace属性添加到值为true. 规则必须是string类型。

您可能希望清理用户输入而不是测试空格，请参阅 transform 以获取允许您去除空格的示例。

个人使用 whitespace 之后，感觉没有任何影响，官方讲的也很简单，未找到具体实例，如果有会用的，还请不吝赐教。

### 2.11、Deep Rules

如果需要校验的数据类型是对象，且需要校验对象中的每一个属性，此时需要通过嵌套规则分配给 rules 的 fields 属性来校验属于 object 或 array 类型的校验规则。

对 object 的深度监听：

const rules = {
 address: {
 type: 'object',
 required: true,
 fields: {
  street: { type: 'string', required: true },
  city: { type: 'string', required: true }
  }
 }
}

注意：如果在父规则上没有指定 required 属性，此时没有在源对象上声明的字段也是有效的，但是深度监听会失效。

对 array 的深度监听：

const descriptor = {
  roles: {
    type: 'array',
    required: true,
    len: 3,
    fields: {
      0: { type: 'string', required: true },
      1: { type: 'string', required: true },
      2: { type: 'string', required: true },
    },
  },
};

提供 { roles: \['admin', 'user'\] } 这样的 source 对象，将创建两个错误。一个用于数组长度不匹配，另一个用于缺少索引 2 处所需的数组。

### 2.12、defaultField

defaultField 属性用来校验内部的所有值，可以用于 array 或 object 类型。

const descriptor = {
 urls: {
  type: 'array',
  required: true,
  defaultField: { type: 'url' },
 }
};

注意，若将 defaultField 扩展为fields，请参见 deep rules。

### 2.13、transform

有时校验之前需要进行某种处理或者转化，因此在校验规则中添加 transform 函数，在校验之前对属性进行某种转换，并重新分配给源对象以更改属性的值。

const rules = {
 username: {
  type: 'string',
   required: true,
   pattern: /^\[a-z\]+$/,
   transform(value) {
    return value.trim();
   },
 },
}
const validator \= new Schema(rules)
const source \= { username: ' user  ' };
validator.validate(source).then(() \=> assert.equal(source.name, 'user'));

transform 函数内的 value.trim() 会把传入的值前后空格去掉，所以校验成功，如果没有 transfrom 函数，校验将会失败。

### 2.14、message

根据应用的需求，可能需要 i18n 支持，或者您可能更喜欢不同的验证错误消息。

最简单的方法给 rule 分配一条 message 属性：

const rules = {
 username: {
  type: 'string',
  required: true,
  message:"用户名不能为空" 
 }
}

message 可以是任意类型，如 jsx 格式：

const rules = {
 username: {
  type: 'string',
  required: true,
  message:"<b>用户名不能为空</b>" 
 },
}

message 也可以是一个函数，比如 vue-i18n ：

{ name: { type: 'string', required: true, message: () => this.$t( '请填写名称' ) } }

不同语言可能需要相同的模式验证规则，在这种情况下，为每种语言复制模式规则是没有意义的。

在这种情况下，您可以为该语言提供自己的消息，并将其分配给 shema：

import Schema from 'async-validator';
const cn \= {
  required: '%s 必填',
};
const descriptor \= { name: { type: 'string', required: true } };
const validator \= new Schema(descriptor);
// deep merge with defaultMessages
validator.messages(cn);

如果要定义自己的验证函数，最好将消息字符串指定给messages对象，然后通过选项访问消息。验证函数中的messages属性。

2.15、asyncValidator
-------------------

为指定字段自定义异步校验函数：

const rules = {
 username: \[
  {
   type: 'string',
   required: true,
   whitespace: true,
   transform(value) {
   return value.trim()
   },
   message: '用户名不能为空格',
   asyncValidator: (rule, value) \=> {
   return new Promise((resolve, reject) => {
    setTimeout(() \=> { //模拟异步操作
    if (value != '') {
     resolve()
    } else {
      reject('error')
    }
   }, 2000)
  })
 },
 \],
}
const validator \= new Schema(rules)
const source \= { username: ' user  ' };
validator.validate(source).then((res) \=> {
 console.log('res', res)
})
.catch(({ errors, fields }) => {
 console.log('err', errors)
 console.log('fields', fields)
})

### 2.16、validator

为指定字段自定义同步校验函数：

const rules = {
 username: \[
  {
   type: 'string',
   required: true,
   validator(rule, value) {
    return value != ''
    },
    message: '用户名不能为空',
   },
   {
    type: 'string',
    min: 6,
    max: 10,
    validator(rule, value) {
      return rule.min < value.length && value.length < rule.max
     },
     message: '长度 6-8',
   },
 \],
}

常见问题
----

如何取消 warning

import Schema from 'async-validator';
Schema.warning \= function () {};

如果检查布尔值true
-----------

使用 enum 类型 并传布尔值 true 参数作为选项。

{
  type: 'enum',
  enum: \[true\],
  message: '',
}

测试用例
----

    npm test

测试覆盖率
-----

    npm run coverage