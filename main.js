const scraperjs = require("scraperjs");
const fs = require("fs");
const path = require("path");
const TurndownService = require("turndown");
const turndownService = new TurndownService({});

require("dotenv").config();

const { POST_URL } = process.env;

scraperjs.StaticScraper.create(POST_URL)
  .scrape(function ($) {
    return $(".post-item")
      .map(function () {
        $(this).find("footer").remove();
        let title = $(this).find(".post-item-title").text();
        let href = $(this).find(".post-item-title").attr("href");
        scraperjs.StaticScraper.create(href)
          .scrape(function (q) {
            return q(".post")
              .map(function () {
                q(this).find(".postDesc").remove();
                q(this).find("#cb_post_title_url").attr("href", ``);
                return q(this).html();
              })
              .get();
          })
          .then(function (data) {
            if (!fs.existsSync(path.join(__dirname, "source/_posts"))) {
              fs.mkdirSync(path.join(__dirname, "source/_posts"));
            }
            writeFile(
              path.join(__dirname, "source/_posts", `${filterText(hash(title))}`),
              addPost(title) + turndownService.turndown(data[0])
            );
          });

        return $(this).html();
      })
      .get();
  })
  .then((news) => {});

function writeFile(filePath, data) {
  fs.writeFile(filePath, data, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("success");
    }
  });
}

function filterText(text) {
  return `${text}.md`;
}

function addPost(title) {
  let content = `---
layout: post
title: "${title}"
date: "${new Date().toISOString()}"
---
`;
  return content;
}

function hash(str) {
  var hash = 5381,
    i = str.length;
  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }
  return hash >>> 0;
}
