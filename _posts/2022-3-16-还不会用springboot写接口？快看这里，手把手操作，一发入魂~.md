---
layout: post
title: "还不会用springboot写接口？快看这里，手把手操作，一发入魂~"
date: "2022-03-16T20:22:09.396Z"
---
还不会用springboot写接口？快看这里，手把手操作，一发入魂~
==================================

![还不会用springboot写接口？快看这里，手把手操作，一发入魂~](https://img2022.cnblogs.com/blog/2739387/202203/2739387-20220316210416152-325307720.png) springboot入门项目，包括简单的接口开发（api），数据库操作（mybatis plus）和接口文档调试生成（knife4j）。

**1、springboot简介**
------------------

> Spring Boot 可以轻松创建可以“直接运行”的独立的、生产级的基于 Spring 的应用程序。

**特征**

> 创建独立的 Spring 应用程序
> 
> 直接嵌入 Tomcat、Jetty 或 Undertow（无需部署 WAR 文件）
> 
> 提供强壮的“入门”依赖项以简化您的构建配置
> 
> 尽可能自动配置 Spring 和第三方中间件
> 
> 提供生产就绪功能，例如指标、健康检查和外部化配置
> 
> 完全无需代码生成，无需 XML 配置

**2、新建springboot web项目**
------------------------

**按以下步骤依次操作**  
![在这里插入图片描述](https://img-blog.csdnimg.cn/645ee62a2977423ba8f32c33d9db08bd.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6ZqQIOmjjg==,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)  
![在这里插入图片描述](https://img-blog.csdnimg.cn/d0ccde03312f479fae88e774525cb161.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6ZqQIOmjjg==,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)  
![在这里插入图片描述](https://img-blog.csdnimg.cn/b3450e4279a843b8b501916532975580.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6ZqQIOmjjg==,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)  
**初始化项目完整的结构**  
![在这里插入图片描述](https://img-blog.csdnimg.cn/6d91e976df304ac28bee36fd0d8017a4.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6ZqQIOmjjg==,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

**3、基本配置**
----------

### **3.1 引入相关依赖**

#### **mysql连接依赖**

    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
    </dependency>
    

#### **mybatis-plus**

> MyBatis-Plus (opens new window)（简称 MP）是一个 MyBatis (opens new window)的增强工具，在 MyBatis 的基础上只做增强不做改变，为简化开发、提高效率而生。

**特性**

> **无侵入**：只做增强不做改变，引入它不会对现有工程产生影响，如丝般顺滑  
> 损耗小：启动即会自动注入基本 CURD，性能基本无损耗，直接面向对象操作  
> **强大的 CRUD 操作**：内置通用 Mapper、通用 Service，仅仅通过少量配置即可实现单表大部分 CRUD 操作，更有强大的条件构造器，满足各类使用需求  
> **支持 Lambda 形式调用**：通过 Lambda 表达式，方便的编写各类查询条件，无需再担心字段写错  
> **支持主键自动生成**：支持多达 4 种主键策略（内含分布式唯一 ID 生成器 - Sequence），可自由配置，完美解决主键问题  
> **支持 ActiveRecord 模式**：支持 ActiveRecord 形式调用，实体类只需继承 Model 类即可进行强大的 CRUD 操作  
> **支持自定义全局通用操作**：支持全局通用方法注入（ Write once, use anywhere ）  
> **内置代码生成器**：采用代码或者 Maven 插件可快速生成 Mapper 、 Model 、 Service 、 Controller 层代码，支持模板引擎，更有超多自定义配置等您来使用  
> **内置分页插件**：基于 MyBatis 物理分页，开发者无需关心具体操作，配置好插件之后，写分页等同于普通 List 查询  
> **分页插件支持多种数据库**：支持 MySQL、MariaDB、Oracle、DB2、H2、HSQL、SQLite、Postgre、SQLServer 等多种数据库  
> **内置性能分析插件**：可输出 SQL 语句以及其执行时间，建议开发测试时启用该功能，能快速揪出慢查询  
> **内置全局拦截插件**：提供全表 delete 、 update 操作智能分析阻断，也可自定义拦截规则，预防误操作

    <dependency>
        <groupId>com.baomidou</groupId>
        <artifactId>mybatis-plus-boot-starter</artifactId>
        <version>3.5.1</version>
    </dependency>
    
    

#### **knife4j**

> Knife4j的前身是swagger-bootstrap-ui,前身swagger-bootstrap-ui是一个纯swagger-ui的ui皮肤项目。  
> 一开始项目初衷是为了写一个增强版本的swagger的前端ui,但是随着项目的发展,面对越来越多的个性化需求,不得不编写后端Java代码以满足新的需求,在swagger-bootstrap-ui的1.8.5~1.9.6版本之间,采用的是后端Java代码和Ui都混合在一个Jar包里面的方式提供给开发者使用.这种方式虽说对于集成swagger来说很方便,只需要引入jar包即可,但是在微服务架构下显得有些臃肿。  
> 因此,项目正式更名为knife4j,取名knife4j是希望她能像一把匕首一样小巧,轻量,并且功能强悍,更名也是希望把她做成一个为Swagger接口文档服务的通用性解决方案,不仅仅只是专注于前端Ui前端.

    <dependency>
        <groupId>com.github.xiaoymin</groupId>
        <artifactId>knife4j-spring-boot-starter</artifactId>
        <version>3.0.3</version>
    </dependency>
    

#### **完整pom.xml文件**

    <?xml version="1.0" encoding="UTF-8"?>
    <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
        <modelVersion>4.0.0</modelVersion>
        <parent>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-parent</artifactId>
            <version>2.6.4</version>
            <relativePath/> <!-- lookup parent from repository -->
        </parent>
        <groupId>com.yinfeng</groupId>
        <artifactId>test</artifactId>
        <version>0.0.1-SNAPSHOT</version>
        <name>test</name>
        <description>test</description>
        <properties>
            <java.version>1.8</java.version>
        </properties>
        <dependencies>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-web</artifactId>
            </dependency>
    
            <dependency>
                <groupId>org.projectlombok</groupId>
                <artifactId>lombok</artifactId>
                <optional>true</optional>
            </dependency>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-test</artifactId>
                <scope>test</scope>
            </dependency>
            <dependency>
                <groupId>mysql</groupId>
                <artifactId>mysql-connector-java</artifactId>
            </dependency>
            <dependency>
                <groupId>com.baomidou</groupId>
                <artifactId>mybatis-plus-boot-starter</artifactId>
                <version>3.5.1</version>
            </dependency>
            <dependency>
                <groupId>com.github.xiaoymin</groupId>
                <artifactId>knife4j-spring-boot-starter</artifactId>
                <version>3.0.3</version>
            </dependency>
        </dependencies>
    
        <build>
            <plugins>
                <plugin>
                    <groupId>org.springframework.boot</groupId>
                    <artifactId>spring-boot-maven-plugin</artifactId>
                    <configuration>
                        <excludes>
                            <exclude>
                                <groupId>org.projectlombok</groupId>
                                <artifactId>lombok</artifactId>
                            </exclude>
                        </excludes>
                    </configuration>
                </plugin>
            </plugins>
        </build>
    
    </project>
    
    

### **3.2 完成application.yml文件配置**

    server:
      # 服务端口
      port: 8888
    spring:
      application:
        name: yinfeng-test
      # 数据库相关配置
      datasource:
        url: jdbc:mysql://127.0.0.1:3306/test?useSSL=false&serverTimezone=UTC&useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai
        username: root
        password: yinfeng
        driver-class-name: com.mysql.cj.jdbc.Driver
    

![在这里插入图片描述](https://img-blog.csdnimg.cn/bf1ce7f4a17f41b8ba80b557f0a0e321.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6ZqQIOmjjg==,size_20,color_FFFFFF,t_70,g_se,x_16)

### **3.3 配置knife4j**

    /**
     * @author yinfeng
     * @description knife4j配置
     * @since 2022/3/12 21:49
     */
    @Configuration
    @EnableSwagger2
    public class Knife4jConfig {
        @Bean
        public Docket buildDocket() {
            return new Docket(DocumentationType.SWAGGER_2)
                    .apiInfo(new ApiInfoBuilder().title("隐风 API文档").version("1.0").build())
                    .select()
                    .apis(RequestHandlerSelectors
                            .basePackage("com.yinfeng.test.controller"))
                    .paths(PathSelectors.any())
                    .build();
        }
    }
    

    /**
     * @author yinfeng
     * @description web配置
     * @since 2022/3/12 21:57
     */
    @Configuration
    public class WebConfig implements WebMvcConfigurer {
    
        @Override
        public void addResourceHandlers(ResourceHandlerRegistry registry) {
            registry.addResourceHandler("doc.html").addResourceLocations("classpath:/META-INF/resources/");
            registry.addResourceHandler("/webjars/**").addResourceLocations("classpath:/META-INF/resources/webjars/");
        }
    
    }
    

### **3.4 配置mybatis plus插件**

    /**
     * @author yinfeng
     * @description Mybatis plus配置
     * @since 2022/3/12 22:29
     */
    @Configuration
    public class MybatisPlusConfig {
        @Bean
        public MybatisPlusInterceptor mybatisPlusInterceptor() {
            MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
            // 加入分页插件
            interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.H2));
            return interceptor;
        }
    }
    

**4、创建测试表**
-----------

### **4.1 连接数据库**

> 可以通过idea的数据库工具直接连接数据库

1.  **创建数据源**  
    ![在这里插入图片描述](https://img-blog.csdnimg.cn/2855785ba64c42cdba59762b6685fa0c.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6ZqQIOmjjg==,size_20,color_FFFFFF,t_70,g_se,x_16)
    
2.  **配置连接信息**  
    ![在这里插入图片描述](https://img-blog.csdnimg.cn/55bec97a33d54bb1b46eb9d1c1dedd83.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6ZqQIOmjjg==,size_20,color_FFFFFF,t_70,g_se,x_16)
    
3.  **执行建表sql**
    

    CREATE TABLE `menus` (
      `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '菜单id',
      `level` int(11) NOT NULL DEFAULT '1' COMMENT '菜单等级',
      `name` varchar(11) NOT NULL DEFAULT '' COMMENT '菜单名',
      `note` varchar(500) DEFAULT NULL COMMENT '备注',
      `create_time` datetime NOT NULL COMMENT '创建时间',
      `update_time` datetime NOT NULL COMMENT '更新时间',
      `deleted` tinyint(4) NOT NULL DEFAULT '0' COMMENT '删除标志',
      PRIMARY KEY (`id`) USING BTREE,
      UNIQUE KEY `menus_id_uindex` (`id`) USING BTREE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='菜单表';
    

![在这里插入图片描述](https://img-blog.csdnimg.cn/e682ed90a8e4401c821fc32c3b08261b.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6ZqQIOmjjg==,size_20,color_FFFFFF,t_70,g_se,x_16)

4.  **创建测试数据**

    INSERT INTO `menus` (`id`, `level`, `name`, `update_time`, `note`, `create_time`, `deleted`) VALUES (1, 1, '首页', '2021-08-22 13:44:51', '首页', '2021-08-22 13:44:51', 0);
    INSERT INTO `menus` (`id`, `level`, `name`, `update_time`, `note`, `create_time`, `deleted`) VALUES (1444693273867198466, 1, '科室管理', '2021-10-03 15:58:38', '科室管理科室管理', '2021-10-03 15:58:16', 0);
    

![在这里插入图片描述](https://img-blog.csdnimg.cn/81b35e6e41724727a934d1f178831c0a.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6ZqQIOmjjg==,size_20,color_FFFFFF,t_70,g_se,x_16)  
![在这里插入图片描述](https://img-blog.csdnimg.cn/6620d14c4ff84dd7b20dfcf93bf4dc4e.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6ZqQIOmjjg==,size_20,color_FFFFFF,t_70,g_se,x_16)

**5、接口开发**
----------

### **5.1 创建菜单表对应的实体类**

    /**
     * @author yinfeng
     * @description 菜单表
     * @TableName menus
     * @since 2022年3月12日 下午9:40:48
     */
    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    @ApiModel("菜单表")
    @TableName("menus")
    public class Menus {
    
        /**
         * 菜单id
         */
        @TableId(type = IdType.ASSIGN_ID)
        @JsonSerialize(using = ToStringSerializer.class)
        @ApiModelProperty(value = "菜单id", example = "")
        private Long id;
    
        /**
         * 菜单等级
         */
        @TableField("level")
        @ApiModelProperty(value = "菜单等级", example = "")
        private Integer level;
    
        /**
         * 菜单名
         */
        @TableField("name")
        @ApiModelProperty(value = "菜单名", example = "")
        private String name;
    
        /**
         * 备注
         */
        @TableField("note")
        @ApiModelProperty(value = "备注", example = "")
        private String note;
    
        /**
         * 创建时间
         */
        @TableField(value = "create_time", fill = FieldFill.INSERT)
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
        @ApiModelProperty(value = "创建时间", example = "")
        private Date createTime;
    
        /**
         * 更新时间
         */
        @TableField(value = "update_time", fill = FieldFill.INSERT_UPDATE)
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
        @ApiModelProperty(value = "更新时间", example = "")
        private Date updateTime;
    
        /**
         * 删除标志
         */
        @TableField("deleted")
        @TableLogic
        @JsonIgnore
        @ApiModelProperty(value = "删除标志", example = "")
        private Integer deleted;
    
        /**
         * 当前页
         */
        @ApiModelProperty(value = "当前页", example = "1")
        @TableField(exist = false)
        private Integer currentPage;
    
        /**
         * 分页页数
         */
        @ApiModelProperty(value = "分页页数", example = "20")
        @TableField(exist = false)
        private Integer pageSize;
    }
    
    

### **5.2 创建菜单表对应的controller**

> 包含基本的增删改查接口

    /**
     * @author yinfeng
     * @since 2022年3月12日 下午9:40:48
     * @description 菜单表
     */
    @Api(tags = "菜单表")
    @RestController
    @RequestMapping("/menus")
    public class MenusController{
    
        @Resource
        private MenusService menusService;
    
        @PostMapping("/list")
        @ApiOperation(value = "列表", notes = "菜单表")
        public IPage<Menus> list(@RequestBody Menus menus) {
            return menusService.list(menus);
        }
    
        @PostMapping("/getOne")
        @ApiOperation(value = "单个查询", notes = "菜单表")
        public Menus getOne(@RequestBody Menus menus) {
            return menusService.getOne(menus);
        }
    
        @PostMapping("/save")
        @ApiOperation(value = "新增或编辑", notes = "菜单表")
        public boolean save(@RequestBody Menus menus) {
            return menusService.saveOrUpdate(menus);
        }
    
        @PostMapping("/delete")
        @ApiOperation(value = "删除", notes = "菜单表")
        public boolean delete(@RequestBody Menus menus) {
            return menusService.delete(menus);
        }
    
    }
    

### **5.3 创建菜单表对应的service**

    /**
     * @author yinfeng
     * @since 2022年3月12日 下午9:40:48
     * @description 菜单表
     * @TableName menus
     */
    public interface MenusService extends IService<Menus> {
    
        /**
         * 查询列表
         *
         * @param vo vo
         * @return IPage<Menus>
         */
        IPage<Menus> list(Menus vo);
    
        /**
         * 单个查询
         *
         * @param vo vo
         * @return Menus
         */
        Menus getOne(Menus vo);
    
        /**
         * 保存
         *
         * @param vo vo
         * @return 是否保存成功
         */
        @Override
        boolean saveOrUpdate(Menus vo);
    
        /**
         * 删除
         *
         * @param vo vo
         * @return 是否删除成功
         */
        boolean delete(Menus vo);
    
    }
    
    

    /**
     * @author yinfeng
     * @since 2022年3月12日 下午9:40:48
     * @description 菜单表
     * @TableName menus
     */
    @Service
    public class MenusServiceImpl extends ServiceImpl<MenusMapper, Menus>
        implements MenusService{
    
        @Override
        public IPage<Menus> list(Menus vo){
            final QueryWrapper<Menus> wrapper = new QueryWrapper<>();
            wrapper.eq(ObjectUtils.isNotEmpty(vo.getId()), "id", vo.getId());
            return super.page(new Page<>(vo.getCurrentPage(), vo.getPageSize()), wrapper);
        }
    
        @Override
        public Menus getOne(Menus vo){
            final QueryWrapper<Menus> wrapper = new QueryWrapper<>();
            wrapper.eq(ObjectUtils.allNotNull(vo.getId()), "id", vo.getId());
            return super.getOne(wrapper);
        }
    
        @Override
        public boolean saveOrUpdate(Menus vo) {
            return super.saveOrUpdate(vo);
        }
    
        @Override
        public boolean delete(Menus vo) {
            final QueryWrapper<Menus> wrapper = new QueryWrapper<>();
            wrapper.eq(ObjectUtils.allNotNull(vo.getId()), "id", vo.getId());
            return super.remove(wrapper);
        }
    
    }
    

### **5.3 创建菜单表对应的mapper，相当于直接操作数据库的类**

    /**
    * @author yinfeng
    * @since 2022年3月12日 下午9:40:48
    * @description 菜单表
    * @TableName menus
    */
    @Mapper
    public interface MenusMapper extends BaseMapper<Menus> {
    }
    

> 由于使用mybatis plus框架，帮我们简化了很多简单的增删改查，所以这里的service和mapper代码就写得很清爽，但也可实现咱们的功能

**6、接口测试**
----------

### **6.1 启动项目**

![在这里插入图片描述](https://img-blog.csdnimg.cn/adf5952f1f9248419440503fc1e173f5.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6ZqQIOmjjg==,size_20,color_FFFFFF,t_70,g_se,x_16)

### **6.2 通过knife4j测试接口**

1.  **在浏览器打开测试地址**

    http://127.0.0.1:8888/doc.html#/home
    

![在这里插入图片描述](https://img-blog.csdnimg.cn/1cadb719cd484bcb816ad5c641fc241f.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6ZqQIOmjjg==,size_20,color_FFFFFF,t_70,g_se,x_16)

2.  **测试列表接口**

![在这里插入图片描述](https://img-blog.csdnimg.cn/01aab9f5d7b746cfab2acc80b77e961e.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6ZqQIOmjjg==,size_20,color_FFFFFF,t_70,g_se,x_16)

    curl -X POST -H  "Accept:*/*" -H  "Content-Type:application/json" -d "{\"currentPage\":1,\"pageSize\":20}" "http://127.0.0.1:8888/menus/list"
    

3.  **测试新增接口**  
    ![在这里插入图片描述](https://img-blog.csdnimg.cn/ec4567b6c6fa436f8187279f253fa594.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6ZqQIOmjjg==,size_20,color_FFFFFF,t_70,g_se,x_16)

    curl -X POST -H  "Accept:*/*" -H  "Content-Type:application/json" -d "{\"createTime\":\"2021-10-03 15:58:38\",\"level\":2,\"name\":\"用户管理\",\"note\":\"用户管理操作\",\"updateTime\":\"2021-10-03 15:58:38\"}" "http://127.0.0.1:8888/menus/save"
    

**查看是否新增成功**  
![在这里插入图片描述](https://img-blog.csdnimg.cn/123ca488cf79486a8a1be769e43ee4a3.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6ZqQIOmjjg==,size_20,color_FFFFFF,t_70,g_se,x_16)

4.  **测试详情接口**  
    ![在这里插入图片描述](https://img-blog.csdnimg.cn/5afb2a5fca9a477d9734c19cd06de561.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6ZqQIOmjjg==,size_20,color_FFFFFF,t_70,g_se,x_16)

    curl -X POST -H  "Accept:*/*" -H  "Content-Type:application/json" -d "{\"id\":1502651873142775800}" "http://127.0.0.1:8888/menus/getOne"
    

5.  **测试删除接口**  
    ![在这里插入图片描述](https://img-blog.csdnimg.cn/0bfaebfd2d8f43bb8e084e5ce029fd7e.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6ZqQIOmjjg==,size_20,color_FFFFFF,t_70,g_se,x_16)

    curl -X POST -H  "Accept:*/*" -H  "Content-Type:application/json" -d "{\"id\":1502651873142775800}" "http://127.0.0.1:8888/menus/delete"
    

**查看是否删除成功**  
![在这里插入图片描述](https://img-blog.csdnimg.cn/43a0709eb661466980cbf21b4b911bd7.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6ZqQIOmjjg==,size_20,color_FFFFFF,t_70,g_se,x_16)

**7、源码地址**
----------

    https://gitee.com/yinfeng-code/test.git
    

**8、总结**
--------

> 这篇只是springboot入门项目，后面咱们可根据该项目逐步开发更多高深的企业级功能，包括starter的封装、数据操作变更日志、响应体包装等，欢迎老铁们追更。

**肝文不易，最后希望老铁们给波三连（点赞、收藏、评论）加关注，非常感谢大家支持~~**