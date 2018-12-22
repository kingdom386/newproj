// pages/activity/index.js
// const app = getApp()
var template = require('../../template/index.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    limit: 20,
    listData: [],
    total: 0,
    flag: true,
    showunderline: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    template.tabbar("tabBar", 1, _this)
    wx.showLoading({
      title: '数据加载中...',
    })
    this.activity()
  },
  activity () {
    var _this = this
    wx.request({
      url: 'https://boss.zjifa.com.cn/activity/findList',
      data: { page: _this.data.page, limit: _this.data.limit},
      method: 'get',
      success(r) {
        if (r.data.code == 0) {
          wx.hideLoading()
          _this.setData({
            listData: _this.data.listData.concat(r.data.data),
            total: r.data.page.pages
          })
        }
      }
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var _this = this
    console.log('用户开始上拉了')
    wx.showLoading({
      title: '加载数据中...',
    })
    if (_this.data.page < _this.data.total && _this.data.flag ) {
      _this.setData({
        page: _this.data.page += 1,
        flag: false
      })
      _this.activity()
    } else {
      setTimeout(function () {
        _this.setData({
          showunderline: true
        })
      }, 1400)
      wx.hideLoading()
    }
  },
  godetail: function (e) {
    // console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../activity_de/index?id=' + e.currentTarget.dataset.id,
    })
  }
})