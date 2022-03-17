---
layout: post
title: "RedisTemplate批量插入"
date: "2022-03-17T13:24:58.524Z"
---
RedisTemplate批量插入
=================

1\. 循环请求
--------

最容易想到也是最耗时的操作，不推荐使用。简单样例如下

    @Service
    public class RedisService {
        @Resource
        private RedisTemplate<String,Object> template;
    
        public void multiSave(Map<String,String> source) {
            for(Map.Entry<String,String> item : source.entrySet()) {
                template.opsForValue().set(item.getKey(), item.getValue());
            }
        }
    }
    

2\. pipe请求
----------

流水线操作，其实就是一次性请求把所有命令发过去，不再等待他的返回，节省的是http请求时间。  
需要注意的是必须要自己序列化，我此处使用RedisSerializer.string()始终是一个对象，但是如果json序列对象RedisSerializer.json()每次都是新对象，这个就建议自己声明一个变量保存  
下面的样例为求优雅，用的是jdk8的一些语法和对象，如果读者的jdk<8, 可以找找其他网上不那么优雅的版本

    @Service
    public class RedisService {
        @Resource
        private RedisTemplate<String, Object> template;
    
        public void multiSave(Map<String, String> source) {
            template.executePipelined((RedisCallback<Object>) connection -> {
                // 这里逻辑简单不会抛异常
                // 否则需要加上try...catch...finally防止链接未正常关闭 造成泄漏
                connection.openPipeline();
                for (Map.Entry<String, String> item : source.entrySet()) {
                    // hset zset都是可以用的，但是要序列化
                    connection.set(RedisSerializer.string().serialize(item.getKey()),
                            RedisSerializer.string().serialize(item.getValue()));
                    // 设置过期时间 10天
                    connection.expire(RedisSerializer.string().serialize(item.getKey()), TimeUnit.DAYS.toSeconds(10));
                }
                connection.close();
                // executePipelined源码要求RedisCallback必须返回null，否则抛异常
                return null;
            });
        }
    }
    

3.  multiSet  
    原生支持的批量操作，速度最快。  
    但是不灵活，使用范围较有限。比如hset支持一次多个插入，但是opsForHash()就没有multiSet，只有multiGet  
    也没有一起设置过期时间，仔细衡量业务场景后使用

    @Service
    public class RedisService {
       @Resource
       private RedisTemplate<String,Object> template;
       
       public void multiSave(Map<String,String> source) {
           template.opsForValue().multiSet(source);
       }
    }
    

4\. 总结对比
--------

这里就用别人的测试结果吧，公司内网开发，上面代码都是手打；若有错漏请不吝指教

10万次插入的情况下

> 普通set消耗9010毫秒  
> 管道set消耗1606毫秒  
> 批量set消耗18毫秒

性能测试来源：[https://blog.csdn.net/weixin\_41677422/article/details/108626587](https://blog.csdn.net/weixin_41677422/article/details/108626587)