// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cpList: [],
    page: 1,
    limit: 20,
    none: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this
    wx.setNavigationBarTitle({
      title: '企业搜索',
    })
    // 加载企业列表
    _this.company("")
  },
  company(name) {
    wx.showLoading({
      title: '加载中...',
    })
    var _this = this
    wx.request({
      url: 'https://boss.zjifa.com.cn/company/findList',
      data: {
        page: _this.data.page,
        limit: _this.data.limit,
        name: name
      },
      method: 'post',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success(p) {
        if (p.data.code === 0) {
          wx.hideLoading()
          _this.setData({
            cpList: p.data.data
          })
        }
      }
    })
  },
  godetial: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../comdetail/index?id=' + e.currentTarget.dataset.id,
    })
  },
  search: function (e) {
    this.company(e.detail.value)
  }
})