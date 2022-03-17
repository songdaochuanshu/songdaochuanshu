---
layout: post
title: "Net6 Configuration & Options 源码分析 Part1"
date: "2022-03-17T09:17:32.862Z"
---
Net6 Configuration & Options 源码分析 Part1
=======================================

###### Net6 Configuration & Options 源码分析 Part1

在Net6中配置系统一共由两个部分组成**Options 模型**与**配置系统**.它们是两个完全独立的系统。  
第一部分主要记录**配置系统**

> 下面演示的几个实例具有一个共同的特征（ 1. 将配置绑定为Options对象），即都采用配置系统来提供绑定Options对象的原始数据，实际上，Options 框架具有一个完全独立的模型，可以称为Options 模型。这个独立的Options 模型本身并不依赖于配置系统，让配置系统来提供配置数据仅仅是通过 Options 模型的一个扩展点实现的。在很多情况下，可能并不需要将应用的配置选项定义在配置文件中，在应用启动时直接初始化可能是一种更方便、快捷的方式  
> 以上引用 ASP.NET Core 3 框架揭秘

使用
--

### IConfiguration IConfigurationBuilder IConfigurationSource

读取的配置信息最终会转换成一个IConfiguration对象供应用程序使用。IConfigurationBuilder 对象是IConfiguration对象的构建者，而构建IConfiguration是要的数据来源用IConfigurationSource对象表示，它代表配置数据最原始的来源.以键值对的形式读取配置。以上是在使用层面，其实在IConfigurationSource还有个IConfigurationProvider。

#### MemoryConfiguration 使用

以下示例创建一个ConfigurationBuilder（IConfigurationBuilder接口的默认实现类型）对象，并为之注册一个或者多个 IConfigurationSource 对象，最后利用它来创建我们需要的IConfiguration对象作为对外的数据的操作接口。

    var source = new Dictionary<string, string>{
        ["key"] ="hello", 
    };
    var configuration = new ConfigurationBuilder().Add (new MemoryConfigurationSource(InitialData = source )).Build();
    public class TestOptions {
        string name;
        public DateTime TestOptions (IConfiguration configuration){
           name = configuration["key"]; 
        }
    }
    

##### 读取结构化的配置/树形层次结构

IConfigurationRoot与IConfigurationSection组成了一个逻辑上树形结构数据。两者均实现了IConfiguration。前者作为根节点。后者作为普通节点。

    var source = new Dictionary<string, string>{
        {"TestOptions:Key1" ,"TestOptions key1"},
        {"TestOptions:Key2" ,"TestOptions key2"},
        {"UserInfo:key1" ,"UserInfo"},
    };
    var rootConfiguration = new ConfigurationBuilder().Add(new MemoryConfigurationSource() { InitialData = source }).Build();
    configurationSection = configuration.GetSection("TestOptions");
    configurationSection = configuration.GetSection("UserInfo");
    

##### 绑定到POCO对象 ConfigurationBinder 也可以叫做配置绑定

包：Microsoft.Extensions.Configuration.Binder  
ConfigurationBinder是一个帮助类是对IConfiguration的扩展类，内部就是通过反射tpye 然后在利用IConfiguration绑定节点到type并返回实例。  
值得注意的是，如果你的节点没有对应的type属性会报错比如你的配置源中有个叫Name的节点，但对应的POCO对象并没有这个属性就会抛异常。但这是通过BinderOptions设置的。

    var configuration = new ConfigurationBuilder().Add(new MemoryConfigurationSource() { InitialData = source }).Build();
    var testOption = configuration.GetSection("TestOptions").Get<TestOpetion>();
    Console.WriteLine(testOption.Key1);
    

#### JsonConfigurationSource

一般不需要手动创建这个 JsonConfigurationSource对象，只需要调用 IConfiguration Builder接口的AddJsonFile扩展方法添加指定的JSON文件即可

    var configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json").AddJsonFile($"appsettings.{environment}.json.Build();//两个appsettings内容会合并。
    var test = configuration.GetSection("TestOptions").Get<>(TestOptions);
    

#### 其它数据源

