// pages/jinrong/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    imgData: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    wx.showLoading({
      title: '数据加载中...',
    })
    wx.request({
      url: 'https://boss.zjifa.com.cn/web/findList?',
      data: {
        position: 3
      },
      success(p) {
        if (p.data.code === 0) {
          console.log(p.data.data)
          wx.hideLoading()
          _this.setData({
            imgData: p.data.data
          })
        }
      }
    })
  },
  onReady: function () {
    var _this = this
    wx.request({
      url: 'https://boss.zjifa.com.cn/finance/findList',
      method: 'post',
      success (r) {
        if (r.data.code == 0) {
          _this.setData({
            listData: r.data.data
          })
        }
      }
    })
  },
  godetail: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../detail/index?id=' + id,
    })
  },
  goliucheng: function () {
    wx.navigateTo({
      url: '../jinrongliucheng/index',
    })
  }
})