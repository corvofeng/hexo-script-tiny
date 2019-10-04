"use strict";
// vim: ts=2 sw=2 sts=2 et:
/*
 *=======================================================================
 *    Filename: flow
 *
 *     Version: 1.0
 *  Created on: October 04, 2019
 *
 *      Author: corvo
 *=======================================================================
 */

import { AddOnload, uid } from "./util";
import * as flowchart from "flowchart.js";
import mermaid from "mermaid";

// return new div
function renderFlowchartjsWithSoure(divForRender, data) {
  const newDiv = document.createElement('div');
  divForRender.appendChild(newDiv);
  const diagram = flowchart.parse(data);
  // you can also try to pass options:
  const diagStyle = {
    'x': 0,
    'y': 0,
    'line-width': 3,
    'line-length': 50,
    'text-margin': 10,
    'font-size': 14,
    'font-color': 'black',
    'line-color': 'black',
    'element-color': 'black',
    'fill': 'white',
    'yes-text': 'yes',
    'no-text': 'no',
    'arrow-end': 'block',
    'scale': 1,
    // style symbol types
    'symbols': {
      'start': {
        'font-color': 'red',
        'element-color': 'green',
        'fill': 'yellow'
      },
      'end': {
        'class': 'end-element'
      }
    },
    // even flowstate support ;-)
    'flowstate': {
      'past': { 'fill': '#CCCCCC', 'font-size': 12 },
      'current': { 'fill': 'yellow', 'font-color': 'red', 'font-weight': 'bold' },
      'future': { 'fill': '#FFFF99' },
      'request': { 'fill': 'blue' },
      'invalid': { 'fill': '#444444' },
      'approved': { 'fill': '#58C4A3', 'font-size': 12, 'yes-text': 'APPROVED', 'no-text': 'n/a' },
      'rejected': { 'fill': '#C45879', 'font-size': 12, 'yes-text': 'n/a', 'no-text': 'REJECTED' }
    }
  };

  try {
    diagram.drawSVG(newDiv, diagStyle);
  } catch (err) {
    console.log("render flowchart: ", data, "with error: ", err);
  }
  return newDiv;
}

function renderMermaidWithSource(divForRender, data) {
  const newDiv = document.createElement('div');
  const tmpID = uid()
  newDiv.setAttribute('id', tmpID);
  divForRender.appendChild(newDiv);
  newDiv.setAttribute('class', 'mermaid');
  newDiv.innerHTML = data;

  // TODO: Change to mermaidAPI, currently the mermaidAPI render not work properly.
  // var insertSvg = function (svgCode, bindFunctions) {
  //   newDiv.innerHTML = svgCode;
  //   console.log(newDiv);
  // };
  // mermaid.mermaidAPI.render(tmpID, data, insertSvg);

  try {
    mermaid.init({ noteMargin: 10 }, `#${tmpID}`);
  } catch (err) {
    console.log("render mermaid: ", data, "with error:", err);
  }
  return newDiv;
}

/**
 * @param {*} codeDiv
 * @param {*} renderedFunc function(div, data)
 *    after create new div, use this function to render data to chart.
 */
function renderChart(codeDiv, renderFunc) {
  const parent = codeDiv.parentNode;
  const wrapper = document.createElement('pre');
  codeDiv.style.display = "none";
  parent.replaceChild(wrapper, codeDiv);
  wrapper.appendChild(codeDiv);
  renderFunc(wrapper, codeDiv.innerText);
}

function renderAllCharts() {
  let charts = [];
  charts = document.getElementsByClassName('flowchartjs-code');
  for (let i = 0; i < charts.length; i++) {
    const chartCodeDiv = charts[i];
    renderChart(chartCodeDiv, renderFlowchartjsWithSoure);
  }

  charts = document.getElementsByClassName('mermaid-code');
  for (let i = 0; i < charts.length; i++) {
    const chartCodeDiv = charts[i];
    renderChart(chartCodeDiv, renderMermaidWithSource);
  }
}

AddOnload(renderAllCharts);