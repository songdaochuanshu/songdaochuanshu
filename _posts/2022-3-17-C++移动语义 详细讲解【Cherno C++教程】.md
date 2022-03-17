---
layout: post
title: "C++移动语义 详细讲解【Cherno C++教程】"
date: "2022-03-17T18:51:43.359Z"
---
C++移动语义 详细讲解【Cherno C++教程】
==========================

移动语义
====

本文是对《最好的C++教程》的整理，主要是移动语义部分，包含视频[85p左值和右值](https://www.bilibili.com/video/BV1Aq4y1t73p?share_source=copy_web)、[89p移动语义](https://www.bilibili.com/video/BV1BZ4y1R7KF?share_source=copy_web)与[90p stdmove和移动赋值操作符](https://www.bilibili.com/video/BV1Ma411C7Xa?share_source=copy_web)。

移动语义是C++11的新feature，可能许多人学习的时候尚未使用到C++11的特性，但是现在C++11已经过去了10年了，早已成为广泛使用的基础特性。所以绝对值得一学。在我的上一篇博客[自己动手写Vector](https://www.cnblogs.com/zhangyi1357/p/16009968.html)中就用到了相关的内容对Vector的性能做了一定的提升，学习完本文后可以到其中看看实际中的使用。

文章主题内容来自Cherno的视频教程，但是同时也加入了一些个人的理解和思考在其中，并未一一指出，如有错误或疑惑之处，欢迎留言批评指正。

本文包含的知识点：左值和右值、移动语义、stdmove、移动赋值操作符

原作者Cherno视频链接：[Cherno C++视频教程](https://youtube.com/playlist?list=PLlrATfBNZ98dudnM48yfGUldqGD0S4FFb)

文中代码GitHub链接：[https://github.com/zhangyi1357/Little-stuff/tree/main/Move-Semantics](https://github.com/zhangyi1357/Little-stuff/tree/main/Move-Semantics)

目录

*   [移动语义](#移动语义)
*   [左值与右值](#左值与右值)
    *   [基本概念](#基本概念)
    *   [引用](#引用)
    *   [函数返回值](#函数返回值)
    *   [函数参数](#函数参数)
    *   [Const](#const)
    *   [右值引用](#右值引用)
*   [移动语义](#移动语义-1)
    *   [为什么需要移动语义？](#为什么需要移动语义)
    *   [例子](#例子)
    *   [移动构造函数](#移动构造函数)
    *   [移动赋值运算符](#移动赋值运算符)
*   [C++ 三/五法则](#c-三五法则)
*   [参考资料](#参考资料)

左值与右值
=====

相信你已经在很多地方听过左值右值了，比如编译器的报错等处。想要理解移动语义，左值和右值是绕不过去的概念。

如果你对左值和右值已经十分熟悉了，可以直接跳过此章节，直接阅读移动语义部分。

如果你去看左值右值的定义或者到CSDN上去找什么是左值右值，你可能会看得晕头转向。不过我们不需要对背诵左值和右值的定义，只需要用一个基本的原则指导我们去应用左值和右值就可以了。毕竟我们只是需要学习其用法而不是做语言律师。

这个基本原则就是：

*   左值对应于一个实实在在的内存位置，右值只是临时的对象，它的内存对程序来说只能读不能写。

以上原则或许不能精确描述左值和右值的定义，但是足够我们理解左值和右值的应用。

我们结合一些具体的例子来应用上面的原则。

基本概念
----

    int i = 10;
    i = 5;
    int a = i;
    a = i;
    

这里a, i就是左值，10, 5为右值，我们可以用右值来初始化左值或赋值，也可以用左值来初始化左值或赋值给左值。

    10 = i; // error
    

而左值显然不能赋给右值。

应用基本原则上述都是很自然的事情，右值没有存储其的位置，自然不能给它赋值，左值就当成一个变量，想怎么赋值就怎么赋值。

引用
--

    // int& b = 5;  // can't reference rvalue
    int& c = i;     // allowed
    

可以对一个有地址的变量创建引用（引用本质上就是指针的语法糖），右值没有地址自然不能引用。

函数返回值
-----

关于函数返回值和参数完全可以把传参和返回过程看成是赋值来理解。

    int GetValue() {
        return 5;
    }
    i = GetValue();
    GetValue() = i; // error
    

这里GetValue函数的返回值为右值，可以当成和前面一样的情况。

    int& GetLValue() {
        static int value = 10;
        return value;
    }
    i = GetLValue(); // true
    GetLValue() = i; // true
    

函数的返回值一样可以是左值，不过要注意的是函数不能返回其临时变量，因为临时变量虽然有其内存位置，但是函数调用结束后栈帧就销毁了，临时变量一并销毁了，所以就不能作为左值了。

函数参数
----

    void SetValue(int value) {}
    
    void SetLValue(int& value) {}
    
    SetValue(i);        
    SetValue(5);        
    
    SetLValue(i);       
    SetLValue(5); // error
    

这几个可以用作练习。

Const
-----

上面的函数参数问题似乎有些让人恼火，因为有时候你确实就是想传入一个值而不是创建一个变量再传入，实际上C++为此提供了解决方案。

    const int & d = 5;
    
    void SetConstValue(const int& value) {}
    SetConstValue(i);
    SetConstValue(5);
    

你可能会想说，这样就没法在函数里改变value的值了。但是如果你需要改变value的值，你就不能传入一个右值。二者不可兼得。

右值引用
----

现在我们介绍一个对于移动语义实现的关键。

前面我们说到int&只接受左值，const int&左右值都接受，那么有没有一种方式只接受右值呢？

    void PrintName(const std::string& name) {
        std::cout << "[lvalue] " << name << std::endl;
    }
    void PrintName(const std::string&& name) {
        std::cout << "[rvalue] " << name << std::endl;
    }
    
    std::string firstName = "Yan";
    std::string lastName = "Chernikov";
    std::string fullName = firstName + lastName;
    
    PrintName(fullName);
    PrintName(firstName + lastName);
    

注意第二个函数的参数类型，相较于前一个多了一个&符号，代表其仅接受右值引用。

以上程序的输出为：

    [lvalue] YanChernikov
    [rvalue] YanChernikov
    

移动语义
====

为什么需要移动语义？
----------

首先来讲讲我们为什么需要移动语义，很多时候我们只是单纯创建一些右值，然后赋给某个对象用作构造函数。

这时候会出现的情况是，我们首先需要在main函数里创建这个右值对象，然后复制给这个对象相应的成员变量。

如果我们可以直接把这个右值变量移动到这个成员变量而不需要做一个额外的复制行为，程序性能就这样提高了。

例子
--

让我们看下面这样一个例子

    #include <iostream>
    #include <cstring>
    
    class String {
    public:
        String() = default;
        String(const char* string) {
            printf("Created!\n");
            m_Size = strlen(string);
            m_Data = new char[m_Size];
            memcpy(m_Data, string, m_Size);
        }
    
        String(const String& other) {
            printf("Copied!\n");
            m_Size = other.m_Size;
            m_Data = new char[m_Size];
            memcpy(m_Data, other.m_Data, m_Size);
        }
    
        ~String() {
            delete[] m_Data;
        }
    
        void Print() {
            for (uint32_t i = 0; i < m_Size; ++i)
                printf("%c", m_Data[i]);
    
            printf("\n");
        }
    private:
        char* m_Data;
        uint32_t m_Size;
    };
    
    class Entity {
    public:
        Entity(const String& name)
            : m_Name(name) {}
        void PrintName() {
            m_Name.Print();
        }
    private:
        String m_Name;
    };
    
    int main(int argc, const char* argv[]) {
        Entity entity(String("Cherno"));
        entity.PrintName();
    
        return 0;
    }
    

程序的输出结果是

    Created!
    Copied!
    Cherno
    

可以看到中间发生了一次copy，实际上这次copy发生在Entity的初始化列表里。

从String的复制构造函数可以看到，复制过程中还申请了新的内存空间！这会带来很大的消耗。

移动构造函数
------

现在让我们为String写一个移动构造函数并为Entity重载一个接受右值引用参数的构造函数，另外我们还将原来的构造函数注释掉了。

        String(String&& other) {
            printf("Moved!\n");
            m_Size = other.m_Size;
            m_Data = other.m_Data;
            other.m_Data = nullptr;
            other.m_Size = 0;
        }
    
       ~String() {
            printf("Destroyed!\n");
            delete[] m_Data;
        }
    
        Entity(String&& name)
            : m_Name(name) {}
    
        // Entity(const String& name)
        //     : m_Name(name) {}
    
    

输出为

    Created!
    Copied!
    Destroyed!
    Cherno
    Destroyed!
    

幸运的是可以看到没有报错，确实调用了新写的Entity的构造函数并输出了结果。

但是不幸的是还是调用了String的赋值构造函数，问题出在哪呢？

实际上接受右值的函数在参数传进来后其右值属性就退化了，所以给m\_Name的参数仍然是左值，还是会调用复制构造函数。

解决的办法是将name转型，

    Entity(String&& name)
        :m_Name((String&&)name) {}
    

但是这样的作法并不优雅，C++为了提供了更为优雅的做法

    Entity(String&& name)
        :m_Name(std::move(name)) {}
    

修改之后的输出结果为

    Created!
    Moved!
    Destroyed!
    Cherno
    Destroyed
    

完美！

移动赋值运算符
-------

上面的例子讲了关于移动构造函数的例子，然而有时候我们想要将一个已经存在的对象移动给另一个已经存在的对象，就像下面这样。

    int main(int argc, const char* argv[]) {
        String apple = "apple";
        String orange = "orange";
    
        printf("apple: ");
        apple.Print();
        printf("orange: ");
        orange.Print();
    
        apple = std::move(orange);
    
        printf("apple: ");
        apple.Print();
        printf("orange: ");
        orange.Print();
        return 0;
    }
    

我们需要的是一个移动赋值运算符重载

        String& operator=(String&& other) {
            printf("Moved\n");
            if (this != &other) {
                delete[] m_Data;
    
                m_Size = other.m_Size;
                m_Data = other.m_Data;
    
                other.m_Data = nullptr;
                other.m_Size = 0;
            }
            return *this;
        }
    

注意这里的实现还是有点讲究的，因为移动赋值相当于把别的对象的资源都偷走，那如果移动到自己头上了就没必要自己偷自己 。

更重要的是**原来自己的资源一定要释放掉**，否则指向自己原来内容内存的指针就没了，这一片内存就泄露了！

上述输出结果是

    Created!
    Created!
    apple: apple
    orange: orange
    Moved
    apple: orange
    orange:
    Destroyed!
    Destroyed!
    

很漂亮，orange的内容被apple偷走了。

C++ 三/五法则
=========

浏览知乎时看到了如下的[回答](https://www.zhihu.com/question/39169728/answer/97243257)

![陈硕大佬关于识别C++代码质量的回答](https://img2022.cnblogs.com/blog/2744240/202203/2744240-20220317195145892-1024402652.png)

其实这说的就是如果有必要实现析构函数，那么就有必要一并正确实现复制构造函数和赋值运算符，这被称为三法则。

如果加上这一节所讲的移动构造函数和移动赋值运算符，则被称为五法则。

上述法则可以用来识别C++项目的代码质量，既然在用C++写代码，希望就能写出符合规范的优雅的代码，做一个更优秀的C++er。

更多详细资料可以参考[C++ 三/五法则 - 阿玛尼迪迪 - 博客园 (cnblogs.com)](https://www.cnblogs.com/codingmengmeng/p/9110608.html)

参考资料
====

[陈硕大佬关于识别C++项目代码质量的回答](https://www.zhihu.com/question/39169728/answer/97243257)

[Cherno C++视频教程](https://youtube.com/playlist?list=PLlrATfBNZ98dudnM48yfGUldqGD0S4FFb)

[C++ 三/五法则 - 阿玛尼迪迪 - 博客园 (cnblogs.com)](https://www.cnblogs.com/codingmengmeng/p/9110608.html)

_原文链接：[https://www.cnblogs.com/zhangyi1357/p/16018810.html](https://www.cnblogs.com/zhangyi1357/p/16018810.html)  
转载请注明出处！_