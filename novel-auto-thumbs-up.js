// ==UserScript==
// @name         真白萌自动点赞
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  为小说自动点赞
// @author       Cerallin <cerallin@cerallin.top>
// @match        https://masiro.me/*
// @require      https://cdn.bootcdn.net/ajax/libs/jquery/2.1.4/jquery.min.js
// @icon         https://www.google.com/s2/favicons?domain=masiro.me
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  let that = $('.do-thumbs-up2')
  // 点过赞了，溜了溜了
  if (!that.length) return;

  $.post(
    "/admin/doThumbUp",
    {
      "id": that.attr('data-id'),
      "type": that.attr('data-type'),
      "_token": $('.csrf').val()
    },
    function (res) {
      if (res.code !== 1) {
        layer.msg(res.msg, { icon: 2 });
        return;
      }

      that.removeClass('do-thumbs-up2');
      that.addClass('cancel-thumbs-up2');
      that.find("span").text(res.num);

      let found = $(".thumbs-up", "#smallThumb");
      found.removeClass('do-thumbs-up');
      found.addClass('cancel-thumbs-up');
      found.children(":first").html("(" + res.num + ")");
    },
    'json');

})();