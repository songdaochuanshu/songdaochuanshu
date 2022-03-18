---
layout: post
title: "前端性能优化 —— 使用 BMP 图片代替 canvas.toDataURL"
date: "2022-03-18T10:58:14.532Z"
---
前端性能优化 —— 使用 BMP 图片代替 canvas.toDataURL
======================================

canvas 导出的图片如果只在本地使用，无需使用 toDataURL 方法，直接在原始数据前加上 BMP 文件头即可使用。

前端开发中有时需要将 canvas 的内容导出成图片文件，例如供 CSS 使用，通常会使用 canvas.toDataURL，兼容性好并且简单。

不过 canvas.toDataURL 显然是非常低效的：首先要将图像编码成 PNG 格式，然后再编码成 Base64，使用时又要解码 Base64 和 PNG，一来一往浪费大量开销，并且超长的 URL 也不美观。当然，使用 canvas.toBlob 倒是可以避免 Base64 转换和超长的 URL，但 PNG 转换仍不可避免，而这是最耗性能的。

既然图片只在本地使用，压缩显然毫无必要，为什么不使用更简单的 BMP 格式？虽然 canvas 并不支持导出 BMP 格式，但主流浏览器都能显示 BMP 图片，而且 BMP 本身也支持透明通道，因此完全可以代替 PNG。

BMP 格式非常简单，只需在像素数据前加个文件头就可以。头结构可参考 [https://en.wikipedia.org/wiki/BMP\_file\_format#Example\_2](https://en.wikipedia.org/wiki/BMP_file_format#Example_2)

![](https://img2022.cnblogs.com/blog/273626/202203/273626-20220318135400232-886214323.png)

其中有些字段是可选的，不用设置。也有几个比较重要的：

*   BMP 默认从下往上显示，高度取负可从上往下显示
    
*   RGBA 掩码的顺序（wiki 文档里是 ARGB 的顺序）
    

我们让 BMP 的像素布局和 canvas 保持一致，这样可无需对现有数据做任何修改。通过 getImageData() 获取数据，前面加上文件头，即可变成一张 BMP 文件。

演示：[https://www.etherdream.com/funnyscript/canvas-to-bmp/](https://www.etherdream.com/funnyscript/canvas-to-bmp/)

虽然是 BMP 图片，但和 PNG 一样同样支持透明度。

![](https://img2022.cnblogs.com/blog/273626/202203/273626-20220318135724460-1762698830.png)

使用这个方案，有时甚至都可以不用 canvas，直接通过算法在内存里画出图像，然后转换成 BMP 进行显示。