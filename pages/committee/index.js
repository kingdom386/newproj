// pages/committee/index.js
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
    wx.setNavigationBarTitle({
      title: '分支机构',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
  coding: function () {
    wx.showModal({
      title: '信息提示',
      content: '模块功能正在开发中,尽请期待！',
      showCancel: false
    })
  }
})