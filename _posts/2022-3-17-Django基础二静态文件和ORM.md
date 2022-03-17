---
layout: post
title: "Django基础二静态文件和ORM"
date: "2022-03-17T03:18:58.042Z"
---
Django基础二静态文件和ORM
=================

Django基础二静态文件和ORM
=================

目录

*   [Django基础二静态文件和ORM](#django基础二静态文件和orm)
    *   [1\. 静态文件](#1-静态文件)
        *   [1.1 静态文件基本配置:](#11-静态文件基本配置)
        *   [1.2 静态文件进阶配置](#12-静态文件进阶配置)
    *   [2\. request参数](#2-request参数)
    *   [3\. Django配置数据库](#3-django配置数据库)
    *   [4\. Django ORM](#4-django-orm)
        *   [4.1 创建表](#41-创建表)
        *   [4.2 增加字段](#42-增加字段)
        *   [4.3 修改字段:](#43-修改字段)
        *   [4.4 删除字段](#44-删除字段)
        *   [4.5 查询数据](#45-查询数据)
        *   [4.6 插入数据](#46-插入数据)
        *   [4.7 查看全部数据](#47-查看全部数据)
        *   [4.8 利用页面编辑数据库里数据](#48-利用页面编辑数据库里数据)
        *   [4.9 利用页面删除数据库里数据](#49-利用页面删除数据库里数据)
        *   [4.10 同步数据库](#410-同步数据库)
        *   [4.11 ORM创建外键](#411-orm创建外键)

1\. 静态文件
--------

写好后不会自动动态改变的文件资源，如`CSS`,`js`,图片，第三方框架文件等等都属于静态文件。默认我们会把静态文件都放在`static`目录下。这个目录在`Django`中是需要自己手动创建。

    直接创建到项目的根目录下即可。
    static:
        |___css  存放css文件
        |___img	 存放图片文件
        |___js	 存放javaScript文件
    

把目录创建后启动`Django`是无法访问的，会报404,因为没有对外暴露访问接口，还需要在`settings.py`里面配置。

### 1.1 静态文件基本配置:

    在项目同名目录下的settings.py文件
    在下面会看到：
    """
    # Static files (CSS, JavaScript, Images)
    # https://docs.djangoproject.com/en/3.2/howto/static-files/
    
    STATIC_URL = '/static/'   
    """
    在STATIC_URL下面加一行:
    """
        STATICFILES_DIRS = [
        	BASE_DIR / "static",
    	]
    """
    即可。
    而且里面可以加多个，如下：
    STATICFILES_DIRS = [
        BASE_DIR / "static",
        '/var/www/static/',
    ]
    
    然后在HTML文件里配置css,js等配置文件
    <head>
    <script src="/static/bootstrap-3.4.1-dist/js/jquery-3.6.0.min.js"></script>
        <link href="/static/bootstrap-3.4.1-dist/css/bootstrap.min.css" rel="stylesheet">
        <script src="/static/bootstrap-3.4.1-dist/js/bootstrap.min.js"></script>
    </head>
    

### 1.2 静态文件进阶配置

    STATIC_URL = '/static/'    # 接口前缀
    """
    有了这个接口前缀，如果要访问静态文件资源，必须要static开头。
    写了这个接口前缀之后，就拥有了访问STATICFILES_DIRS里面配置的目录内资源的权限。
    STATICFILES_DIRS = [
        BASE_DIR / "static",
        '/var/www/static/',
    ]
    访问顺序为自上而下查找，找到后就返回
    """
    
    

`STATIC_URL = '/static/'` 在书写的时候必须要以`static`开头，如果更改了`html`里面也需要修改，否则访问不到。

      <script src="/static/bootstrap-3.4.1-dist/js/jquery-3.6.0.min.js"></script>
        <link href="/static/bootstrap-3.4.1-dist/css/bootstrap.min.css" rel="stylesheet">
        <script src="/static/bootstrap-3.4.1-dist/js/bootstrap.min.js"></script>
    这里的static为接口前缀。
    

如果这里不想写成固定的，或者让它动态更新，这样不管\`\`STATIC\_URL = '/xxx/' \`写成什么都可以访问到这些静态文件。

方法:

    在HTML文件里：
    增加：
     {% load static %}
    <script src="{% static 'xx/yy/zz.js'%}"></script>
    
    示例:
    
        {% load static %}
        <script src="{% static 'bootstrap-3.4.1-dist/js/jquery-3.6.0.min.js'%}"></script>
        <link href="{% static 'bootstrap-3.4.1-dist/css/bootstrap.min.css' %}" rel="stylesheet">
        <script src="{% static 'bootstrap-3.4.1-dist/js/bootstrap.min.js' %}"></script>
        <img src="{% static 'my_app/example.jpg' %}" alt="My image">
        
        
    settings.py里配置:
        STATIC_URL = '/static/'  # 这时这里的static可以随意改名了
    
        STATICFILES_DIRS = [
            BASE_DIR / "static",
        ]
    

2\. request参数
-------------

在`views.py`文件里写的函数都要带一个`request`参数，这个具体是做什么的?

先写一个登录页面：

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
        <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <link href="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/3.4.1/css/bootstrap.min.css" rel="stylesheet">
        <script src="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/3.4.1/js/bootstrap.min.js"></script>
    </head>
    <body>
    <div class="container">
        <div class="row">
        <p class="text-center">登录</p>
        <div class="col-md-8 col-md-offset-2">
        <form action="" method="post">
            username:<input type="text" name="name" class="form-control">
            password:<input type="password" name="pwd" class="form-control">
            <input type="submit" value="提交" class="btn btn-success btn-block">
        </form>
        </div>
        </div>
    </div>
    
    </body>
    </html>
    
    
    # <form action="" method="">  action不写默认向自己这个页面提交，method不写得使用get方法提交。get方法提交就会把输入的内容直接显示在浏览器上。所以一般使用post方法提交。由于没写处理post的方法，所以这里会报错：
        
    Forbidden (403)
    
    CSRF verification failed. Request aborted.
    
    

![image](https://img2022.cnblogs.com/blog/723171/202203/723171-20220315221833799-1390725586.png)

临时解决方法:

    在settings.py里面找到MIDDLEWARE，然后把csrf相关的注释掉
    MIDDLEWARE = [
    	#'django.middleware.csrf.CsrfViewMiddleware',
    ]
    

现在访问这个页面不管是`get`请求还是`post`请求，都向这个页面提交，但是使用`get`请求的时候，拿到这个页面，使用`post`请求返回："OK,已提交"

    # view.py文件：
    
    from django.shortcuts import render
    def login(request):
        print(request.method)
        return render(request,'login.html')
    
    打印后发现，
    get请求会打印一个全大写的:GET
    post请求打印一个全大写的:POST
    所以可以根据这个来判断请求的不同，返回的内容不同
    
    
    代码如下:
    from django.shortcuts import render,HttpResponse
    
    # Create your views here.
    
    def login(request):
        if request.method == 'POST':
            return HttpResponse("OK,已提交")
        return render(request,'login.html')
    
    

如何拿到用户提交过来的数据

    # views.py
    from django.shortcuts import render,HttpResponse
    
    # Create your views here.
    
    def login(request):
        if request.method == 'POST':
            # 获取用户提交的数据
            print(request.POST)
            username = request.POST.get('name')
            password = request.POST.get('pwd')
            print(username, password)
    
            return HttpResponse("OK,已提交")
        return render(request,'login.html')
    
    
    上面的方法虽然可以拿到数据，但是有个小问题,就是多选的时候使用get方法只能拿到最后个。如果想要拿到全部，则要使用.getlist()
    
    示例:
    <html>
        <form action="" method="post">
            username:<input type="text" name="name" class="form-control">
            password:<input type="password" name="pwd" class="form-control">
            <input type="checkbox" name="hobby" value="read">read
            <input type="checkbox" name="hobby" value="jump">jump
            <input type="checkbox" name="hobby" value="speak">speak
            <input type="submit" value="提交" class="btn btn-success btn-block">
        </form>
    </html>
    
    

![image](https://img2022.cnblogs.com/blog/723171/202203/723171-20220315221908425-1305601775.png)

    拿到数据：
    # views.py
    
    from django.shortcuts import render,HttpResponse
    
    # Create your views here.
    
    def login(request):
        if request.method == 'POST':
            # 获取用户提交的数据
            print(request.POST)
            username = request.POST.get('name')
            password = request.POST.get('pwd')
            hobby = request.POST.get('hobby')
            print(username, password, hobby)
    
            return HttpResponse("OK,已提交")
        return render(request,'login.html')
    
    # 结果:
    hello 123 speak
    发现只拿到了speak这一个，前面的read和jump没有拿到。如果要拿到就要使用.getlist()
    
    # views.py
    
    from django.shortcuts import render,HttpResponse
    
    # Create your views here.
    
    def login(request):
        if request.method == 'POST':
            # 获取用户提交的数据
            print(request.POST)
            username = request.POST.get('name')
            password = request.POST.get('pwd')
            hobby = request.POST.getlist('hobby')
            print(username, password, hobby)
    
            return HttpResponse("OK,已提交")
        return render(request,'login.html')
    
    # 执行后拿到的数据:
    hello 123 ['read', 'jump', 'speak']
    

上传文件

    上传文件需要一个前提:
        form里面必须有enctype参数
        
       <form action="" method="post" enctype="multipart/form-data">
          <input type="file" name="file">
       </form>
    
    views.py:
        from django.shortcuts import render,HttpResponse
    
        # Create your views here.
    
        def login(request):
            if request.method == 'POST':
                 #data = request.FILES.get('file')
                 data = request.FILES.getlist('file')
                 print(data)
    

目前`request`方法:

    request.method 获取当前请求方法，并结果是一个纯大写的字符串
    request.POST  获取用户post请求过来的基本数据(不包含文件)
    	get() 拿到最后一个元素
        getlist() 拿到全部元素
    request.GET  获取用户get请求过来的基本数据
    	get() 拿到最后一个元素
        getlist() 拿到全部元素
    

3\. Django配置数据库
---------------

    具体文档:
        https://docs.djangoproject.com/en/3.2/ref/settings/#databases
    配置：
    在settings.py里面找到DATABASES，把默认配置修改了:
    # DATABASES = {
    #     'default': {
    #         'ENGINE': 'django.db.backends.sqlite3',
    #         'NAME': BASE_DIR / 'db.sqlite3',
    #     }
    # }
    
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql', # MySQL的驱动程序
            'NAME': 'firstDjango',		# 数据库名
            'USER': 'root',				# 数据库登录用户名
            'PASSWORD': '123456',	# 登录密码
            'HOST': '192.168.1.109',	# 登录ip
            'PORT': '3306',				# 端口
        }
    }
    配置完后启动Django 项目发现会报错:
        django.core.exceptions.ImproperlyConfigured: Error loading MySQLdb module.
    Django默认使用MySQLDB这个模块连接MySQL数据库，现在我们使用pymysql模块，所以要使用PyMySQL模块替换掉MySQLDB，方法:
        在项目目录下的__init__.py 或 应用目录里面的__init__.py 文件里添加:
    __init__.py文件:
    
    import pymysql
    pymysql.install_as_MySQLdb()
    
    就可以解决，然后启动。
    
    修改地方:
        例如项目名是firstDjango,应用名是first
        firstDjango
        	|- __init__.py
        first
        	|- __init__.py
    这两个地方任意一个文件里修改都可以。
    

4\. Django ORM
--------------

ORM:对象关系映射

    类	————>		表
    对象	————>		表里面的数据
    对象点属性  ————>  字段对应的值
    
    优点是：不懂SQL语句也能操作数据库
    缺点: 封装了SQL语句，执行速度比较慢。
    

### 4.1 创建表

在`Django`里操作数据库要写在应用的`models.py`文件里。

    使用Django在数据库里里创建一个表:
    第一步： 写创建语句代码:
    # models.py
    """
    from django.db import models
    
    # Create your models here.
    
    class User(models.Model):
        # 相当于id int primary key auto_increment
        id = models.AutoField(primary_key=True)
        # 相当于 name(varchar(32)) CharField必须有个max_length的参数
        name = models.CharField(max_length=32)
        # age int
        age = models.IntegerField()
    """
    第二步，数据库迁移：
    """
        数据库迁移命令:
        1. 将数据据先记录到migrations目录下。
            python3 manage.py makemigrations
        2. 真正执行数据库迁移操作。
            python3 manage.py migrate
        *** 只要是动了models.py里面和数据库相关的代码就要执行一下上面的两条命令
    """
    

如果不指定主键，`ORM`则会主动创建一个`id`的主键,如果不想让主键字段叫`id`，自己可以手动指定。

### 4.2 增加字段

    # 增加字段：
    # 如增加一个password字段。
    class User(models.Model):
        id = models.AutoField(primary_key=True)
        name = models.CharField(max_length=32，verbose_name='用户名')
        password = models.CharField(max_length=32,verbose_name='密码')  # 
        age = models.IntegerField()
    """
    verbose_name='xx' 增加一个注释，可以写中文
    
    写完后执行：
    python3 manage.py makemigrations
    python3 manage.py migrate
    
    执行的时候会提示:
    Provide a one-off default now (will be set on all existing rows with a null value for this column)
    就是新加的字段，是否能为空，或设置一个默认值，解决方法有两种
    """
    # 方法一，属性为空：
    
    password = models.CharField(max_length=32,verbose_name='密码', null=True)
    # 方法二，设置默认值
    password = models.CharField(max_length=32,verbose_name='密码',default='123456')
    

### 4.3 修改字段:

    # 原代码:
    """
    class User(models.Model):
        id = models.AutoField(primary_key=True)
        name = models.CharField(max_length=32，verbose_name='用户名')
        password = models.CharField(max_length=32,verbose_name='密码')  # 
        age = models.IntegerField()
    """
    # 修改后:
        """
    class User(models.Model):
        id = models.AutoField(primary_key=True)
        name = models.CharField(max_length=64，verbose_name='用户名')
        password = models.CharField(max_length=32,verbose_name='密码')  # 
        age = models.IntegerField()
        """
        
    然后执行:
    python3 manage.py makemigrations
    python3 manage.py migrate
    

### 4.4 删除字段

    # 删除字段，直接把字段在代码里注释即可:
    """
    class User(models.Model):
        id = models.AutoField(primary_key=True)
        name = models.CharField(max_length=64，verbose_name='用户名')
        password = models.CharField(max_length=32,verbose_name='密码')  # 
        #age = models.IntegerField()
    """
    
    然后执行:
    python3 manage.py makemigrations
    python3 manage.py migrate
    

### 4.5 查询数据

登录的时候从数据库校验，如果用户名和密码正确，提示登录成功。

    应用目录下:
    # views.py
    
    from django.shortcuts import render,HttpResponse
    from first import models
    # Create your views here.
    
    def login(request):
        if request.method == 'POST':
            # 获取用户提交的数据
            print(request.POST)
            username = request.POST.get('name')
            password = request.POST.get('pwd')
            
            # select * from user where name='用户输入的登录名' and password='用户输入的密码'
            user_obj = models.User.objects.filter(name=username,password=password).first()
            #上面返回了一个对象方法，对象在调用的时候会执行__str__函数，所以在models.py里加上这个函数
            print(user_obj)
            if user_obj:
                return HttpResponse("登录成功")
        return render(request,'login.html')
    
    # models.py
    
    from django.db import models
    
    # Create your models here.
    
    class User(models.Model):
        # 相当于id int primary key auto_increment
        id = models.AutoField(primary_key=True)
        # 相当于 name(varchar(32)) CharField必须有个max_length的参数
        name = models.CharField(max_length=32)
        password = models.CharField(max_length=32)
        # age int
        age = models.IntegerField()
        def __str__(self):
            return self.name
    
    

### 4.6 插入数据

用户注册

**第一:先准备注册页面**

    templates目录下：
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
        <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <link href="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/3.4.1/css/bootstrap.min.css" rel="stylesheet">
        <script src="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/3.4.1/js/bootstrap.min.js"></script>
    </head>
    <body>
    <div class="container">
        <div class="row">
        <p class="text-center">注册</p>
        <div class="col-md-8 col-md-offset-2">
        <form action="" method="post" enctype="multipart/form-data">
            username:<input type="text" name="name" class="form-control">
            password:<input type="password" name="pwd" class="form-control">
            <input type="submit" value="提交" class="btn btn-warning btn-block">
        </form>
        </div>
        </div>
    </div>
    
    </body>
    </html>
    

**第二,编写用户注册代码**

    # 应用目录下views.py
    from django.shortcuts import render,HttpResponse
    from first import models
    def res(request):
        if request.method == 'POST':
            # 获取用户提交的数据
            print(request.POST)
            username = request.POST.get('name')
            password = request.POST.get('pwd')
            # 写入数据库
            # 不考虑验证用户是否存在
            models.User.objects.create(name=username, password=password)
    		return HttpResponse("注册成功")
        return render(request, 'res.html')
    
    

**第三，路由和视图函数对应**

    项目名目录下:
       # urls.py
    from first import views as views
    urlpatterns = [
        path('admin/', admin.site.urls),
        path('login/', views.login),
        path('res/', views.res),
    
    ]
    

**第四，重启Django项目**

    python  manage.py runserver
    

### 4.7 查看全部数据

要把用户的数据全部展示到页面:

    一,准备展示页:
        #templates目录下home.html：
        <table class="table table-striped table-hover">
            <thead>
            <tr>
                <th>id</th>
                <th>name</th>
                <th>pwd</th>
            </tr>
            </thead>
            <tbody>
                {% for foo in userdata %}
                <tr>
                    <td class="success">{{ foo.id }}</td>
                    <td class="warning">{{ foo.name }}</td>
                    <td class="danger">{{ foo.password }}</td>
                </tr>
                {% endfor %}
            </tbody>
        </table>
        
    二,编写获取全部用户信息代码:
        # 应用名目录下views.py
    from django.shortcuts import render,HttpResponse
    from first import models
    def home(request):
        user_obj = models.User.objects.all()
        # select * from user;
        return render(request, 'home.html', {'userdata':user_obj})
    
    三, 路由和视图函数对应关系:
    # 项目名下urls.py
    
    from first import views as views
    urlpatterns = [
        path('admin/', admin.site.urls),
        path('login/', views.login),
        path('res/', views.res),
        path('home/', views.home),
    ]
       
    四,重启Django项目
    python  manage.py runserver
    

### 4.8 利用页面编辑数据库里数据

    一,准备展示页:
        <table class="table table-striped table-hover">
            <thead>
            <tr>
                <th>编号</th>
                <th>姓名</th>
                <th>密码</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
                {% for foo in userdata %}
                <tr>
                    <td class="success">{{ foo.id }}</td>
                    <td class="warning">{{ foo.name }}</td>
                    <td class="danger">{{ foo.password }}</td>
                    <td colspan="info">
                        <a href="/edit?edit_id={{ foo.id }}">编辑</a>
                        <a href="/delete?delete_id={{ foo.id }}">删除</a>
                    </td>
                </tr>
                {% endfor %}
            </tbody>
        </table>
    二,编写获取全部用户信息代码:
    # 应用名目录下views.py
    def show(request):
        user_obj = models.User.objects.all()
        return render(request, 'show.html', {'userdata':user_obj})
    
    
    def edit(request):
        edit_id = request.GET.get('edit_id')
        edit_obj = models.User.objects.filter(id=edit_id).first()
    
        if request.method == 'POST':
            username = request.POST.get('name')
            password = request.POST.get('pwd')
            # 修改数据方法一:
            models.User.objects.filter(id=edit_id).update(name=username, password=password)
            # 修改数据方法二:
            # edit_obj.name=username
            # edit_obj.password=password
            # edit_obj.save()
            return redirect('/show/')
    
        return render(request, 'edit.html', {"edit_obj":edit_obj})
    
    
    
    三, 路由和视图函数对应关系:
    # urls.py 
    from first import views as views
    urlpatterns = [
        path('admin/', admin.site.urls),
        path('login/', views.login),
        path('res/', views.res),
        path('home/', views.home),
        path('show/', views.show),
        path('edit/', views.edit),
    ]
    四,重启Django项目
    python  manage.py runserver
    

### 4.9 利用页面删除数据库里数据

    一,准备展示页:
        同上页面:
            <a href="/delete?delete_id={{ foo.id }}">删除</a>
    二,编写获取全部用户信息代码:
    # 应用名目录下views.py
    
    def delete(request):
        delete_id = request.GET.get('delete_id')
        models.User.objects.filter(id=delete_id).delete()
        return redirect("/show")
    
    三, 路由和视图函数对应关系:
    # 项目名下urls.py 
    from first import views as views
    urlpatterns = [
        path('admin/', admin.site.urls),
        path('login/', views.login),
        path('res/', views.res),
        path('home/', views.home),
        path('show/', views.show),
        path('edit/', views.edit),
        path('delete/', lviews.delete),
    ]
    四,重启Django项目
    python  manage.py runserver
    

### 4.10 同步数据库

如果数据库已经有一些表了，如何通过`Django ORM`操作？

    如果已经创建了一个库，并且里面有一些表。现在Django要用到这个库和里面的表，如何利用Django操作已经存在的表。
    
    一，使用inspectdb命令，它可以通过已存在的数据库创建对应模型。
    	python3 manage.py inspectdb # 后面什么都不写，则把库中全部表的对应模型都输出。
        python3 manage.py inspectdb  表名 # 只输出某一个表
        
       python3 manage.py inspectdb  first_user
       """
       class FirstUser(models.Model):
        name = models.CharField(max_length=32)
        password = models.CharField(max_length=32)
    
        class Meta:
            managed = False
            db_table = 'first_user'
       把上面的代码保存到models.py里面
       """
        
    二，执行这两个命令:
            python3 manage.py makemigrations  
            python3 manage.py migrate  #会初始化创建一些Django用到的表。
            
            
    

### 4.11 ORM创建外键

    # ORM 针对外键字段的创建位置
    """
    一对多: 推荐建在多的一方
    多对多：建在哪一方都可以，但推荐建在查询频率较高的表中
    一对一: 建在哪一方都可以，但推荐建在查询频率较高的表中
    """
    
    # 应用名目录下models.py
    
    from django.db import models
    
    # Create your models here.
    class User(models.Model):
        id = models.IntegerField(blank=True, primary_key=True)
        name = models.CharField(max_length=255, blank=True, null=True)
        age = models.IntegerField(blank=True, null=True)
    
        class Meta:
            managed = True
            db_table = 'user'
    
    
    
    # 创建书籍表
    class Book(models.Model):
        title = models.CharField(max_length=32)
        # 共8位，小数占2位
        price = models.DecimalField(max_digits=8, decimal_places=2)
    
        # 出版社外键(Django会在外键字段后面自动加_id后缀)
        publish = models.ForeignKey(to='Publish',on_delete=models.CASCADE)
    
        # 作者外键
        authors=models.ManyToManyField(to='Author')
    
    
    
    # 出版社表
    class Publish(models.Model):
        title = models.CharField(max_length=32)
        email = models.EmailField()
    
    # 作者表
    class Author(models.Model):
        name = models.CharField(max_length=32)
        age = models.IntegerField
        #作者详细表外键(在外键字段后面自动加_id后缀)
        author_detail = models.OneToOneField(to='AuthorDetail',models.CASCADE)
    
    # 作者详细表
    class AuthorDetail(models.Model):
        phone = models.BigIntegerField()
        addr = models.CharField(max_length=128)
        
        
    //ForeignKey和OneToOneField使用的时候必须要传两个参数:
        to和on_delete,to就是上面写的哪个表创建外键。
        on_delete为:
            CASCADE 级联删除
            PROTECT
            RESTRICT  (New in Django 3.1.)
            SET_NULL
            SET_DEFAULT
            SET() 将 ForeignKey 设置为传递给 SET() 的值，如果传递了一个可调用的值，则为调用它的结果。
            DO_NOTHING 不采取任何行动
            
    具体见:https://docs.djangoproject.com/zh-hans/3.2/ref/models/fields/#django.db.models.ForeignKey.on_delete