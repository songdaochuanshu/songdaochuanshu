---
layout: post
title: "oneAPI DPC++学习资料和实验平台"
date: "2022-03-17T18:51:43.115Z"
---
oneAPI DPC++学习资料和实验平台
=====================

DPC++
-----

一种新的异构平台，弥补了`OPENCL` 编写复杂的难题。基于`SYCL` 抽象层。基于`SYCL` 有多种实现，其中`DPC++`是相对成熟的方案。

![image](https://img2022.cnblogs.com/blog/1620281/202203/1620281-20220317213106197-1830845110.jpg)

书籍
--

由Intel工程师撰写的免费电子图书 [Data Parallel C++ | SpringerLink](https://link.springer.com/book/10.1007/978-1-4842-5574-2) ，书中内容较为详细。由于是英文书籍，所以阅读较为困难。

网站
--

*   [HPCwire: Global News on High Performance Computing (HPC)](https://www.hpcwire.com/) 关注于高性能计算与异构计算的网站。时常会有关于`SYCL` 和`oneAPI` 相关的内容，以及其他高性能计算领域的前沿成果和技术。
*   [Devcloud](https://devcloud.intel.com/) intel官方网站，内有虚拟环境可供进行`DPC++`编译和运行，同时网站内的包含入门`DPC++` 的[基础课程](https://devcloud.intel.com/oneapi/get_started/baseTrainingModules/)。
*   [Codeplay Developer](https://developer.codeplay.com/home/) `DPC++`支持`CUDA` 的部分由该组织编写，同时，该组织维护了`SYCL` 的另外一个分支`Compute CPP` 。
*   [oneAPI-SRC](https://github.com/oneapi-src) `Intel`官方关于`oneAPI` 的源码，里面包括了很多`sample` 代码值得学习。
*   [SYCL](https://www.khronos.org/sycl/) `Sycl`官网，内有大量的`Sycl` 发展路径和技术文章。