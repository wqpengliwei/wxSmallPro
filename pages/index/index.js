// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  goto_page:function(event){
    console.log(event);
    wx.navigateTo({
      url: event.currentTarget.dataset.url
    });
  }
})