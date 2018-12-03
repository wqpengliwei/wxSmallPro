//index.js
var wqtool = require('../../requests/wqtool.js');
//获取应用实例
var app = getApp()
var day = ["今天", "明天", "后天"];
Page({
  data: {
    day: day,
  },

  onLoad: function () {
    //console.log('------onLoad')
    var that = this
    that.getLocation();
  },

  //获取经纬度方法
  getLocation: function () {
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        console.log("------lat:" + latitude + " lon:" + longitude);
        that.getCity(latitude, longitude);
      }
    })
  },

  //获取城市信息
  getCity: function (latitude, longitude) {
    var that = this
    var url = "https://api.map.baidu.com/geocoder/v2/";
    var params = {
      ak: "jG0V2dro1at7sPpV1yHjfaQYYL4WXrXE",
      output: "json",
      location: latitude + "," + longitude
    }
    wx.request({
      url: url,
      data: params,
      success: function (res) {
        //console.log("------得到的locaton=" + JSON.stringify(res.data));
        var city = res.data.result.addressComponent.city;
        var district = res.data.result.addressComponent.district;
        var street = res.data.result.addressComponent.street;

        that.setData({
          city: city,
          district: district,
          street: street,
        })

        var descCity = city.substring(0, city.length - 1);
        that.getWeahter(descCity);
        that.getNowWeather(descCity);
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  //获取天气信息
  getWeahter: function (city) {
    //console.log("------getWeahter=>city=" + city);
    var that = this
    var url = "https://free-api.heweather.com/v5/weather"
    var params = {
      city: city,
      key: "894fc2a749104d679fa022c3e71afe83"
    }
    wx.request({
      url: url,
      data: params,
      success: function (res) {
        //console.log("------getWeahter=" + JSON.stringify(res.data));
        var tmp = res.data.HeWeather5[0].now.tmp;
        var txt = res.data.HeWeather5[0].now.cond.txt;
        var code = res.data.HeWeather5[0].now.cond.code;
        var qlty = res.data.HeWeather5[0].aqi.city.qlty;
        var dir = res.data.HeWeather5[0].now.wind.dir;
        var sc = res.data.HeWeather5[0].now.wind.sc;
        var hum = res.data.HeWeather5[0].now.hum;
        var fl = res.data.HeWeather5[0].now.fl;
        var daily_forecast = res.data.HeWeather5[0].daily_forecast;
        that.setData({
          tmp: tmp + "°",
          txt: txt,
          code: code,
          qlty: qlty,
          dir: dir,
          sc: sc + "级",
          hum: hum + "%",
          fl: fl + "°",
          canvasTitle: "逐小时预报",
          update_time: "更新时间：" + res.data.HeWeather5[0].basic.update.loc,
          daily_forecast: daily_forecast
        });
        var hourly = res.data.HeWeather5[0].hourly_forecast;
        var wqA = [];
        var wqB = [];
        for (var i in hourly){
          wqA.push(hourly[i].tmp);
          wqB.push(hourly[i].date.substring(12));
        };
        wqtool.lineShow('lineGraph', wqA, wqB);
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  getNowWeather: function (city) {
    //console.log("------getNowWeather:" + city);
    var that = this
    var url = "https://free-api.heweather.com/s6/weather/now?parameters"
    var params = {
      location: city,
      key: "0cbe9e99705941aaa5ee2020d9ec3410"
    }
    wx.request({
      url: url,
      data: params,
      success: function (res) {
        //console.log("------getNowWeather=" + JSON.stringify(res.data));
        var tmp1 = res.data.HeWeather6[0].now.tmp;
        var txt1 = res.data.HeWeather6[0].now.cond_txt;
        that.setData({
          tmp: tmp1 + "°",
          txt: txt1
        })
      }
    })
  }

})