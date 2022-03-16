---
layout: post
title: "golang 中 channel 的详细使用、使用注意事项及死锁分析"
date: "2022-03-16T17:18:42.404Z"
---
golang 中 channel 的详细使用、使用注意事项及死锁分析
==================================

什么是 channel 管道
--------------

它是一个数据管道，可以往里面写数据，从里面读数据。

channel 是 goroutine 之间数据通信桥梁，而且是线程安全的。

channel 遵循先进先出原则。

写入，读出数据都会加锁。

**channel 可以分为 3 种类型：**

*   只读 channel，单向 channel
    
*   只写 channel，单向 channel
    
*   可读可写 channel
    

**channel 还可按是否带有缓冲区分为：**

*   带缓冲区的 channel，定义了缓冲区大小，可以存储多个数据
    
*   不带缓冲区的 channel，只能存一个数据，并且只有当该数据被取出才能存下一个数据
    

channel 的基本使用
-------------

### 定义和声明

    // 只读 channel
    var readOnlyChan <-chan int  // channel 的类型为 int
    
    // 只写 channel
    var writeOnlyChan chan<- int
    
    // 可读可写
    var ch chan int
    
    // 或者使用 make 直接初始化
    readOnlyChan1 := make(<-chan int, 2)  // 只读且带缓存区的 channel
    readOnlyChan2 := make(<-chan int)   // 只读且不带缓存区 channel
    
    writeOnlyChan3 := make(chan<- int, 4) // 只写且带缓存区 channel
    writeOnlyChan4 := make(chan<- int) // 只写且不带缓存区 channel
    
    ch := make(chan int, 10)  // 可读可写且带缓存区
    
    ch <- 20  // 写数据
    i := <-ch  // 读数据
    i, ok := <-ch  // 还可以判断读取的数据
    

chan\_var.go

    
    package main
    
    import (
        "fmt"
    )
    
    func main() {
        // var 声明一个 channel，它的零值是nil
        var ch chan int
        fmt.Printf("var: the type of ch is %T \n", ch)
        fmt.Printf("var: the val of ch is %v \n", ch)
    
        if ch == nil {
            // 也可以用make声明一个channel，它返回的值是一个内存地址
            ch = make(chan int)
            fmt.Printf("make: the type of ch is %T \n", ch)
            fmt.Printf("make: the val of ch is %v \n", ch)
        }
    
        ch2 := make(chan string, 10)
        fmt.Printf("make: the type of ch2 is %T \n", ch2)
        fmt.Printf("make: the val of ch2 is %v \n", ch2)
    }
    
    // 输出：
    // var: the type of ch is chan int
    // var: the val of ch is <nil>
    // make: the type of ch is chan int
    // make: the val of ch is 0xc000048060
    // make: the type of ch2 is chan string
    // make: the val of ch2 is 0xc000044060
    

### 操作channel的3种方式

操作 channel 一般有如下三种方式：

1.  读 <-ch
    
2.  写 ch<-
    
3.  关闭 close(ch)
    

操作

nil的channel

正常channel

已关闭的channel

读 <-ch

阻塞

成功或阻塞

读到零值

写 ch<-

阻塞

成功或阻塞

panic

关闭 close(ch)

panic

成功

panic

> **注意** 对于 nil channel 的情况，有1个特殊场景：
> 
> 当 nil channel 在 select 的某个 case 中时，这个 case 会阻塞，但不会造成死锁。

### 单向 channel

> 单向 channel：只读和只写的 channel

chan\_uni.go

    package main
    
    import "fmt"
    
    func main() {
    	// 单向 channel，只写channel
    	ch := make(chan<- int)
    	go testData(ch)
    	fmt.Println(<-ch)
    }
    
    func testData(ch chan<- int) {
    	ch <- 10
    }
    
    // 运行输出
    // ./chan_uni.go:9:14: invalid operation: <-ch (receive from send-only type chan<- int)
    // 报错，它是一个只写 send-only channel
    

把上面代码main()函数里初始化的单向channel，修改为可读可写channel，再运行

