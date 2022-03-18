---
layout: post
title: "前端（react）上传到阿里云OSS存储 实例"
date: "2022-03-18T05:16:09.804Z"
---
前端（react）上传到阿里云OSS存储 实例
=======================

**需求背景**
--------

由于现有的后台管理系统，上传的视频越来越大，加上上传视频较慢，后端小哥提出直接从前端上传视频或者其他文件到阿里云OSS存储。

*   **阿里云OSS**

[阿里云OSS文档介绍](https://help.aliyun.com/document_detail/111265.html)，这里不做过多赘述

#### **安装**

原本在最开始的时候，是使用node版本的SDK，最开始使用的\[nodejs版本\]

代码如下

    async function put() {
          try {
            let result = await client.put('qq.mp4', fileObj);
            console.log(result);
          } catch (err) {
            console.log(keyObject.AccessKeyId);
            console.log(keyObject.AccessKeySecret);
            console.log(keyObject.SecurityToken);
    
            console.log(err);
          }
        }
        put();
    

开始上传图片的时候还没有翻车，但是上传超过30多M的时候，就翻车了，在阿里云OSS后台查看文件大小为0KB

本来是想用fs模块来操作文件的，但是发现fs在浏览器端，没法儿使用所以就放弃了nodejs版本的SDK

**browser版本**
-------------

后面仔细查阅文档， 发现browser版本SDK有一个片段上传的文档，于是就采用了\[browser\]版本。

使用 browser版本的SDK支持片段上传，同时可以通过片段上传返回回来的进度，制作进度条提示，方便操作业务逻辑

    let ossConfig = {
          region: 'oss-cn-hangzhou',
          //云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，部署在服务端使用RAM子账号或STS，部署在客户端使用STS。
          accessKeyId: keyObject.AccessKeyId,
          accessKeySecret: keyObject.AccessKeySecret,
          stsToken: keyObject.SecurityToken,
          bucket: 'wesmart-app'
        }
    
    let tempCheckpoint;
    
        // 定义上传方法。
        async function multipartUpload() {
          try {
            // object-key可以自定义为文件名（例如file.txt）或目录（例如abc/test/file.txt）的形式，实现将文件上传至当前Bucket或Bucket下的指定目录。
            let result = await client.multipartUpload('02', fileObj, {
              progress: function (p, checkpoint) {
                // 断点记录点。浏览器重启后无法直接继续上传，您需要手动触发上传操作。
                tempCheckpoint = checkpoint;
                console.log(p);
                console.log(checkpoint);
              },
              mime: 'video/mp4'
            })
          } catch (e) {
            console.log(e);
          }
        }
    

*   **client.multipartUpload方法**

1.  第一个参数为自定义的上传文件的名称，建议使用时间戳进行后缀命名，保证文件的唯一性，不会被覆盖
    
2.  第二个参数为文件 回调函数progress，可以查看上传的进度以及文件的相关信息
    

### **注意事项**

上面需要的对象字段可以通过阿里云后台OSS进行查看，在开发的过程中，个人建议通过请求后端返回的相关key值进行操作

在上传代码的时候，使用的put请求，而且刚开始会报错跨域的问题，需要在阿里云OSS进行配置允许请求

    Exresponse Header设置为etag
    

### **源码**

    import React, { useState, useEffect } from 'react';
    import axios from "axios";
    const OSS = require('ali-oss');
    class Example extends React.Component {
      state = {
        count: 0,
        keyObject: {},
        upfile: "",
      }
      componentDidMount() {
        this.getData();
      }
      getData() {
        let that = this;
        axios.get('获取keyId的接口地址')
          .then(function (response) {
            console.log(response);
            let { status, data } = response;
            if (status == 200) {
              that.setState({
                keyObject: data
              });
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    
      handleUpload() {
        let { keyObject, upfile } = this.state;
        var fileObj = document.getElementById("file").files[0];
        console.log(fileObj);
        console.log(keyObject);
        let ossConfig = {
          region: 'oss-cn-hangzhou',
          //云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，部署在服务端使用RAM子账号或STS，部署在客户端使用STS。
          accessKeyId: keyObject.AccessKeyId,
          accessKeySecret: keyObject.AccessKeySecret,
          stsToken: keyObject.SecurityToken,
          bucket: 'wesmart-app'
        }
        let client = new OSS({
          region: 'oss-cn-hangzhou',
          //云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，部署在服务端使用RAM子账号或STS，部署在客户端使用STS。
          accessKeyId: keyObject.AccessKeyId,
          accessKeySecret: keyObject.AccessKeySecret,
          stsToken: keyObject.SecurityToken,
          bucket: 'wesmart-app'
        });
    
        // async function put() {
        //   try {
        //     let result = await client.put('qq.mp4', fileObj);
        //     console.log(result);
        //   } catch (err) {
        //     console.log(keyObject.AccessKeyId);
        //     console.log(keyObject.AccessKeySecret);
        //     console.log(keyObject.SecurityToken);
    
        //     console.log(err);
        //   }
        // }
    
        // put();
    
    
        let tempCheckpoint;
    
        // 定义上传方法。
        async function multipartUpload() {
          try {
            // object-key可以自定义为文件名（例如file.txt）或目录（例如abc/test/file.txt）的形式，实现将文件上传至当前Bucket或Bucket下的指定目录。
            let result = await client.multipartUpload('02', fileObj, {
              progress: function (p, checkpoint) {
                // 断点记录点。浏览器重启后无法直接继续上传，您需要手动触发上传操作。
                tempCheckpoint = checkpoint;
                console.log(p);
                console.log(checkpoint);
              },
              mime: 'video/mp4'
            })
          } catch (e) {
            console.log(e);
          }
        }
    
        // 开始分片上传。
        multipartUpload();
    
        // 暂停分片上传。
        client.cancel();
    
        // 恢复上传。
        let resumeclient = new OSS(ossConfig);
        async function resumeUpload() {
          try {
            let result = await resumeclient.multipartUpload('02', fileObj, {
              progress: function (p, checkpoint) {
                tempCheckpoint = checkpoint;
                console.log(p);
                console.log(checkpoint);
              },
              checkpoint: tempCheckpoint,
              mime: 'video/mp4'
            })
          } catch (e) {
            console.log(e);
          }
        }
        resumeUpload();
      }
    
      handleChange(e) {
        e.persist();
        this.setState({ upfile: e.target.value });
      }
    
      render() {
        const { upfile } = this.state;
        return (
          <div>
            <script type="text/javascript" src="http://gosspublic.alicdn.com/aliyun-oss-sdk-x.x.x.min.js"></script>
            <p><input id="file" type="file" onChange={this.handleChange.bind(this)} value={upfile} /></p>
            <button onClick={this.handleUpload.bind(this)}>
              上传
            </button>
          </div>
        )
      }
    
    }
    
    export default Example;
    

文章个人博客地址：[前端（react）上传到阿里云OSS存储 实例](http://lewyon.xyz/reactOSS.html)