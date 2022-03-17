---
layout: post
title: "Django基础四之测试环境和ORM查询"
date: "2022-03-17T21:15:15.224Z"
---
Django基础四之测试环境和ORM查询
====================

Django基础四之测试环境和ORM查询
====================

目录

*   [Django基础四之测试环境和ORM查询](#django基础四之测试环境和orm查询)
    *   [1\. 搭建测试环境](#1-搭建测试环境)
        *   [1.1 测试环境搭建方法:](#11-测试环境搭建方法)
        *   [1.2 使用测试环境对数据库进行CURD](#12-使用测试环境对数据库进行curd)
        *   [1.3 返回QuerySet对象的方法](#13-返回queryset对象的方法)
        *   [1.4 返回具体对象的方法](#14-返回具体对象的方法)
        *   [1.5 返回布尔值的方法](#15-返回布尔值的方法)
        *   [1.6 返回数字的方法](#16-返回数字的方法)
        *   [1.7 范围查找(双下划线查询)](#17-范围查找双下划线查询)
        *   [1.8 外键字段操作](#18-外键字段操作)
    *   [2\. 跨表查询](#2-跨表查询)
        *   [2.1 正向查询和反向查询](#21-正向查询和反向查询)
        *   [2.2 基于对于的跨表查询(子查询)](#22-基于对于的跨表查询子查询)
        *   [2.3 双下划线跨表查询(连表查询)](#23-双下划线跨表查询连表查询)
    *   [3\. 聚合查询](#3-聚合查询)
    *   [4\. F查询和Q查询](#4-f查询和q查询)
        *   [4.1 F查询](#41-f查询)
        *   [4.2 Q查询](#42-q查询)
        *   [4.3 查看原生SQL](#43-查看原生sql)
    *   [5\. 聚合分组](#5-聚合分组)
    *   [6\. 事务](#6-事务)
    *   [7\. choices参数](#7-choices参数)
    *   [8\. 常用字段](#8-常用字段)
        *   [8.1 常用字段](#81-常用字段)
        *   [8.2 ORM与MySQL中对应关系](#82-orm与mysql中对应关系)
        *   [8.3 关系字段](#83-关系字段)
            *   [8.3.1 ForeignKey](#831-foreignkey)
            *   [8.3.2 OneToOneField](#832-onetoonefield)
            *   [8.3.3 ManyToManyField](#833-manytomanyfield)
    *   [9\. 多对多关系中第三张表的创建方式](#9-多对多关系中第三张表的创建方式)
        *   [9.1 自行创建第三张表](#91-自行创建第三张表)
        *   [9.2 通过ManyToManyField自动创建第三张表](#92-通过manytomanyfield自动创建第三张表)
        *   [9.3 设置ManyTomanyField并指定自行创建的第三张表](#93-设置manytomanyfield并指定自行创建的第三张表)
    *   [10\. META](#10-meta)
    *   [11\. ORM中执行原生SQL](#11-orm中执行原生sql)
        *   [11.1 使用`.raw()`执行原生SQL](#111-使用raw执行原生sql)
        *   [11.2 执行自定义 SQL](#112-执行自定义-sql)

1\. 搭建测试环境
----------

`Django`是一个整体，不能单独测试某一个`.py`文件，要想测试需要搭建测试环境。

### 1.1 测试环境搭建方法:

    方法一：
    在项目里创建一个py文件，名字随意起。在这个py文件里写：
    """
    从manage.py里拷出来前四行有非注释的代码。
    import os
    import sys
    
    def main():
        """Run administrative tasks."""
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'day05templates.settings')
    	# 然后增加两行固定代码：
    	import  django
        django.setup()
        # 下面是自己写的测试代码：
       	from templateByValue import models
        res=models.Books.objects.all()
        print(res)
    
    
    if __name__ == '__main__':
        main()
    """
    方法二:
        使用pycharm
        pycharm ---> python Console
    

### 1.2 使用测试环境对数据库进行CURD

**使用ORM向表插入数据时，一定要先插入没有主键的表，否则会报错。如果一定要先操作有主键的表，则要在`settings.py`里面的`DATABASES`增加取消主键检查的操作**

    DATABASES = {
        'default': {
            'ENGINE'--->'django.db.backends.mysql',
            'NAME'--->'orm',
            'USER'--->'root',
            'PASSWORD'--->'123456',
            'HOST'--->'192.168.1.109',
            'PORT'--->'3306',
            'OPTIONS':{ 
            "init_command":"SET foreign_key_checks = 0;",  # 取消主键检查
            },
        }
    }
    

测试环境:

    test.py:   
    import os
    import sys
    
    
    def main():
        """Run administrative tasks."""
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'day06Library.settings')
        import  django
        django.setup()
        from lib01 import models
        """1. 增加一条数据"""
    	res = models.Book.objects.create(title='平凡的世界',price=30.9)
        """create 返回值是当前创建的数据对象"""
        print(res)
        """2. 查询全部""" 
        res = models.Book.objects.all()
        """.query能打印出来对应的SQL语句"""
        print(res.query)
        """使用filter查询如果没有条件也是打印全部 """
        res = models.Book.objects.filter()
       	"""2.1  filter()过滤，返回一个query对象(filter里面可以设置多个参数，是AND的关系) """
        res = models.Book.objects.filter(id=1)
        """ .get和.filter()一样"""
        res = models.Book.objects.get(title='平凡的世界')
        """但是get如果没找到，则会报错"""
        print(type(gres))
        lib01.models.DoesNotExist: Book matching query does not exist.
        """"3. 修改"""
        """Pk能够自动查找 到当前表的主键字段，我们不需要查看当表主键字段名""" 
        models.Book.objects.filter(pk=1).update(price=39) 
    	"""4. 删除"""
        models.Book.objects.filter(pk=1).delete()
        
        """5 first和last"""
        # 拿第一个
            res = models.Book.objects.all().first()  
        print(res)
        # 拿最后一个
        res = models.Book.objects.all().last()
        print(res)
        # 还支持切片
        res = models.Book.objects.all().first()[0]  
        """6. 只取指定的字段"""
            res = models.Book.objects.all().values('title')
        print(res)  # 只取title字段 
        # all()其实可加可不加。
            res = models.Book.objects.all().values_list('title')
        """values_list获取的结果，类似于列表套元组"""
        
        """
        order_by排序： 默认是升序，降序是加个减号(-)
        """
            res = models.Book.objects.order_by('price')# 升序
            res = models.Book.objects.order_by('-price')#降序
        
        """count()计数"""
        	res = models.Book.objects.count()
        """distinct()去重
        去重的前提是数据必须是一模一样，一定不能忽略主键
        """
        	res = models.Book.objects.values('title').distinct()
        """ exclude() 排除"""
        	res = models.Book.objects.exclude(title='平凡的世界')
        '''reverse() 反转
        	reverse需要先排序之后再反转
        '''
        	 res = models.Book.objects.order_by('price').reverse()
        """exists() query包含数据返回True,否则返回False"""
        
    if __name__ == '__main__':
        main()
    

### 1.3 返回QuerySet对象的方法

> all()
> 
> filter()
> 
> exclude()
> 
> order\_by()
> 
> reverse()
> 
> distinct()

\*\*特殊的QuerySet \*\*

> values() 返回可迭代的字典序列
> 
> values\_list() 返回可迭代的元组序列

### 1.4 返回具体对象的方法

> get()
> 
> first()
> 
> last()

### 1.5 返回布尔值的方法

> exists()

### 1.6 返回数字的方法

> count()

### 1.7 范围查找(双下划线查询)

    1. 价格大于30的书籍：
    res = models.Book.objects.filter(price__gt=30)
    __gt 大于
    
    2. 价格小于30的书籍：
    res = models.Book.objects.filter(price__lt=30)
    __lt小于
    
    3. 价格大于等于30的书籍：
    res = models.Book.objects.filter(price__gte=30)
    __gte 大于等于
    4. 价格小于等于30的书籍：
    res = models.Book.objects.filter(price__lte=30)
    __lte小于等于
    
    5, 价格要么是10元，要么是20，要么是30的
    res = models.Book.objects.filter(price__in=[10,20,30])
    """
    Python时面的数字类型精确度不高，很多时候会使用字符串存储数字类型，特别是小数，用的时候再从字符串转成小数
    """
    6, 价格在10元到30元之间的
    res = models.Book.objects.filter(price__range=(10,30))
    
    7, 查询书名包含字母a的书籍
    res = models.Book.objects.filter(title__contains='a')
    # 上面是区分大小写，如果忽略大小写：
    res = models.Book.objects.filter(title__icontains='a')
    
    8, 以什么开头， 结尾：
    # 开头:
    res = models.Book.objects.filter(title__startswith='a')
    # 结尾:
    res = models.Book.objects.filter(title__endswith='a')
    
    9， 查询出版日期是2000年的书籍：
    res = models.Book.objects.filter(publish_time__year=2000)
    10， 查询出版日期是8月的书籍：
    res = models.Book.objects.filter(publish_time__month=8)
    
    

### 1.8 外键字段操作

    外键字段
    # 直接传主键值
    """
    models.Book.objects.create(title='聊斋',price=666.98,publish_id=1)
    models.Book.objects.create(title='聊斋志异2',price=666.98,publish_id=2)
    """
    # 传数据对象
    """
    publish_obj = models.Publish.objects.filter(pk=1).first()
    models.Book.objects.create(title='神雕侠侣', price=234.56, publish=publish_obj)
    
    models.Book.objects.filter(pk=1).update(publish_id=2)
    
    models.Book.objects.filter(pk=3).update(publish=publish_obj)
    """
    
    多对多外键字段
    # 增
    """
    book_obj = models.Book.objects.filter(pk=1).first()
    # 主键值
    book_obj.authors.add(1)  # 去第三张关系表中 与作者主键为1的绑定关系
    # 作者对象
    author_obj = models.Author.objects.filter(pk=2).first()
    book_obj.authors.add(author_obj)
    # 括号内支持传多个参数
    book_obj.authors.add(1,2)
    author_obj1 = models.Author.objects.filter(pk=1).first()
    author_obj2 = models.Author.objects.filter(pk=2).first()
    
    book_obj.authors.add(author_obj1,author_obj2)
    
    
    # 改
    book_obj.authors.set([1,])
    book_obj.authors.set((1,2))
    book_obj.authors.set([author_obj1, ])
    
    book_obj.authors.set([author_obj1,author_obj2 ])
    
    
    # 删
    book_obj.authors.remove(1)
    book_obj.authors.remove(1,2)
    book_obj.authors.remove(author_obj1,author_obj2)
    
    # 清空
    book_obj.authors.clear()  # 去第三张关系表中删除所有改书籍对应的记录
    """
        
    

**总结:**

>     add()
>     remove()
>     括号内既可以传数字也可以传对象  逗号隔开即可
>     set()
>     括号内必须传递可迭代对象  可迭代对象内既可以传数字也可以传对象 支持多个
>     clear()
>     清空操作  无需传值
>     

2\. 跨表查询
--------

### 2.1 正向查询和反向查询

>     正向查询:
>     外键字段在谁哪，谁查另外的表就是正向
>     例如: 书 表和出版社表，外键在书表上，要查一本书对应的出版社就是正向查询
>     反正查询:
>     表中没有外键，它要去查是反向
>     例如： 作者表和作者详情表，作者表中只有id和作者姓名，作者详情表里有作者的电话，地址等。作者表中有外键。用作者的电话查对应的作者就是反射查询
>     
>     
>     查询技巧:
>     正向查询按外键字段
>     反向查询按表名小写加_set(如何出现:应用名.表名.None 则再加.all())
>     
>     先查询出一个对象，然后基于对象再去找
>     

### 2.2 基于对于的跨表查询(子查询)

    正向查询：
    
    1.查询《三重门》书籍对应的出版社名称
        book_obj = models.Book.objects.filter(b_name='三重门').first().publish
        res = book_obj.publish.p_name
        print(res)
    2.查询《三重门》对应的作者
    	book_obj = models.Book.objects.filter(b_name='三重门').first()
        res = book_obj.authors.first()
        print(res.a_name)
    
    3.查询余华的地址
        author_obj = models.Author.objects.filter(a_name='余华').first()
        res = author_obj.authorDetail.a_address
        print(res)
    
    # 反向查询：
    4.查询作家出版社出版过的书籍
        publish_obj = models.Publish.objects.filter(p_name='作家出版社').first()
        res = publish_obj.book_set.all()
        print(res)
    5.查询莫言写过的书
        author_obj = models.Author.objects.filter(a_name='莫言').first()
        res = author_obj.book_set.all()
        print(res)
    6.查询电话是0536123456的作者姓名
        author_obj = models.AuthorDetail.objects.filter(a_phone='0536123456').first()
        res = author_obj.author.a_name
        print(res)
    

### 2.3 双下划线跨表查询(连表查询)

    正向查询：
    
    1.查询《十三步书籍》对应的出版社名称
        res=models.Book.objects.filter(b_name='十三步').values('publish__p_name')
        print(res)
    
    2.查询《活着》对应的作者和年龄
        res = models.Book.objects.filter(b_name='活着').values('authors__a_name','authors__a_age')
        print(res)
    3.查询韩寒的地址
        res = models.Author.objects.filter(a_name='韩寒').values("authorDetail__a_address")
        print(res)
        
    正向查询：
    4.查询《许三观卖血记》书籍对应的出版社名称(不用model.BOOK)
        res = models.Publish.objects.filter(book__b_name='许三观卖血记').values("p_name")
        print(res)
    5.查询《红高粱家族》对应的作者和年龄(不用model.BOOK)
    	res = models.Author.objects.filter(book__b_name='红高粱家族').values('a_name','a_age')
        print(res)
    6.查询莫言的地址(不用作者表)
        res = models.AuthorDetail.objects.filter(author__a_name='莫言').values("a_address")
        print(res)
    7.查询《像少年啦飞驰》对应的作者的电话和地址
        res = models.Author.objects.filter(book__b_name='像少年啦飞驰').values('authorDetail__a_address','authorDetail__a_phone')
        print(res)
        
    
    8. 查询价格为 50,25.5,或19.9的所有书籍和出版社名称 res=models.Book.objects.filter(b_price__in=(50,25.5,19.9)).values('b_name','publish__p_name')
    print(res)
    
    9. 查询"作家出版社"出版的图书按价格从高到低排序
    res = models.Publish.objects.filter(p_name='作家出版社').values('book__b_name', 'book__b_price').order_by('-book__b_price')
        print(res)
    

3\. 聚合查询
--------

聚合函数

>     sum()
>     max()
>     min()
>     count()
>     avg()
>     

聚合函数的使用

    1. 计算全部图书的平均价格
    
    	from django.db.models import Sum, Max, Min, Avg, Count
        res = models.Book.objects.all().aggregate(Avg('b_price'))
        print(res)
        
    2. 全部图书中价格最高的：
    	from django.db.models import Sum, Max, Min, Avg, Count
        res = models.Book.objects.all().aggregate(Max('b_price'))
        print(res)
        
    3. 全部图书中价格总价格：
    	from django.db.models import Sum, Max, Min, Avg, Count
    	res = models.Book.objects.all().aggregate(Sum('b_price'))
        print(res)
        
    3. 全部图书中价格最低的：
    	from django.db.models import Sum, Max, Min, Avg, Count
        res = models.Book.objects.all().aggregate(Min('b_price'))
        print(res)
        
    4.  全部图书的数量：
    	from django.db.models import Sum, Max, Min, Avg, Count
        res = models.Book.objects.all().aggregate(Count('b_price'))
        print(res)
        
    5. 韩寒出版图书的总价格：
    	from django.db.models import Sum, Max, Min, Avg, Count
        res = models.Author.objects.filter(a_name='韩寒').values('book__b_price').aggregate(Sum('book__b_price'))
        print(res)
        
    6.作家出版社中出版的价格最高的图书
    	from django.db.models import Sum, Max, Min, Avg, Count
        res = models.Publish.objects.filter(p_name='作家出版社').values('book__b_name').aggregate(Max('book__b_price'))
        print(res)
    
    7. 聚合函数结果重命名：
        res = models.Book.objects.all().aggregate(boo_sum = Sum('b_price'))
        print(res)
        
    也可以把多个聚合函数放在一起:
    计算图书的总价格和平均价格 
        res = models.Book.objects.all().aggregate(boo_sum = Sum('b_price'),book_avg =Avg('b_price'))
        print(res)
    

4\. F查询和Q查询
-----------

### 4.1 F查询

`F`查询就是取出某个字段对应的值

    # 找出阅读书比评论数高的书籍
    from django.db.models import F
    res = models.Book.objects.filter(read_number__gt=F('commit_number'))
    print(res)
        
    # 给每本书的价格都加1元
    from django.db.models import F
    res = models.Book.objects.all().update(b_price=F("b_price")+1)
    print(res)
    

### 4.2 Q查询

`Q查询`就是构造出 `与&`、`或|`、`非~`

默认情况下在`filter()`里面的关系为`and 与`的关系，要想表示`或和非`就要用`Q查询`。

    # 查询书名为<活着>或价格大于40的书籍
    from django.db.models import Q
    res = models.Book.objects.filter(Q(b_name='活着')|Q(b_price__gt=40))
    print(res)
    
    # 查询书名不是<活着>的书籍
    from django.db.models import Q
    res=models.Book.objects.filter(~Q(b_name='活着'))
    print(res)
    

### 4.3 查看原生SQL

    1. Queryset对象.query()
    2. 在settings.py里面配置日志打印：
    settings.py:
        
    LOGGING = {
        'version': 1,
        'disable_existing_loggers': False,
        'handlers': {
            'console':{
                'level':'DEBUG',
                'class':'logging.StreamHandler',
            },
        },
        'loggers': {
            'django.db.backends': {
                'handlers': ['console'],
                'propagate': True,
                'level':'DEBUG',
            },
        }
    }
    

5\. 聚合分组
--------

    1. 查询每个出版社id,以及它所出版书的平均价格:
    原生SQL：
    SELECT publish_id,AVG(b_price) from lib01_book GROUP BY publish_id;
        
    ORM实现：
    """
    annotate()内写聚合函数
    values 在前，表示 group by 的字段
    values 在后，表示取字段
    filter 在前， 表示 where条件
    filter 在后，表示having
    
    
    from django.db.models import Sum, Max, Min, Avg, Count
    res = models.Book.objects.all().values('publish_id').annotate(price_avg = Avg('b_price')).values('publish_id','price_avg')
    print(res.query)
    """
    
    2. 查询出版社id大于1的出版社ID，以及所出书的平均价格
    原生SQL：
    """
     select publish_id, avg(b_price) from lib01_book where publish_id >1  GROUP BY publish_id;
    
    """ 
    ORM实现：
    """
    from django.db.models import Sum, Max, Min, Avg, Count   res=models.Book.objects.filter(publish_id__gt=1).values('publish_id').annotate(price_avg=Avg('b_price')).values('publish_id', 'price_avg')
    print(res)
    """
    3. 查询出版社id大于1的出版社ID，以及所出书的平均价格大于30的
    原生SQL：
    """
    select publish_id, avg(b_price) as price_avg from lib01_book where publish_id >1  GROUP BY publish_id having price_avg>30 ;
    """
    ORM实现：
    """
    from django.db.models import Sum, Max, Min, Avg, Count    res=models.Book.objects.filter(publish_id__gt=1).values('publish_id').annotate(price_avg=Avg('b_price')).filter(price_avg__gt=30).values('publish_id', 'price_avg')
        print(res)
    """
    
    4，查询每个出版社的名字和出版的书籍数量
    原生SQL:
        """
        select p_name, count(b.b_name) from lib01_publish p, lib01_book b  where p.id=b.publish_id group by p.id ; 
        """
    ORM:
        """
        联表操作最后以group by的表作为基表
    
    from django.db.models import Sum, Max, Min, Avg, Count   
    res = models.Publish.objects.values('id').annotate(num=Count('book__id')).values('p_name','num')
    print(res.query)
        
        
    如果基表是group by的表，可以不写values
    models.Publish.objects.annotate(num=Count('book__id')).values('p_name','num')
    """
    5. 查询每个作者出版过书籍的最高价格,打印作者名和最高价格
    原生SQL:
        """
        select a.a_name, max(b.b_price) from lib01_author a, lib01_book b, lib01_book_authors ba where b.id=ba.book_id and a.id = ba.author_id group by a.a_name;
        """
    ORM:
        """
        from django.db.models import Sum, Max, Min, Avg, Count 
        res = models.Author.objects.annotate(price_max=Max('book__b_price')).values('a_name', 'price_max')
        print(res)
        
        
        """
    6. 查询每个书籍的名称，以及对应的作者个数
    原生SQL:
        """
         select a.b_name, count(b.a_name) from lib01_book a,  lib01_author b, lib01_book_authors c where a.id=c.book_id and b.id= c.author_id  group by a.b_name;
        """
        
    ORM:
        """
    from django.db.models import Sum, Max, Min, Avg, Count  res=models.Book.objects.values('b_name').annotate(author_count=Count('authors__id')).values('b_name', 'author_count')
    print(res)
    
        """
    7. 统计价格大于25书籍和作者
    原生SQL:
    """
    select a.b_name, c.a_name from lib01_book a  inner join lib01_book_authors b on a.id=b.book_id   inner join lib01_author c on c.id=b.author_id where a.b_price >25;    
    """
    
    ORM：
    """
    res = models.Book.objects.filter(b_price__gt=25).values('b_name','authors__a_name')
    print(res.query)
    """
        
    

6\. 事务
------

Django 默认的事务行为是自动提交。

    测试test.py:
        
    import os
    
    def main():
        """Run administrative tasks."""
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'day06Library.settings')
        import  django
        django.setup()
        from lib01 import models
        
        res = models.Book.objects.filter(pk=3).first()
        print(res.b_name, res.b_price)
        from django.db import transaction
        try:
            with transaction.atomic():  # 开启事务
                models.Book.objects.filter(pk=3).update(b_price=50)
                res = models.Book.objects.filter(pk=3).first()
                print(res.b_name, res.b_price)
                raise Exception("Error")  
                # 其实如果开启了事务，那么只要报错这个事务就会回滚，使用try....except只是不让程序报错退出
        except Exception as e:
            print("回滚")
            transaction.rollback()  # 事务回滚
            print("回滚成功")
            
        res = models.Book.objects.filter(pk=3).first()
        print(res.b_name, res.b_price)
        
    if __name__ == '__main__':
        main()
        
    开启事务：
    使用装饰器
    from django.db import transaction
    
    @transaction.atomic
    def viewfunc(request):
        # This code executes inside a transaction.
        do_stuff()
    使用上下文件管理
    from django.db import transaction
    
    def viewfunc(request):
        # This code executes in autocommit mode (Django's default).
        do_stuff()
    
        with transaction.atomic():
            # This code executes inside a transaction.
            do_more_stuff()
    

[`Django`事务详情](https://docs.djangoproject.com/zh-hans/3.2/topics/db/transactions/)

7\. choices参数
-------------

    例如一张表要存储学生成绩，'A'为'优秀'，'B'为'良好','C'为'及格','D'为'不及格'，如果查询为A则打印优秀，查询D打印不及格。
    方法一:
        查询出来后自己写代码判断输出。】
    方法二:
        1. 在数据库里创建表时使用choices参数
       	models.py创建表：
        
        class Score(models.Model):
        score_choices = (
            ('A', '优秀'),
            ('B', '良好'),
            ('C', '及格'),
            ('D', '不及格'),
        )
    
        name = models.CharField(max_length=128)
        score = models.CharField(max_length=12,choices=score_choices)
        
        2.插入数据
        3.查询：
            res = models.Score.objects.filter(pk=1).first()
        	print(res.name, res.score)
            # 结果为： Z A
            
            res = models.Score.objects.filter(pk=1).first()
            print(res.name, res.get_score_display())
        	# 结果为: Z 优秀
           
    

**总结:**

> 1.传值:
> 
>     对于choices参数，数据类型该怎么选？
>     判断依据是：小元组里面第一个参数的数据类型
>     
> 
> 2.取值:
> 
>     固定语法结构取值：get_字段名_display()
>     如果查询出来的数据不再choices范围内，会显示原始数据。
>     

8\. 常用字段
--------

### 8.1 常用字段

    AutoField(Field)
    	int自增列，必须填入参数 primary_key=True
    BigAutoField(AutoField)
    	bigint自增列，必须填入参数 primary_key=True
    当model中如果没有自增列，则自动会创建一个列名为id的列
    
    IntegerField
    	一个整数类型(有符号的),范围在 -2147483648 to 2147483647。
            
    SmallIntegerField(IntegerField):
    	小整数 -32768 ～ 32767
    
    PositiveSmallIntegerField(PositiveIntegerRelDbTypeMixin, IntegerField)
    	正小整数 0 ～ 32767
    
    PositiveIntegerField(PositiveIntegerRelDbTypeMixin, IntegerField)
    - 正整数 0 ～ 2147483647
    
    BigIntegerField(IntegerField):
    	长整型(有符号的) -9223372036854775808 ～ 9223372036854775807
    
    BooleanField(Field)
    	布尔值类型
    
    NullBooleanField(Field):
    	可以为空的布尔值
    
    CharField(Field)
    	字符类型
    	必须提供max_length参数， max_length表示字符长度
    
    TextField(Field)
    	文本类型
    
    EmailField(CharField)：
    	字符串类型(Email)，Django Admin以及ModelForm中提供验证机制
    
    IPAddressField(Field)
    	字符串类型，Django Admin以及ModelForm中提供验证 IPV4 机制
    
    GenericIPAddressField(Field)
    	字符串类型，Django Admin以及ModelForm中提供验证 Ipv4和Ipv6
    	参数：
            protocol，用于指定Ipv4或Ipv6， 'both',"ipv4","ipv6"
            unpack_ipv4， 如果指定为True，则输入::ffff:192.0.2.1时候，可解析为192.0.2.1，开启此功能，需要protocol="both"
    
    URLField(CharField)
    	字符串类型，Django Admin以及ModelForm中提供验证 URL
    
    SlugField(CharField)
    	字符串类型，Django Admin以及ModelForm中提供验证支持 字母、数字、下划线、连接符（减号）
    
    CommaSeparatedIntegerField(CharField)
    	字符串类型，格式必须为逗号分割的数字
    
    UUIDField(Field)
    	字符串类型，Django Admin以及ModelForm中提供对UUID格式的验证
    
    FilePathField(Field)
    	字符串，Django Admin以及ModelForm中提供读取文件夹下文件的功能
    	参数：
            path,                      文件夹路径
            match=None,                正则匹配
            recursive=False,           递归下面的文件夹
            allow_files=True,          允许文件
            allow_folders=False,       允许文件夹
    
    FileField(Field)
    	字符串，路径保存在数据库，文件上传到指定目录
    	参数：
            upload_to = ""      上传文件的保存路径
            storage = None      存储组件，默认django.core.files.storage.FileSystemStorage
    
    ImageField(FileField)
    	字符串，路径保存在数据库，文件上传到指定目录
    	参数：
            upload_to = ""      上传文件的保存路径
            storage = None      存储组件，默认django.core.files.storage.FileSystemStorage
            width_field=None,   上传图片的高度保存的数据库字段名（字符串）
            height_field=None   上传图片的宽度保存的数据库字段名（字符串）
    
    DurationField(Field)
    	长整数，时间间隔，数据库中按照bigint存储，ORM中获取的值为datetime.timedelta类型
    
    FloatField(Field)
    	浮点型
    
    DecimalField(Field)
    	10进制小数
    	参数：
            max_digits，小数总长度
            decimal_places，小数位长度
    
    BinaryField(Field)
    	二进制类型
    
    DateField
    	日期字段，日期格式 YYYY-MM-DD，相当于Python中的datetime.date()实例。
    DateTimeField
    	日期时间字段，格式 YYYY-MM-DD HH:MM[:ss[.uuuuuu]][TZ]，相当于Python中的datetime.datetime()实例
    

### 8.2 ORM与MySQL中对应关系

    'AutoField'		--->	'integer AUTO_INCREMENT',
    'BigAutoField'	--->	'bigint AUTO_INCREMENT',
    'BinaryField'	--->	'longblob',
    'BooleanField'	--->	'bool',
    'CharField'		--->	'varchar(%(max_length)s)',
    'CommaSeparatedIntegerField'--->'varchar(%(max_length)s)',
    'DateField'		--->	'date',
    'DateTimeField'	--->	'datetime',
    'DecimalField'	--->	'numeric(%(max_digits)s, %(decimal_places)s)',
    'DurationField'	--->	'bigint',
    'FileField'		--->	'varchar(%(max_length)s)',
    'FilePathField'	--->	'varchar(%(max_length)s)',
    'FloatField'	--->	'double precision',
    'IntegerField'	--->	'integer',
    'BigIntegerField'--->'bigint',
    'IPAddressField'--->	'char(15)',
    'GenericIPAddressField'--->'char(39)',
    'NullBooleanField'--->	'bool',
    'OneToOneField'	--->		'integer',
    'PositiveIntegerField'--->	'integer UNSIGNED',
    'PositiveSmallIntegerField'--->	'smallint UNSIGNED',
    'SlugField'		--->			'varchar(%(max_length)s)',
    'SmallIntegerField'--->	'smallint',
    'TextField'		--->	'longtext',
    'TimeField'		--->	'time',
    'UUIDField'		--->	'char(32)',
    

### 8.3 关系字段

#### 8.3.1 ForeignKey

    外键类型在ORM中用来表示外键关联关系，一般把ForeignKey字段设置在 ‘一对多’中’多’的一方。
    
    ForeignKey可以和其他表做关联关系同时也可以和自身做关联关系。
    
    to 设置要关联的表
    to_field 设置要关联的表的字段
    related_name 反向操作时，使用的字段名，用于代替原反向查询时的’表名_set’。
    
    例如要查某个作者写了哪些书:
        models.Author.objects.filter(name='xx').book_set.all()
        
    当在ForeignKey字段中添加了参数 related_name 后，
    class Book(models.Model):
        name = models.CharField(max_length=32)
        Author = models.ForeignKey(to="author", related_name="book_author")
        
    再查某个作者的书籍是:
        models.Author.objects.filter(name='xx').book__author.all()
        
    related_query_name	反向查询操作时，使用的连接前缀，用于替换表名。
    
    on_delete 当删除关联表中的数据时，当前表与其关联的行的行为。(1.x版本中不用写，2.x 3.x版本必须指定)
    """
    	models.CASCADE
    　　删除关联数据，与之关联也删除
    
    　　models.DO_NOTHING
    　　删除关联数据,什么都不做
    
    　　models.PROTECT
    　　删除关联数据，引发错误ProtectedError
    
    　　models.SET_NULL
    　　删除关联数据，与之关联的值设置为null（前提FK字段需要设置为可空）
    
    　　models.SET_DEFAULT
    　　删除关联数据，与之关联的值设置为默认值（前提FK字段需要设置默认值）
    
    　　models.SET
    
    　　删除关联数据，
    　　a. 与之关联的值设置为指定值，设置：models.SET(值)
    　　b. 与之关联的值设置为可执行对象的返回值，设置：models.SET(可执行对象)
    """
    db_constraint	是否在数据库中创建外键约束，默认为True。
    

#### 8.3.2 OneToOneField

    一对一字段。
    一对一的关联关系多用在当一张表的不同字段查询频次差距过大的情况下，将本可以存储在一张表的字段拆开放置在两张表中，然后将两张表建立一对一的关联关系。例如作者表和作者详情表。
    
    
    to	设置要关联的表。
    
    to_field	设置要关联的字段。
    
    on_delete	同ForeignKey字段。
    
    

#### 8.3.3 ManyToManyField

    用于表示多对多的关联关系。在数据库中通过第三张表来建立关联关系
    
    to	设置要关联的表
    
    related_name	同ForeignKey字段。
    
    related_query_name	同ForeignKey字段。
    
    symmetrical	仅用于多对多自关联时，指定内部是否创建反向操作的字段。默认为True。
    
    through 在使用ManyToManyField字段时，Django将自动生成一张表来管理多对多的关联关系。
    但我们也可以手动创建第三张表来管理多对多关系，此时就需要通过through来指定第三张表的表名。
    
    through_fields	设置关联的字段。
    
    db_table	默认创建第三张表时，数据库中表的名称。
    

9\. 多对多关系中第三张表的创建方式
-------------------

### 9.1 自行创建第三张表

    class Book(models.Model):
        title = models.CharField(max_length=32, verbose_name="书名")
    
    
    class Author(models.Model):
        name = models.CharField(max_length=32, verbose_name="作者姓名")
    
    
    # 自己创建第三张表，分别通过外键关联书和作者
    class Book2Author(models.Model):
        book = models.ForeignKey(to="Book")
        author = models.ForeignKey(to="Author")
    
        class Meta:
            unique_together = ("book","author" )
    

### 9.2 通过ManyToManyField自动创建第三张表

    之前一直使用的方法
    class Book(models.Model):
        title = models.CharField(max_length=32, verbose_name="书名")
    	Authors = models.ManyToManyField(to="Author", related_name="book2authors")
    
    # 通过ORM自带的ManyToManyField自动创建第三张表
    class Author(models.Model):
        name = models.CharField(max_length=32, verbose_name="作者姓名")
        
    

### 9.3 设置ManyTomanyField并指定自行创建的第三张表

    # 自己创建第三张表，并通过ManyToManyField指定关联
    class Book(models.Model):
        title = models.CharField(max_length=32, verbose_name="书名")
    	
        authors = models.ManyToManyField(to="Author", through="Book2Author", through_fields=("book", "author"))
        
        # through_fields接受一个2元组（'field1'，'field2'）：
        # 其中field1是定义ManyToManyField的模型外键的名（book），field2是关联目标模型（author）的外键名。
    
    
    class Author(models.Model):
        name = models.CharField(max_length=32, verbose_name="作者姓名")
    
    
    class Book2Author(models.Model):
        book = models.ForeignKey(to="Book")
        author = models.ForeignKey(to="Author")
        
    
        class Meta:
            unique_together = ("book","author" )
    

**注意：**

当我们需要在第三张关系表中存储额外的字段时，就要使用第三种方式。

但是当我们使用第三种方式创建多对多关联关系时，就无法使用set、add、remove、clear方法来管理多对多的关系了，需要通过第三张表的model来管理多对多关系。

10\. META
---------

`ORM`对应的类里面包含另一个`Meta`类，而`Meta`类封装了一些数据库的信息

    字段
    db_table
    	ORM在数据库中的表名默认是 app_类名，可以通过db_table可以重写表名。
        例如:
        class book(models.Model):
        	title = models.CharField(max_length=32)
            class Meta:
                db_table = "自己设置表名"
    
    index_together
    	联合索引。
    
    unique_together
    	联合唯一索引。
    
    ordering
    	指定默认按什么字段排序。只有设置了该属性，查询到的结果才可以被reverse()。
        
    # 后台管理admin中显示的表名称
     verbose_name='自己设置'
    
    

11\. ORM中执行原生SQL
----------------

`Django` 允许你用两种方式执行原生 `SQL` 查询：你可以使用 `.raw()` 来 执行原生查询并返回模型实例，或者完全不用模型层 直接执行自定义 SQL。

### 11.1 使用`.raw()`执行原生SQL

    res = models.Book.objects.raw('select * from lib01_book')
    print(res)
    for i in res:
        print(i.b_name,i.b_price)
        
    # 结果：
    <RawQuerySet: select * from lib01_book>
    红高粱家族 25.50
    十三步 50.00
    三重门 25.00
    像少年啦飞驰 19.90
    活着 29.50
    许三观卖血记 28.20
    
    
    # 将参数传给 raw()
    可以使用 raw() 的 params 参数:
    bookName="三重门"
    res=models.Book.objects.raw('select * from lib01_book where b_name = %s', [bookName])
    for i in res:
        print(i.b_name,i.b_price)
        
    # 结果：
    三重门 25.00
    
    params 是一个参数字典。你将用一个列表替换查询字符串中 %s 占位符，或用字典替换 %(key)s 占位符（key 被字典 key 替换），不论你使用哪个数据库引擎。这些占位符会被 params 参数的值替换。
    

### 11.2 执行自定义 SQL

当`.raw()`无法满足需求：你可能要执行不明确映射至模型的查询语句，或者就是直接执行 `UPDATE`， `INSERT` 或 `DELETE` 语句。可以直接访问数据库，完全绕过模型层。

对象 `django.db.connection` 代表默认数据库连接。要使用这个数据库连接，调用 `connection.cursor()` 来获取一个指针对象。然后，调用 `cursor.execute(sql, [params])` 来执行该 SQL 和 `cursor.fetchone()`，或 `cursor.fetchall()` 获取结果数据。

    from django.db import connection
    with connection.cursor() as cursor:
    	cursor.execute("SELECT b_name, b_price FROM lib01_book WHERE b_name = %s", ["三重门"])
        row = cursor.fetchone()
        print(row)
        
    若你同时使用 不止一个数据库，你可以使用 django.db.connections 获取指定数据库的连接（和指针）。 django.db.connections 是一个类字典对象，它允许你通过连接别名获取指定连接:
        with connections['my_db_alias'].cursor() as cursor:
            
    示例:
        
    from django.db import connections
    
    
        with connections['user'].cursor() as cursor:
            cursor.execute("SELECT * FROM lib01_book")
            # row = cursor.fetchone()
            row = cursor.fetchall()
    
    connections['my_db_alias']  : 本例中使用'user',这是在settings.py中DATABASES中设置的