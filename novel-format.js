// ==UserScript==
// @name         真白萌阅读样式优化
// @namespace    http://tampermonkey.net/
// @version      0.9
// @description  修改真白萌阅读样式
// @author       Cerallin <cerallin@cerallin.top>
// @match        https://masiro.me/admin/novelReading*
// @icon         https://www.google.com/s2/favicons?domain=masiro.me
// @require      https://cdn.bootcdn.net/ajax/libs/jquery/2.1.4/jquery.min.js
// @grant        GM_getValue
// ==/UserScript==

(function () {
  'use strict';

  // Your code here...
  const html = document.getElementsByTagName('html')[0];
  const style = document.createElement("style");
  style.innerHTML = `
@font-face {
  font-family: 'Noto Serif';
  src: url(https://blog-cdn.cerallin.top/fonts/NotoSerifSC/NotoSerifSC-Regular.otf) format('opentype');
  font-weight: 400;
  font-style: normal
}
.box-body p, .box-body span {
  line-height: 1.5em;
  font-family: 'Noto Serif', serif;
}

.box-body.nvl-content img {
  width: 80% !important;
  margin-top: .6em;
  margin-bottom: .6em;
}
`;
  html.appendChild(style);

  let node = $('.box-body.nvl-content')[0];
  let stack = [node];
  // DFS
  while (node = stack.pop()) {
    stack = stack.concat(Array.prototype.slice.call(node.children))
    let cur = $(node);
    cur.removeAttr('style');
    if (cur.is('br') && cur.prev().is('br') && cur.prev().prev().is('br'))
      cur.remove();
  }
})();