1.  CommandLineConfigurationSource
2.  EnvironmentVariablesConfigurationSource  
    环境变量存储位置:系统/用户/当前进程的环境变量（系统和用户级别的环境变量保存在注册表)  
    Environment静态类用于操作环境变量。GetEnvironmentVariables返回当前所有环境变量
3.  FileConfigurationSource

### 绑定配置项的值 TypeConverter/数据结构及其转换

#### 配置的同步 ConfigurationReloadToken

ConfigurationReloadToken本质上就是对 CancellationTokenSource的封装。  
注册个回调事件当配置源发生改变。

    var config = new ConfigurationBuilder().Add(new MemoryConfigurationSource() { InitialData = source }).Build();
    ChangeToken.OnChange(() => config.GetReloadToken(), () =>
        {
            Console.WriteLine("config change call back!");
        });
    }
    

使用篇总结
-----

> :1.IConfigurationSource内由IConfigurationProvider提供数据， 2.IConfigurationBuilder build出来的IConfigurationRoot 作为根节点，IConfigurationRoot内部维护了一个IConfigurationProvider集合，是由IConfigurationBuilder 从自身的IConfigurationSource集合整理出来的。IConfigurationRoot与IConfigurationSection组成了树形结构数据，但是IConfigurationSection的数据均是从根节点获取的。

接口

实现

注释

IConfigurationProvider

ConfigurationProvider-MemoryConfigurationProvider

数据提供者

IConfigurationSource

MemoryConfigurationSource

数据源

IConfigurationBuilder

ConfigurationBuilder

Builder类收集数据源创建IConfiguration

IConfiguration

IConfigurationRoot/IConfigurationSection

读取数据操作

源码分析
----

### [Microsoft.Extensions.Configuration.Abstractions](https://source.dot.net/#Microsoft.Extensions.Configuration.Abstractions)

### [Microsoft.Extensions.Configuration](https://source.dot.net/#Microsoft.Extensions.Configuration)

### [Microsoft.Extensions.Configuration.Binder](https://source.dot.net/#Microsoft.Extensions.Configuration.Binder)

从三个方面入手源码，

1.  数据源收集与构建:IConfigurationBuilder ConfigurationBuilder 作为数据源采集，然后创建出ConfigurationRoot,
2.  对外操作类：IConfiguration 用来对外提供数据，实现了它的类跟接口有，ConfigurationSection IConfigurationSection,ConfigurationRoot IConfigurationRoot
3.  数据源 ：IConfigurationSource ConfigurationProvider MemoryConfigurationSource MemoryConfigurationProvider

### 数据源收集与构建 ConfigurationBuilder :IConfigurationBuilder

ConfigurationBuilder用来收集IConfigurationSource,并根据数据源提供的provider用其build方法构建出ConfigurationRoot。

    public class ConfigurationBuilder : IConfigurationBuilder
    {
        // 返回用于获取配置值的源。你通过Add方法添加的IConfigurationSource都存在这里了
        public IList<IConfigurationSource> Sources { get; } = new List<IConfigurationSource>();
        // 属性则以字典的形式存放任意的自定义属性。
        public IDictionary<string, object> Properties { get; } = new Dictionary<string, object>();
        // Adds a new configuration source.
        public IConfigurationBuilder Add(IConfigurationSource source!!)
        {
            Sources.Add(source); return this;
        }
        // 方法很简单，直接调用收集到的Source的build同名方法，然后拿到对应的provider 最后用此providers 集合生成 ConfigurationRoot
        public IConfigurationRoot Build()
        {
            var providers = new List<IConfigurationProvider>();
            foreach (IConfigurationSource source in Sources)
            {
                IConfigurationProvider provider = source.Build(this);
                providers.Add(provider);
            }
            return new ConfigurationRoot(providers);
        }
    }
    

### 对外操作类 IConfiguration

