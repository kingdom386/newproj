// pages/comdetail/index.js
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cname: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options)
    wx.setNavigationBarTitle({
      title: '企业详情',
    })
    this.comdetail(options.id)
  },
  comdetail(i) {
    var _this = this
    wx.showLoading({
      title: '数据加载中...',
    })
    wx.request({
      url: 'https://boss.zjifa.com.cn/company/detail?id='+ i,
      data: {
        id: i
      },
      method: "post",
      success (r) {
        console.log(r)
        if (r.data.code === 0) {
          wx.hideLoading()
          var article = r.data.data.detail
          WxParse.wxParse('article', 'html', article, _this, 5)
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})