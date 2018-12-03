var app = getApp()
Page({
  data: {
    latitude: '',
    longitude: ''
  },
  onShow: function () {
    var that = this
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        console.log("res=" + res)
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude
        })
      }
    })
  }
})