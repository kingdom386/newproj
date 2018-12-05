// pages/vipcenter/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    autoplay: false,
    indicatorDots: false,
    interval: 9999999999,
    duration: 600,
    circular: true,
    curIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '会员中心',
    })
  },
  swichpage: function (ev) {
    console.log(typeof (ev.currentTarget.dataset.index))
    this.setData({
      value: ev.currentTarget.dataset.index
    })
  },
  apply: function (ev) {
    var jb = ev.currentTarget.dataset.jb
    wx.navigateTo({
      url: '../apply/index?jb=' + jb,
    })
  },
  intervalChange: function (e) {
    console.log(11);
    console.log(typeof (e.detail.current));
    this.setData({
      curIndex: parseInt(e.detail.current)
    })
  }
})