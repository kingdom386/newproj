// pages/contact/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  gocall: function () {
    wx.makePhoneCall({
      phoneNumber: '0571-85261234',
      success (res) {
        console.log(res)
      }
    })
  },
  gettxt: function (e) {
    wx.setClipboardData({
      data: '78508100394837',
      success (res) {
        wx.showToast({
          title: '复制成功！',
          icon: 'none'
        })
      }
    })
  } 
})