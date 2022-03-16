---
layout: post
title: "关于malloc源码中的bin_at宏定义的个人见解"
date: "2022-03-16T23:17:43.389Z"
---
关于malloc源码中的bin\_at宏定义的个人见解
===========================

0x01：简介
-------

      在堆中的内存申请和释放中，为了减少使用系统调用函数对内存操作，malloc\_state（分配区）结构中使用了fastbinsY数组和bins数组。当chunk被free后，bins链会将这些free chunk组织起来。当下次malloc时，会先对bins链中的free chunk进行遍历，有适合的则使用，无合适的再进行下一步操作。

     在申请和释放操作时，一般是有一个arena（分配区，其为malloc\_state结构类型）。通过宏定义bin\_at(m,i)即可获得对相应bins链进行操作，m为分配区，i为索引，当i=1是为unsorted bin，i=2~63是small bin，i=64~126为large bin。

bin\_at可以这样使用：
p \= bin\_at(m,1)  //unsorted bin
FD = p -> fd     //FD指向该链的第一个free chunk
BK = p -> bk     //BK指向该链的最后一个free chunk

 0x02：个人理解
----------

该宏定义为这样子，主要是为了操作方便（可直接fd、bk指向）和在节省空间之间取平衡。既操作方便又不浪费空间。

bin\_at(m,i)宏定义原型：

**#define bin\_at(m, i) \\
  (mbinptr) (((char \*) &((m)->bins\[((i) - 1) \* 2\]))                              \\
             - offsetof (struct malloc\_chunk, fd))**

解释：  
1、&((m)->bins\[((i)-1)\*2\]),该式子根据bin的索引i，i为1时，即最开始的bin（unsorted bin）。  
   获得bins\[0\]的地址，乘于2主要是因为fd和bk是一对存储的。  
  
2、offsetof(struct malloc\_chunk,fd):得到fd成员在malloc\_chunk结构中的偏移量。在64位系统系统下为16。  
   把第一步得到地址（令其为pt）转化为char\*型，这样子减偏移值: pt - offsetof = pt - offsetof\*(sizeof(char))。  
  
3、重点：  
   在第二步下，第一步得到的地址指向往后推移了两个单元，比如图中的bin\_at(m,1)得到的是bins\[0\]前两个单元所在的地址。  
   然后经过最后的（mbinptr）转化为malloc\_chunk\*类型，这样就可以有->fd、->bk操作。  
   相当于是糊弄了操作系统，让操作系统误以为是个chunk结构。

![](https://img2022.cnblogs.com/blog/2641001/202203/2641001-20220316175645028-1855717037.png)

 语言表达不够，画图来凑~~

0x03：测试
-------

 1 测试代码：
 2 #include<stdio.h>
 3 #include<malloc.h>
 4 
 5 int main() 6 {
 7     void\* p1 = malloc(0x100);
 8     void\* f1 = malloc(0x10);   //防止合并
 9     void\* p2 = malloc(0x100);
10     void\* f2 = malloc(0x10);
11     void\* p3 = malloc(0x100);
12     void\* f3 = malloc(0x10);
13 
14     sleep(0);  //方便下断点
15 
16 free(p1);
17 free(p2);
18 free(p3);
19 
20     sleep(0);  //下图断在了这里
21     return 0;
22 }

![](https://img2022.cnblogs.com/blog/2641001/202203/2641001-20220316183333023-179993675.png)

 可以看出unsorted bin的第一个单元是指向bin链的第一个free chunk，另外一个单元指向bin链的最后一个free chunk。图中我已经标出了指向top chunk的那个单元，也有：bin\_at(m,1)指向该单元 ，或者更本质一点：bin\_at(m,1) = 0x7ffffdd1b78。

 0x04：思考
--------

        在刚开始看这个宏定义时，一脸懵逼，觉得这个宏定义是有问题吧，减去16不是超出了范围了么？后来继续分析源码时发现了->fd和->bk的操作，陷入了沉思。巧的是，群里有师傅刚好提到这个问题，所以和该师傅交流了一下，最后得到了一个比较合理的解释。

       但是令我疑惑的是，为什么在后面会留两个空白单元嘞？留在前面不是更恰当么？bin\_at(m,1)指向了bins数组外面的单元（存top chunk地址的单元），这样会不会存有遗患呢？有想法的欢迎与我交流^\_^，QQ:1623093551。

* * *

tolele 2022-03-16