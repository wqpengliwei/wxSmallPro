Page({
  data: {
    imgUrls: [
      {
        text: "123",
        imgUrl: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
      }, {
        text: "456",
        imgUrl: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
      }, {
        text: "789",
        imgUrl: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
      }
    ],
    indicatorDots: false,//是否显示面板指示点
    autoplay: false,//是否自动切换
    interval: 5000,//自动切换时间间隔
    duration: 1000, //滑动动画时长
    vertical: true, //滑动方向是否为纵向
    circular: true, //是否采用衔接滑动
    rightMove: 1000
  },
  onShow: function () {
    var _this=this;
    setInterval(function () {
      if (_this.data.rightMove > 0) {
        _this.setData({ rightMove: _this.data.rightMove - 20 });
      }
    }, 10);
  },
  bindchange: function (e) {
    console.log("============" + JSON.stringify(e.detail));
    this.setData({ rightMove: 1000 });
  }
})