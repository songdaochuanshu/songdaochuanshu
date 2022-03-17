---
layout: post
title: "elasticsearch高亮之highlight原理"
date: "2022-03-17T04:23:11.931Z"
---
elasticsearch高亮之highlight原理
===========================

一、highlight简介

highlight是提升用户体验的重要手段，搜索引擎通过高亮突出命中关键字等方式，方便用户通过关键字周围的信息快速的确认是否是自己希望的结果；

highlight功能通常包含以下三个主要的处理过程  
1.将字段文本拆分为小的片段；  
2.找出最相关的片段；  
3.高亮查询关键字；

二、elasticsearch的highlight功能

elasticsearch提供了专门的高亮请求参数highlight，返回的记过中也会包含对应的高亮信息；

在查询语句中，我们要求对text字段进行高亮处理；

    GET /twitter/_search
    {
      "query": {
        "match": {
          "text": "Another"
        }
      },
      "highlight": {
        "fields": {
          "text": {}
        }
      }
    }
    
    

elasticsearch默认使用em对命中关键字进行包裹处理；

    {
      "took" : 1,
      "timed_out" : false,
      "_shards" : {
        "total" : 1,
        "successful" : 1,
        "skipped" : 0,
        "failed" : 0
      },
      "hits" : {
        "total" : 1,
        "max_score" : 0.6931472,
        "hits" : [
          {
            "_index" : "twitter",
            "_type" : "_doc",
            "_id" : "2",
            "_score" : 0.6931472,
            "_source" : {
              "fullname" : "Jane Doe",
              "text" : "Another twitter test ..."
            },
            "highlight" : {
              "text" : [
                "<em>Another</em> twitter test ..."
              ]
            }
          }
        ]
      }
    }
    
    

高亮处理需要使用原始的字段值文本，所以elasticsearch需要保存字段的值，我们可以在字段的mapping中设置store为true，否则只能从\_source字段中load对应字段值；

三、elasticsearch提供的三种highlighter

elasticsearch提供了以下三种highlighter

Unified highlighter

这个unified highlighter是elasticsearch的默认highlighter，其使用的是Lucene Unified Highlighter，它会将文本分割为句子片段，然后使用BM25算法计算每个句子片段的相似性得分；改highlighter支持phrase、fuzzy、prefix等查询的高亮处理；

Plain highlighter

这个plain Highlighter使用的是标准的lucene Highlighter，其通过关键字的重要性及关键字的位置信息，尝试尽量的体现查询的匹配逻辑；

为了更加准确的体现查询的逻辑，Plain Highlighter需要针对具体的查询和命中文档的每个字段进行实时的计算，其会在内存中创建一个小型的index，然后通过查询计划重新执行一遍查询，从而获得高亮需要使用底层的匹配信息，所以其比较适合小型的字段；

Fast vector highlighter

这个fvh Highlighter使用的是Lucene Fast Vector Highlighter，其基于term\_vector的数据结构，需要在mapping中将相应的字段设置为with\_positions\_offsets;其比较适合对大文本字段进行高亮处理；

四、Highlighter的高亮处理过程

Highlighter的主要工作就是通过传入的查询和命中的文档，找到能够最好反应匹配相关性的高亮片段；其主要需要完成以下三个工作；

1.将文本查分为小的高亮片段  
本阶段主要将字段值文本拆分为小的高亮片段，三种Highlighter的处理过程如下

Plain Highlighter首先使用字段对应的analyzer对文本进行分词处理，然后通过得到的每个分词的起止字符位置，依次截取fragment\_size的文本段；由于根据固定的片段长度拆分，得到的片段效果往往很不理想；

Unified和fvh Highlighter都通过Java的BreakIterator进行拆分高亮片段，配合fragment\_size可以得到比较完整的句子；

2.找到最相关的高亮片段；

本阶段主要通过实际命中记录的查询关键字，对得到的高亮片段进行打分，从而找到跟查询最相关的高亮片段；

要计算高亮片段的匹配情况，有两种主要的方式

1.  高亮处理的时候实时计算匹配情况，这样就需要针对每个高亮片段创建临时索引，并执行查询语句来获取匹配信息；
2.  index的时候进行相关分词起止字符的统计信息处理和保存；

*   postings list，在字段mapping的时候，可以通过index\_options来控制记录到倒排索引中的分词统计信息，通过设置offsets可以保存记录分词的起止信息；
*   term vector，elasticsearch提供的term\_vector也记录了分词过程中产生的分词的起止信息，也是在字段mapping的时候进行设置，需要设置为with\_positions\_offsets；

三种Highlighter的处理过程如下

Plain Highlighter首先会利用高亮片段生成的分词在内存中创建一个index，并通过lucene查询计划执行原始的查询，然后通过命中信息获得匹配的分词，通过计算高亮片段的包含的不同查询分词的数量计算相关性得分；这里直接使用查询分词的boost(默认值)进行计算；

fvh Highlighter直接利用index的时候创建的term vector来得到高亮片段匹配的查询分词，其对高亮片段的评分算法跟Plain Highlighter类似，只不过这里会将命中的所有查询分词(包括重复的查询分词)计算在内；

unified Highlighter会尝试优先使用term vectors，index中的postings list，否则只能跟plain Highlighter相同的方式进行实时计算；其使用BM25算法计算高亮片段的相似度；

3.Highlight高亮片段；

本阶段主要进行输出前的编码和格式化，最后使用pre-tags、post-tags来包裹高亮片段中的查询关键字；