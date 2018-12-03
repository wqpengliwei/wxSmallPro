
const CHARTS = require('../utils/wxcharts-min.js'); // 引入wx-charts.js文件
/**
 * 折线图
 * req：canvas的id、折线数组A，下标数组B
 * */
function lineShow(wqid, dataA, dataB) {
  console.log("------lineShow");
  let line = {
    canvasId: wqid, // canvas-id
    type: 'line', // 图表类型，可选值为pie, line, column, area, ring
    categories: dataB,
    series: [{ // 数据列表
      name: ' ',
      data: dataA
    }],
    yAxis: {
      min: 0 // Y轴起始值
    },
    width: 310,
    height: 200,
    dataLabel: true, // 是否在图表中显示数据内容值
    legend: false, // 是否显示图表下方各类别的标识
    extra: {
      lineStyle: 'straight' // (仅对line, area图表有效) 可选值：curve曲线，straight直线 (默认)
    }
  }
  new CHARTS(line);
}

module.exports = {
  lineShow: lineShow
}