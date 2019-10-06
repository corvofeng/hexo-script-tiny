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

import "kity";
import "kityminder-core";
import { AddOnload } from "./util";

const kityminder = window.kityminder; // The kity has been imported as a window member.

function renderAllMindmap() {
  let mindmaps = document.getElementsByClassName('mindmap');

  var allMinders = [];

  for (var i = 0; i < mindmaps.length; i++) {
    let k = i;

    // 创建 km 实例
    const minder = new kityminder.Minder({
      renderTo: mindmaps[i],
    });

    allMinders.push(minder);

    // 隐藏原始属性
    const mindText = mindmaps[k].innerText;
    mindmaps[k].children[0].style = "display:none";

    minder.importData('markdown', mindText).then(function () {
      // console.log(minder === allMinders[k]);
      // console.log(allMinders[k]);
      minder.setTheme('fresh-soil');
      minder.execCommand('Zoom', 80);
    });
  }
}

AddOnload(renderAllMindmap);