表示一组键/值应用程序配置属性。 用于读取配置它对应了连个实现类IConfigurationSection与ConfigurationRoot

    /// 表示一组键/值应用程序配置属性。  
    public interface IConfiguration
    {
        // Gets or sets a configuration value. 当执行这个索引的时候，它会按照与 GetSection方法完全一致的逻辑得到一个 IConfigurationSection对象，并返回其 Value属性
        string? this[string key] { get; set; }
    
        // 获取具有指定键的配置子节。
        IConfigurationSection GetSection(string key);
    
        // 获取直接子代配置子节。
        IEnumerable<IConfigurationSection> GetChildren();
    
        // 返回一个<see cref="IChangeToken"/>，用于观察该配置何时被重新加载。  
        IChangeToken GetReloadToken();
    }
    

#### ConfigurationSection:IConfigurationSection:IConfiguration

表示普通节点，其数据还是以IConfigurationRoot为源头，其实就是对IConfigurationRoot的封装让使用这从使用逻辑上由一个树形结构的数据结构 概念。利用属性path 与属性key 拼接成 字典key在内部找数据，所以不是所有section都会有值

    // 表示应用程序配置值的一节。  
    public interface IConfigurationSection : IConfiguration
    {
        string Key { get; }
        // 节点的路径.
        string Path { get; }
        //节点对应的数据。（ 因为data是个字典所以你给出的key（路径） 一定要是字典的key才会有值否则为null很正常）
        string? Value { get; set; }
    }
    
    public class ConfigurationSection : IConfigurationSection
    {
        private readonly IConfigurationRoot _root;
        private readonly string _path;
        private string? _key;
        public ConfigurationSection(IConfigurationRoot root!!, string path!!)
        {
            _root = root;
            _path = path;
        }
        public string? this[string key]
        {
            get return _root[ConfigurationPath.Combine(Path, key)];
            set _root[ConfigurationPath.Combine(Path, key)] = value;
        }
        public IConfigurationSection GetSection(string key) => _root.GetSection(ConfigurationPath.Combine(Path, key));
        public IEnumerable<IConfigurationSection> GetChildren() => _root.GetChildrenImplementation(Path);
        public IChangeToken GetReloadToken() => _root.GetReloadToken();
        public string Path => _path;
        public string Key { get return _key;    }
        public string? Value { get  return _root[Path]; set _root[Path] = value; }
    }
    

#### ConfigurationRoot:IConfigurationRoot:IConfiguration 表示根节点

它由ConfigurationBuilder创建出来，同时ConfigurationBuilder把收集到的IConfigurationProvider集合作为参数传入，在构造方法内它会调用他们的**load**方法进行初始化对应的IConfigurationProvider的data属性。用于后续调用Get方法使用。同时注册了RaiseChanged这样 仍和 一个provider发生了change 都会执行都会执行注册在此root节点的ReloadToken回调

我们将IConfigurationRoot 对象看作一棵配置树的跟接单

1.  GetConfiguration 后来在居上
2.  this\[string key\] -> GetConfiguration
3.  IChangeToken GetReloadToken() => \_changeToken; 获取token 后可以注册此root下任何一个provider 发生change时的回调。

    /// <summary>
    /// The root node for a configuration.
    /// </summary>
    public class ConfigurationRoot : IConfigurationRoot, IDisposable
    {
        private readonly IList<IConfigurationProvider> _providers;
        private readonly IList<IDisposable> _changeTokenRegistrations;
        private ConfigurationReloadToken _changeToken = new ConfigurationReloadToken();
    
        public ConfigurationRoot(IList<IConfigurationProvider> providers!!)
        {
            _providers = providers;
            _changeTokenRegistrations = new List<IDisposable>(providers.Count);
            foreach (IConfigurationProvider p in providers)
            {
                p.Load();
                _changeTokenRegistrations.Add(ChangeToken.OnChange(() => p.GetReloadToken(), () => RaiseChanged()));
            }
        }
    
        internal static string? GetConfiguration(IList<IConfigurationProvider> providers, string key)
        {
            for (int i = providers.Count - 1; i >= 0; i--)
            {
                IConfigurationProvider provider = providers[i];
    
                if (provider.TryGet(key, out string? value))
                {
                    return value;
                }
            }
            return null;
        }
    
        // Gets or sets the value corresponding to a configuration key.
        public string? this[string key]
        {
            get => GetConfiguration(_providers, key);
            set => SetConfiguration(_providers, key, value);
        }
    
        public IEnumerable<IConfigurationSection> GetChildren() => this.GetChildrenImplementation(null);
        public IChangeToken GetReloadToken() => _changeToken;
        public IConfigurationSection GetSection(string key) => new ConfigurationSection(this, key);
        ....      
    }
    

