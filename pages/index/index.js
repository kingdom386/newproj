// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarData: '../../images/avatar.jpg'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  goagree: function () {
    wx.navigateTo({
      url: '../agreement/index',
    })
  }
})