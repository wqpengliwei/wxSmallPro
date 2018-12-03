// pages/budejie/index.js
var requests = require('../../requests/request.js');
Page({
  data: {
    topTabItems: ["全部"],
    listItems: [],
    videoShow: false,
    images:{}
  },
  imageLoad: function (e) {
    var $width = e.detail.width,    //获取图片真实宽度
      $height = e.detail.height,
      ratio = $width / $height;    //图片的真实宽高比例
    var viewWidth = 718,           //设置图片显示宽度，左右留有16rpx边距
      viewHeight = 718 / ratio;    //计算的高度值
    var image = this.data.images;
    //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
    image[e.currentTarget.dataset.index] = {
      width: viewWidth,
      height: viewHeight
    }
    this.setData({
      images: image
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    requests.request(
      "https://api.budejie.com/api/api_open.php?a=list&c=data&type=1",
      "",
      function (data) {
        //console.log("data=" + JSON.stringify(data))
        _this.setData({
          listItems: data.list
        })
      })
  },
  clickItem: function (event) {
    console.log("----event=" + JSON.stringify(event));
    if (event.target.dataset.url != "") {
      this.setData({
        videoUrl: event.target.dataset.url,
        videoShow: true
      })
    }

  },
  clickVideo: function () {
    console.log("clickVideo");
    this.setData({
      videoClick: "1"
    })
  },
  clickVideo_v: function () {
    console.log("this.data.videoClick=" + this.data.videoClick);
    if (this.data.videoClick != 1) {
      this.setData({
        videoUrl: "",
        videoShow: false
      })
    }
    this.setData({
      videoClick: "0"
    })

  }
})