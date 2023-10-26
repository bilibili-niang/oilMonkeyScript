// ==UserScript==
// @name         百度贴吧ui美化
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  美化你的贴吧UI
// @author       张嘉凯
// @homepageURL  https://github.com/codelumos/tampermonkey-scripts
// @match       https://tieba.baidu.com/*
// @icon         https://www.baidu.com/favicon.ico
// @grant        none
// @require      https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js
// @require      http://localhost:89/less.js
// ==/UserScript==
$(document).ready(() => {
  console.log("PageData.forum.id:");
  console.log(PageData.forum.id);
  if (PageData.forum.id == "2173925") {
    console.log("贴吧美化开始~");
    addStyle();
  }
  // removeElement();
});


/**
 * css隐藏某些元素
 */
const addStyle = function () {
  console.log("addStyle");
  // 动态加载远程Less文件
  $.ajax({
    // url: "https://blog.icestone.work/index.less", // 替换为实际的Less文件URL
    url: "http://localhost:89/index.less", // 替换为实际的Less文件URL
    dataType: "text",
    success: function (lessCode) {
      console.log("远程less加载成功");
      // 创建style标签用于插入解析后的CSS代码
      const styleNode = document.createElement("style");
      styleNode.setAttribute("type", "text/css");

      // 使用Less.js解析Less代码并插入到style标签中
      less.render(lessCode, function (err, output) {
        if (err) {
          console.error("Less解析错误:", err);
          return;
        }
        styleNode.textContent = output.css;
      });

      // 将style标签添加到页面头部
      document.head.appendChild(styleNode);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error("加载Less文件失败:", textStatus, errorThrown);
    }
  });
};

/**
 * js移除指定元素
 */
const removeElement = function () {
  const classList = [".tbui_fbar_auxiliaryCare", ".gift-goin", "#head", "#com_userbar", "#pagelet_encourage-celebrity/pagelet/celebrity"];
  $.each(classList, function (index, className) {
    $(`${className}`).remove();
  });

};