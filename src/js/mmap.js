"use strict";
// vim: ts=2 sw=2 sts=2 et:
/*
 *=======================================================================
 *    Filename: mmap
 *
 *     Version: 1.0
 *  Created on: September 21, 2019
 *
 *      Author: corvo
 *=======================================================================
 */

// kity must be imported: https://github.com/fex-team/kityminder-core/issues/36
// const kity = require("../../node_modules/kity/dist/kity");
// require("../../node_modules/kityminder-core/dist/kityminder.core");
const kity = require("kity");
require("kityminder-core");
var kityminder = window.kityminder; // The kity has benn imported as a window member.
const $ = require("jquery");

function renderAllMindmap() {
  let mindmaps = document.getElementsByClassName('mindmap');

  var allMinders = [];

  for (var i = 0; i < mindmaps.length; i++) {
    let k = i;

    // 创建 km 实例
    var minder = new kityminder.Minder({
      renderTo: mindmaps[i],
    });

    allMinders.push(minder)

    // 隐藏原始属性
    var mindText = mindmaps[k].innerText
    mindmaps[k].children[0].style = "display:none"

    allMinders[k].importData('markdown', mindText).then(function () {
      // console.log(minder === allMinders[k]);
      // console.log(allMinders[k]);
      allMinders[k].setTheme('fresh-soil');
      allMinders[k].execCommand('Zoom', 80);
    });
  }
}

$(document).ready(function () {
  renderAllMindmap();
})