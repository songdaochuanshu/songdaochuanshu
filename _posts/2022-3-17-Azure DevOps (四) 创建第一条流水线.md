---
layout: post
title: "Azure DevOps (四) 创建第一条流水线"
date: "2022-03-17T16:25:47.253Z"
---
Azure DevOps (四) 创建第一条流水线
=========================

前几篇文章，我们记录了一下azure代码仓库的使用，这篇开始，我们来搞一下azure的流水线。

流水线这个东西我觉得是devops中对于开发人员的灵魂组件，只要我们配置好了一次，剩下的所有部署都是自动化的了。

首先，在azure左侧的菜单中选择Pipelines，创建流水线。

![](https://img2022.cnblogs.com/blog/1417396/202203/1417396-20220315092234606-1328702825.png)

然后我们需要配置一下我们的代码仓库，第一条流水线，我们默认使用前几次演示的代码仓库。

![](https://img2022.cnblogs.com/blog/1417396/202203/1417396-20220315092406018-581118229.png)

因为我们这个代码仓库里保存的是一个springboot的简单应用，所以我们需要选择构建环境为maven，选择第一个最简单的配置就可以，剩下的我们日后在一个一个验证。

![](https://img2022.cnblogs.com/blog/1417396/202203/1417396-20220315092523350-1838401916.png)

这时候，azure会给我们生成一个流水线的yaml文件，里面包含着本次流水线的描述。

\# Maven
# Build your Java project and run tests with Apache Maven.
# Add steps that analyze code, save build artifacts, deploy, and more:
# https://docs.microsoft.com/azure/devops/pipelines/languages/java
trigger:
\- master

pool:
  vmImage: ubuntu\-latest

steps:
\- task: Maven@3
  inputs:
    mavenPomFile: 'pom.xml'
    mavenOptions: '\-Xmx3072m'
    javaHomeOption: 'JDKVersion'
    jdkVersionOption: '1.8'
    jdkArchitectureOption: 'x64'
    publishJUnitResults: true
    testResultsFiles: '\*\*/surefire-reports/TEST-\*.xml'
    goals: 'package'

**完成之后有一个注意事项，我们的流水线默认是没有配额的，我们需要申请一个免费的配额，申请的网址如下：https://aka.ms/azpipelines-parallelism-request**

**申请的过程需要2-3个工作日，所以需要提前把这个事儿给干了，当你申请成功之后，azure会给你发这个邮件。**

**![](https://img2022.cnblogs.com/blog/1417396/202203/1417396-20220317170340182-2086217618.png)**

**然后运行流水线，看一下最基本的编译效果**

**![](https://img2022.cnblogs.com/blog/1417396/202203/1417396-20220317164117574-739943906.png)**

**从上面的编译效果来看，我们的项目已经编译成功了，但是我们平常使用的肯定没有这么简单，接下来我们调整一下配置的参数，实现跳过单元测试以及实现配置阿里云的maven加速。**

**我们首先要在源代码中添加一个maven的配置文件，然后在运行的命令中指定配置文件，同时跳过单元测试：**

\# Maven
# Build your Java project and run tests with Apache Maven.
# Add steps that analyze code, save build artifacts, deploy, and more:
# https://docs.microsoft.com/azure/devops/pipelines/languages/java
trigger:
\- master

pool:
  vmImage: ubuntu\-latest

steps:
\- task: Maven@3
  inputs:
    mavenPomFile: 'webhook/pom.xml'
    mavenOptions: '\-Xmx3072m '
    javaHomeOption: 'JDKVersion'
    jdkVersionOption: '1.8'
    jdkArchitectureOption: 'x64'
    publishJUnitResults: true
    testResultsFiles: '\*\*/surefire-reports/TEST-\*.xml'
    goals: 'package -Dmaven.test.skip=true --settings webhook/setting.xml'

我们可以看到，再次编译的时候，流水线的maven走的已经是阿里云端的nexus了。

 ![](https://img2022.cnblogs.com/blog/1417396/202203/1417396-20220317165919105-1855849058.png)

今天的文章先到这里，下一步我们继续研究流水线的其他功能。