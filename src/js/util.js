"use strict";
// vim: ts=2 sw=2 sts=2 et:


/**
 * Copy from: https://stackoverflow.com/a/40384916
 */
function AddOnload(fun) {
  var last = window.onload;
  window.onload = function () {
    if (last) last();
    fun();
  }
}

// generate uid
function uid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return 'uid_' + s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
}

export { AddOnload, uid };