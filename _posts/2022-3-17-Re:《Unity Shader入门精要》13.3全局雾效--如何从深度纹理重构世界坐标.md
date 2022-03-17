---
layout: post
title: "Re:《Unity Shader入门精要》13.3全局雾效--如何从深度纹理重构世界坐标"
date: "2022-03-17T23:17:41.387Z"
---
Re:《Unity Shader入门精要》13.3全局雾效--如何从深度纹理重构世界坐标
============================================

如何从深度纹理重构世界坐标
-------------

游戏特效，后处理是必不可少的，而后处理经常需要我们得到当前画面的像素对应世界空间的所有信息。

### 思路

1.  通过深度纹理取得NDC坐标，然后再通过NDC坐标还原成世界空间坐标

    //csharp脚本部分
    Matrix4x4 matrix = camera.projectionMatrix * camera * worldToCameraMatrix;
    Matrix4x4 InverseMatrix = matrix.inverse;
    
    //shader部分
    float d = SAMPLE_DEPTH_TEXTURE(_CameraDepthTexture, i.uv_depth);
    float4 H = float4(i.uv.x * 2 - 1, i.uv.y * 2 - 1, d * 2 - 1, 1);
    float D  = mul(InverseMatrix, H);
    float worldPos = D/D.w
    

计算量比较大，一般用下面的方法。  
2\. 通过得到相机的坐标以及在世界空间下像素和相机的偏移量,通过两者相加得到像素的世界坐标。这里偏移量通过**顶点的线性深度**乘以**顶点着色器输出并被插值后所得的相机指向像素的射线**来得到。

    float4 worldPos = _WorldSpaceCameraPos + linearDepth * interpolatedRay;
    

接下来来介绍这种办法计算的过程。  
我们很容易**计算出相机到近平面四个顶点的向量方向以及世界空间下的长度**，只需要得到相机记录的fov，aspect等信息  
![在这里插入图片描述](https://img-blog.csdnimg.cn/df91cc1a3281435fb6c044ef4fdcc025.png)  
![在这里插入图片描述](https://img-blog.csdnimg.cn/7790d552eabd48e3be0e5107a860d8c2.png)  
我们要得到的是像素的世界坐标。  
这里有个很重要的点，**相机能看到这个像素，必然说明原本的世界坐标的点和在近平面的投影点（像素位置）处于相机相机指向像素的射线的方向上**。也就是下面13.7图。  
![在这里插入图片描述](https://img-blog.csdnimg.cn/c7b9743b21734f22bb8c2af1a65b63e8.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5bCPcGln6aWy5YW75ZGY,size_19,color_FFFFFF,t_70,g_se,x_16)  
所以问题转为**如何得出相机到像素所对应的世界坐标的向量的长度**，  
很幸运的是我们拥有深度纹理，所以13.7图的depth是已知的。  
那么如何通过depth来得到dist，这里书本上举例的是TL点的计算。  
![在这里插入图片描述](https://img-blog.csdnimg.cn/38627d0ace66428c9a5924a35712b414.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5bCPcGln6aWy5YW75ZGY,size_20,color_FFFFFF,t_70,g_se,x_16)  
单单看这个点的计算是没问题的，自己手画一个就能得出结果。但关键是为什么所有点都满足，这里设世界坐标下任意一点A。  
![请添加图片描述](https://img-blog.csdnimg.cn/53fae92a49af4105850c77bc54d36570.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5bCPcGln6aWy5YW75ZGY,size_20,color_FFFFFF,t_70,g_se,x_16)  
其和相机的连线经过近平面并产生交点  
![请添加图片描述](https://img-blog.csdnimg.cn/e3d30ae65c0e4382a4a6519a7eae7ef6.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5bCPcGln6aWy5YW75ZGY,size_20,color_FFFFFF,t_70,g_se,x_16)  
画出near向量  
![请添加图片描述](https://img-blog.csdnimg.cn/d8de04ee7fb644dc988e41ab40952104.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5bCPcGln6aWy5YW75ZGY,size_20,color_FFFFFF,t_70,g_se,x_16)  
延长near到长度和A点的z变量，也就是depth一样长，并且做三角形**OAB和ODC**  
这张有点乱，希望大家不要嫌弃，真的不太懂怎么安排线  
![请添加图片描述](https://img-blog.csdnimg.cn/0b8120635d5741c199415d26776be884.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5bCPcGln6aWy5YW75ZGY,size_20,color_FFFFFF,t_70,g_se,x_16)  
很容易发现三角形ODC ~ 三角形OAB  
得到长度关系  
**|near| / |interpolatedRay| = |depth| / |dist|  
对任意点都是适用的**  
所以  
|dist| = |depth| \* (|interpolatedRay| / |near|)  
这里的depth是线性深度，也就是坐标的z分量。  
对应书上片元着色器的部分就是这部分代码。  
![在这里插入图片描述](https://img-blog.csdnimg.cn/55c8fd3227c643518e7789dc022e4f23.png)  
而书本计算interpolatedRay借助了Shader的插值。  
那么现在关键就在于**平面的四个顶点的(interpolatedRay / |near|)在顶点着色器输出后插值得到的到底是不是每个像素对应的 (interpolatedRay / |near|) 。其次|near|是一个常数，所以只需要论证interpolatedRay是否正确即可。**

#### 求助

可惜的是我网上找了很久还是不知道向量是如何插值的，希望有大佬知道的可以告诉我。

### 2D情况下

可能只想要得到近平面的像素点（平面本身构成的图片的像素）在世界空间下的位置，只需要计算出相机到近平面的四个顶点的向量直接插值，无需任何深度纹理的信息。  
也就是书上的这部分代码无需乘scale  
![在这里插入图片描述](https://img-blog.csdnimg.cn/21d9165a0dc14f80a5e6381dc1e095df.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5bCPcGln6aWy5YW75ZGY,size_17,color_FFFFFF,t_70,g_se,x_16)  
并且计算公式变为

    float4 worldPos = _WorldSpaceCameraPos + interpolatedRay;
    

这样子的情况下，雾效的产生将和相机直接挂钩，相机的近平面就是雾效产生的地方，可以在2D游戏中使用。