chan\_uni2.go

    package main
    
    import "fmt"
    
    func main() {
        // 把上面代码main()函数初始化的单向 channel 修改为可读可写的 channel
    	ch := make(chan int)
    	go testData(ch)
    	fmt.Println(<-ch)
    }
    
    func testData(ch chan<- int) {
    	ch <- 10
    }
    
    // 运行输出：
    // 10
    
    // 没有报错，可以正常输出结果
    

### 带缓冲和不带缓冲的 channel

#### 不带缓冲区 channel

chan\_unbuffer.go

    package main
    
    import "fmt"
    
    func main() {
        ch := make(chan int) // 无缓冲的channel
        go unbufferChan(ch)
    
        for i := 0; i < 10; i++ {
            fmt.Println("receive ", <-ch) // 读出值
        }
    }
    
    func unbufferChan(ch chan int) {
        for i := 0; i < 10; i++ {
            fmt.Println("send ", i)
            ch <- i // 写入值
        }
    }
    
    // 输出
    send  0
    send  1
    receive  0
    receive  1
    send  2
    send  3
    receive  2
    receive  3
    send  4
    send  5
    receive  4
    receive  5
    send  6
    send  7
    receive  6
    receive  7
    send  8
    send  9
    receive  8
    receive  9
    

#### 带缓冲区 channel

chan\_buffer.go

    package main
    
    import (
    	"fmt"
    )
    
    func main() {
    	ch := make(chan string, 3)
    	ch <- "tom"
    	ch <- "jimmy"
    	ch <- "cate"
    
    	fmt.Println(<-ch)
    	fmt.Println(<-ch)
    	fmt.Println(<-ch)
    }
    
    // 运行输出：
    // tom
    // jimmy
    // cate
    

再看一个例子：chan\_buffer2.go

    package main
    
    import (
    	"fmt"
    	"time"
    )
    
    var c = make(chan int, 5)
    
    func main() {
    	go worker(1)
    	for i := 1; i < 10; i++ {
    		c <- i
    		fmt.Println(i)
    	}
    }
    
    func worker(id int) {
    	for {
    		_ = <-c
    	}
    }
    
    // 运行输出：
    // 1
    // 2
    // 3
    // 4
    // 5
    // 6
    // 7
    // 8
    // 9
    

### 判断 channel 是否关闭

    if v, ok := <-ch; ok {
        fmt.Println(ch)
    }
    

说明：

*   ok 为 true，读到数据，且管道没有关闭
*   ok 为 false，管道已关闭，没有数据可读

读已经关闭的 channel 会读到零值，如果不确定 channel 是否关闭，可以用这种方法来检测。

### range and close

range 可以遍历数组，map，字符串，channel等。

一个发送者可以关闭 channel，表明没有任何数据发送给这个 channel 了。接收者也可以测试channel是否关闭，通过 `v, ok := <-ch` 表达式中的 ok 值来判断 channel 是否关闭。上一节已经说明 ok 为 false 时，表示 channel 没有接收任何数据，它已经关闭了。

> 注意：仅仅只能是发送者关闭一个 channel，而不能是接收者。给已经关闭的 channel 发送数据会导致 panic。

> Note: channels 不是文件，你通常不需要关闭他们。那什么时候需要关闭？当要告诉接收者没有值发送给 channel 了，这时就需要了。
> 
> 比如终止 range 循环。

当 for range 遍历 channel 时，如果发送者没有关闭 channel 或在 range 之后关闭，都会导致 deadlock(死锁)。

下面是一个会产生死锁的例子：

    package main
    
    import "fmt"
    
    func main() {
    	ch := make(chan int)
    
    	go func() {
    		for i := 0; i < 10; i++ {
    			ch <- i
    		}
    	}()
    
    	for val := range ch {
    		fmt.Println(val)
    	}
    	close(ch) // 这里关闭channel已经”通知“不到range了，会触发死锁。
                  // 不管这里是否关闭channel，都会报死锁，close(ch)的位置就不对。
                  // 且关闭channel的操作者也错了，只能是发送者关闭channel
    }
    // 运行程序输出
    // 0
    // 1
    // 2
    // 3
    // 4
    // 5
    // 6
    // 7
    // 8
    // 9
    // fatal error: all goroutines are asleep - deadlock!
    