### 数据源

netcore 的数据源是由Source 以及 Proivder 组成。前者负责创建后者。后者提供具体的数据源。

#### IConfigurationSource

此接口只有一个Build创建对应的provider.实现它的有常用类有FileConfigurationSource 以及MemoryConfigurationSource 请看具体的实现类

    public interface IConfigurationSource
    {
        IConfigurationProvider Build(IConfigurationBuilder builder);
    }
    

#### ConfigurationProvider:IConfigurationProvider

作为其它provider 的基类就如微软所的一样“Base helper class for implementing an IConfigurationProvider”，负责了保存子类整理好的数据源以及根据此数据源的一些基础操作如get /GetChildKeys / GetReloadToken  
以及一个比较重要的虚方法方法**Load**，由具体的子类实现如FiletConfigurationPorivder / MemoryConfigurationProvider（他没实现Load方法因为他在构造函数就把这事情做了）以及构造方法中对  
这里的 OnReload()会触发 Reload 通知并重新生成一个新的ReloadToken 注意新生成的ReloadToekn 是没注册任何回调事件的。 可以通过GetReloadToken() 获得对应的token 然后通过ChangeToken.OnChange方式注册个callback

    public abstract class ConfigurationProvider : IConfigurationProvider
    {
        protected IDictionary<string, string?> Data { get; set; }
        private ConfigurationReloadToken _reloadToken = new ConfigurationReloadToken();
        protected ConfigurationProvider()
        {
            Data = new Dictionary<string, string?>(StringComparer.OrdinalIgnoreCase);
        }
        public virtual bool TryGet(string key, out string? value) => Data.TryGetValue(key, out value);
        public virtual void Set(string key, string? value) => Data[key] = value;
        public virtual void Load(){ }
    
        // 当前节点下的所有子节点的key 这里不包含孙子节点.
        public virtual IEnumerable<string> GetChildKeys(
            IEnumerable<string> earlierKeys,
            string? parentPath)
        {
            var results = new List<string>();
    
            if (parentPath is null)
            {
                foreach (KeyValuePair<string, string?> kv in Data)
                {
                    results.Add(Segment(kv.Key, 0));
                }
            }
            else
            {
                Debug.Assert(ConfigurationPath.KeyDelimiter == ":");
    
                foreach (KeyValuePair<string, string?> kv in Data)
                {
                    if (kv.Key.Length > parentPath.Length &&
                        kv.Key.StartsWith(parentPath, StringComparison.OrdinalIgnoreCase) &&
                        kv.Key[parentPath.Length] == ':')
                    {
                        results.Add(Segment(kv.Key, parentPath.Length + 1));
                    }
                }
            }
    
            results.AddRange(earlierKeys);
    
            results.Sort(ConfigurationKeyComparer.Comparison);
    
            return results;
        }
    
        private static string Segment(string key, int prefixLength)
        {
            int indexOf = key.IndexOf(ConfigurationPath.KeyDelimiter, prefixLength, StringComparison.OrdinalIgnoreCase);
            return indexOf < 0 ? key.Substring(prefixLength) : key.Substring(prefixLength, indexOf - prefixLength);
        }
    
        public IChangeToken GetReloadToken()=>return _reloadToken;}
    
        /// Triggers the reload change token and creates a new one.
        protected void OnReload()
        {
            ConfigurationReloadToken previousToken = Interlocked.Exchange(ref _reloadToken, new ConfigurationReloadToken());
            previousToken.OnReload();
        }
    }
    

#### MemoryConfigurationSource: 非常简单