改正也很简单，把 `close(ch)` 移到 `go func(){}()` 里，代码如下

    go func() {
        for i := 0; i < 10; i++ {
            ch <- i
        }
        close(ch)
    }()
    

这样程序就可以正常运行，不会报 deadlock 的错误了。

把上面程序换一种方式来写，chan\_range.go

    package main
    
    import (
    	"fmt"
    )
    
    func main() {
    	ch := make(chan int)
    	go test(ch)
    	for val := range ch { //
    		fmt.Println("get val: ", val)
    	}
    }
    
    func test(ch chan int) {
    	for i := 0; i < 5; i++ {
    		ch <- i
    	}
    	close(ch)
    }
    
    // 运行输出：
    // get val:  0
    // get val:  1
    // get val:  2
    // get val:  3
    // get val:  4
    

发送者关闭 channel 时，for range 循环自动退出。

### for 读取channel

用 for 来不停循环读取 channel 里的数据。

把上面的 range 程序修改下,chan\_for.go

    package main
    
    import (
    	"fmt"
    )
    
    func main() {
    	ch := make(chan int)
    	go test(ch)
    
    	for {
    		val, ok := <-ch
    		if ok == false {// ok 为 false，没有数据可读
    			break // 跳出循环
    		}
    		fmt.Println("get val: ", val)
    	}
    }
    
    func test(ch chan int) {
    	for i := 0; i < 5; i++ {
    		ch <- i
    	}
    	close(ch)
    }
    
    // 运行输出：
    // get val:  0
    // get val:  1
    // get val:  2
    // get val:  3
    // get val:  4
    

### select 使用

例子 chan\_select.go

    package main
    
    import "fmt"
    
    // https://go.dev/tour/concurrency/5
    func fibonacci(ch, quit chan int) {
    	x, y := 0, 1
    	for {
    		select {
    		case ch <- x:
    			x, y = y, x+y
    		case <-quit:
    			fmt.Println("quit")
    			return
    		}
    	}
    }
    
    func main() {
    	ch := make(chan int)
    	quit := make(chan int)
    
    	go func() {
    		for i := 0; i < 10; i++ {
    			fmt.Println(<-ch)
    		}
    		quit <- 0
    	}()
    
    	fibonacci(ch, quit)
    }
    
    // 运行输出：
    // 0
    // 1
    // 1
    // 2
    // 3
    // 5
    // 8
    // 13
    // 21
    // 34
    // quit
    
    

channel 的一些使用场景
---------------

### 1\. 作为goroutine的数据传输管道

    package main
    
    import "fmt"
    
    // https://go.dev/tour/concurrency/2
    func sums(s []int, c chan int) {
    	sum := 0
    	for _, v := range s {
    		sum += v
    	}
    	c <- sum
    }
    
    func main() {
    	s := []int{7, 2, 8, -9, 4, 0}
    
    	c := make(chan int)
    	go sums(s[:len(s)/2], c)
    	go sums(s[len(s)/2:], c)
    
    	x, y := <-c, <-c // receive from c
    
    	fmt.Println(x, y, x+y)
    }
    

用 goroutine 和 channel 分批求和

### 2\. 同步的channel

> **没有缓冲区**的 channel 可以作为同步数据的管道，起到同步数据的作用。

对没有缓冲区的 channel 操作时，发送的 goroutine 和接收的 goroutine 需要同时准备好，也就是发送和接收需要一一配对，才能完成发送和接收的操作。

如果两方的 goroutine 没有同时准备好，channel 会导致先执行发送或接收的 goroutine 阻塞等待。这就是没有缓冲区的 channel 作为数据同步的作用。