InitialData字段就是你在创建MemoryConfigurationSource提供的字典对象，build方法则创建一个MemoryConfigurationProvider并把自身this作为参数传入，其目的很简单。在Proivder 对象中可以访问到Source对象，其构造函数内根据Source的InitialData初始化Data属性.

    public class MemoryConfigurationSource : IConfigurationSource
    {
       /// The initial key value configuration pairs. 数据源 
       public IEnumerable<KeyValuePair<string, string?>>? InitialData { get; set; }
    
       /// Builds the <see cref="MemoryConfigurationProvider"/> for this source.
       public IConfigurationProvider Build(IConfigurationBuilder builder)
       {
           return new MemoryConfigurationProvider(this);
       }
    }
    

#### MemoryConfigurationProvider

因为这是最简单的Provider 赋值把MemoryConfigurationSource的data 整理好给父类Data属性就好。然后用父类Data属性对外提供数据。所以MemoryConfigurationProvider并没有重写父类的Load方法

    /// <summary>
    /// In-memory implementation of <see cref="IConfigurationProvider"/>
    /// </summary>
    public class MemoryConfigurationProvider : ConfigurationProvider, IEnumerable<KeyValuePair<string, string?>>
    {
       private readonly MemoryConfigurationSource _source;
       public MemoryConfigurationProvider(MemoryConfigurationSource source!!)
       {
           _source = source;
           foreach (KeyValuePair<string, string?> pair in _source.InitialData)
           {
               Data.Add(pair.Key, pair.Value);
           }
       }
       public void Add(string key, string? value) { Data.Add(key, value); }
       public IEnumerator<KeyValuePair<string, string?>> GetEnumerator() { return Data.GetEnumerator(); }
       IEnumerator IEnumerable.GetEnumerator() { return GetEnumerator(); }
    }
    

### 其它

#### FileConfiguration

FileConfiguration以Json File Configuration ，整个实际跟上面介绍的一样作为数据源同样由 1.Source 2. Provider组成 source作为Porvider的build类用于创建Porivder，创建出来的Provider提供具体的数据源

两条线 1.Provider 2.Source  
Provider的继承与实现关系:JsonConfigurationProvider->FileConfigurationProvider-> ConfigurationProvider->IConfigurationProvider  
Source 的继承与实现关系:JsonConfigurationSource -> FileConfigurationSource ->IConfigurationSource

#### 其它数据源

#### EnvironmentVariablesConfigurationSource

#### CommandLineConfigurationSource

总结
==

在使用层面上  
IConfiguration接口对外提供配置数据，实现了此接口的有 IConfigurationSection & IConfigurationRoot 也由此两个接口在代码上实现了一个具有树行结构逻辑数据源。  
所有的数据源均以字典key形式存储的。所以你不给一个完整的路径是得不到数据的。

在构建数据源与数据提供方向：  
IConfigurationProvider/IConfigurationSource/IConfigurationBuilder  
IConfigurationProvider接口提供了set\\get\\load();等接口，前两给负责使用者提供数据源，而load方法用于初始化加载数据到自身的data属性，它调用的时机是创建ConfigurationRoot的构造函数内。  
IConfigurationSource 仅仅有一个build方法 当调用IConfigurationBuilder的build方法创建IConfigurationRoot是，就是调用每个IConfigurationSource的Build创Porivder并把此集合作为参数去创建IConfigurationRoot

它的Get数据流向：  
根节点：IConfigurationRoot-> IConfigurationProvider  
非根节点：IConfigurationSection -> IConfigurationRoot-> IConfigurationProvider  
其中IConfigurationRoot的IConfigurationProvider由IConfigurationBuilder整理自身的IConfigurationSource提供在构造IConfigurationRoot作为参数传入，值得注意的是IConfigurationRoot并不保存数据，而是从对应的povider中获取。

文章中提到的代码，请在[source.dot.net](https://source.dot.net/)快速搜索预览

* * *

本文来自博客园，作者：[一身大膘](https://www.cnblogs.com/hts92/)，转载请注明原文链接：[https://www.cnblogs.com/hts92/p/15904925.html](https://www.cnblogs.com/hts92/p/15904925.html)

如果该篇文章对您有帮助的话，可以点一下右下角的[【推荐】](javascript:void(0))