[gobyexample](https://gobyexample.com/channel-synchronization) 中的一个例子：

    package main
    
    import (
    	"fmt"
    	"time"
    )
    
    //https://gobyexample.com/channel-synchronization
    func worker(done chan bool) {
    	fmt.Println("working...")
    	time.Sleep(time.Second)
    	fmt.Println("done")
    
    	done <- true
    }
    
    func main() {
    	done := make(chan bool, 1)
    	go worker(done)
    
    	<-done
    }
    

> 注意：同步的 channel 千万不要在同一个 goroutine 协程里发送和接收数据。可能导致deadlock死锁。

### 3\. 异步的channel

有缓冲区的 channel 可以作为异步的 channel 使用。

有缓冲区的 channel 也有操作注意事项：

> 1.  如果 channel 中没有值了，channel 为空了，那么接收者会被阻塞。
>     
> 2.  如果 channel 中的缓冲区满了，那么发送者会被阻塞。
>     
>     **注意**：有缓冲区的 channel，用完了要 close，不然处理这个channel 的 goroutine 会被阻塞，形成死锁。
>     

    package main
    
    import (
    	"fmt"
    )
    
    func main() {
    	ch := make(chan int, 4)
    	quitChan := make(chan bool)
    
    	go func() {
    		for v := range ch {
    			fmt.Println(v)
    		}
    		quitChan <- true // 通知用的channel，表示这里的程序已经执行完了
    	}()
    
    	ch <- 1
    	ch <- 2
    	ch <- 3
    	ch <- 4
    	ch <- 5
    
    	close(ch)  // 用完关闭channel
    	<-quitChan // 接到channel通知后解除阻塞，这也是channel的一种用法
    }
    

### 4.channel 超时处理

channel 结合 time 实现超时处理。

当一个 channel 读取数据超过一定时间还没有数据到来时，可以得到超时通知，防止一直阻塞当前 goroutine。

chan\_timeout.go

    package main
    
    import (
    	"fmt"
    	"time"
    )
    
    func main() {
    	ch := make(chan int)
    	quitChan := make(chan bool)
    
    	go func() {
    		for {
    			select {
    			case v := <-ch:
    				fmt.Println(v)
    			case <-time.After(time.Second * time.Duration(3)):
    				quitChan <- true
    				fmt.Println("timeout, send notice")
    				return
    			}
    		}
    	}()
    
    	for i := 0; i < 4; i++ {
    		ch <- i
    	}
    
    	<-quitChan // 输出值，相当于收到通知，解除主程阻塞
    	fmt.Println("main quit out")
    }
    

使用 channel 的注意事项及死锁分析
---------------------

### 未初始化的 channel 读写关闭操作

1.读：未初始化的channel，读取里面的数据时，会造成死锁deadlock

    var ch chan int
    <-ch  // 未初始化channel读数据会死锁
    

2.写：未初始化的channel，往里面写数据时，会造成死锁deadlock

    var ch chan int
    ch<-  // 未初始化channel写数据会死锁
    

3.关闭：未初始化的channel，关闭该channel时，会panic

    var ch chan int
    close(ch) // 关闭未初始化channel，触发panic
    

### 已初始化的 channel 读写关闭操作

#### 1\. 已初始化，没有缓冲区的channel

       // 代码片段1
       func main() {
            ch := make(chan int)
            ch <- 4
       }
    

代码片段1：没有缓冲channel，且只有写入没有读取，会产生死锁

  

       // 代码片段2
       func main() {
           ch := make(chan int)
           val, ok := <-ch
       }
    

代码片段2：没有缓冲channel，且只有读取没有写入，会产生死锁

  

       // 代码片段3
       func main() {
           ch := make(chan int)
           val, ok := <-ch
           if ok {
               fmt.Println(val)
           }
           ch <- 10 // 这里进行写入。但是前面已经产生死锁了
       }
    

代码片段3：没有缓冲channel，既有写入也有读出，但是在代码 `val, ok := <-c` 处已经产生死锁了。下面代码执行不到。

  

       // 代码片段4
       func main() {
       	ch := make(chan int)
       	ch <- 10
       	go readChan(ch)
       	
           time.Sleep(time.Second * 2)
       }
       
       func readChan(ch chan int) {
       	for {
       		val, ok := <-ch
       		fmt.Println("read ch: ", val)
       		if !ok {
       			break
       		}
       	}
       }
    

代码片段4：没有缓冲channel，既有写入也有读出，但是运行程序后，报错 `fatal error: all goroutines are asleep - deadlock!` 。

这是因为往 channle 里写入数据的代码 `ch <- 10`，这里写入数据时就已经产生死锁了。把 `ch<-10` 和 `go readChan(ch)` 调换位置，程序就能正常运行，不会产生死锁。

  

       // 代码片段5
       func main() {
       	ch := make(chan int)
       
       	go writeChan(ch)
       
       	for {
       		val, ok := <-ch
       		fmt.Println("read ch: ", val)
       		if !ok {
       			break
       		}
       	}
       
       	time.Sleep(time.Second)
           fmt.Println("end")
       }
       
       func writeChan(ch chan int) {
       	for i := 0; i < 4; i++ {
       		ch <- i
       	}
       }
    

代码片段5：没有缓冲的channel，既有写入，也有读出，与上面几个代码片段不同的是，写入channel的数据不是一个。

思考一下，这个程序会产生死锁吗？10 秒时间思考下，先不要看下面。  
  
  
  

也会产生死锁，它会输出完数据后，报错 `fatal error: all goroutines are asleep - deadlock!`。

为什么呢？这个程序片段，既有读也有写而且先开一个goroutine写数据，为什么会死锁？

原因在于 `main()` 里的 `for` 循环。可能你会问，不是有 `break` 跳出 `for` 循环吗？代码是写了，但是程序并没有执行到这里。

因为 `for` 会不停的循环，而 `val, ok := <-ch`， 这里 `ok` 值一直是 true，因为程序里并没有哪里关闭 channel 啊。你们可以打印这个 `ok` 值看一看是不是一直是 true。当 `for` 循环把 channel 里的值读取完了后，程序再次运行到 `val, ok := <-ch` 时，产生死锁，因为 channel 里没有数据了。

找到原因了，那解决办法也很简单，在 `writeChan` 函数里关闭 channel，加上代码 `close(ch)`。告诉 `for` 我写完了，关闭 channel 了。

加上关闭 channel 代码后运行程序：

    read ch:  0 , ok:  true
    read ch:  1 , ok:  true
    read ch:  2 , ok:  true
    read ch:  3 , ok:  true
    read ch:  0 , ok:  false
    end
    

程序正常输出结果。

对于没有缓冲区的 channel (unbuffered channel) 容易产生死锁的几个代码片段分析，总结下:

> 1.  channel 要用 make 进行初始化操作
> 2.  读取和写入要配对出现，并且不能在同一个 goroutine 里
> 3.  一定先用 go 起一个协程执行读取或写入操作
> 4.  多次写入数据，for 读取数据时，写入者注意关闭 channel(代码片段5)

  

#### 2\. 已初始化，有缓冲区的 channel

    // 代码片段1
    func main() {
        ch := make(chan int, 1)
        val, ok := <-ch
    }
    

代码片段1：有缓冲channel，先读数据，这里会一直阻塞，产生死锁。

  

       // 代码片段2
       func main() {
           ch := make(chan int, 1)
           ch <- 10
       }
    

代码片段2：同代码片段1，有缓冲channel，只有写没有读，也会阻塞，产生死锁。

  

       // 代码片段3
       func main() {
       	ch := make(chan int, 1)
       	ch <- 10
       
       	val, ok := <-ch
       	if ok {
       		fmt.Println(val, ok)
       	}
       }
    

代码片段3：有缓冲的channel，有读有写，正常的输出结果。

  

有缓冲区的channel总结：

> 1.  如果 channel 满了，发送者会阻塞
> 2.  如果 channle 空了，接收者会阻塞
> 3.  如果在同一个 goroutine 里，写数据操作一定在读数据操作前

参考
--

*   [https://go.dev/tour/concurrency](https://go.dev/tour/concurrency)
*   [https://go.dev/ref/spec#Channel\_types](https://go.dev/ref/spec#Channel_types)
*   [https://go.dev/ref/spec#Send\_statements](https://go.dev/ref/spec#Send_statements)
*   [https://go.dev/ref/spec#Receive\_operator](https://go.dev/ref/spec#Receive_operator)
*   [https://go.dev/ref/spec#Close](https://go.dev/ref/spec#Close)
*   [https://go.dev/doc/effective\_go#channels](https://go.dev/doc/effective_go#channels)
*   [https://go.dev/ref/spec#Select\_statements](https://go.dev/ref/spec#Select_statements)
*   [https://gobyexample.com/](https://gobyexample.com/)
*   [Concurrency is not parallelism - The Go Programming Language](https://go.dev/blog/waza-talk)

\== just do it ==