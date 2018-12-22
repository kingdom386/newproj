// pages/myactivity/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    page: 1,
    limit: 20,
    listData: [],
    curindex: '1',
    status: '0'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this
    _this.activity(options.id)
    _this.setData({
      id: options.id
    })
  },
  activity(id) {
    var _this = this
    wx.showLoading({
      title: '数据加载中...',
    })
    wx.request({
      url: 'https://boss.zjifa.com.cn/member/activity',
      data: {
        page: _this.data.page,
        limit: _this.data.limit,
        userId: id,
        status: _this.data.status
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success(p) {
        console.log(p.data)
        if (p.data.code === 0) {
          wx.hideLoading()
          if (p.data.count !== 0) {
            _this.setData({
              listData: p.data.data
            })
          } else {
            wx.showToast({
              title: p.data.msg,
              image: '../../images/prompt_fill.png'
            })
            _this.setData({
              listData: []
            })
          }
        }
      }
    })
  },
  changeindex: function(e) {
    var _this = this
    var index = e.currentTarget.dataset.index
    // console.log(typeof (index))
    if (index === '1') {
      _this.setData({
        status: '0',
        curindex: index
      })
    } else {
      _this.setData({
        status: '2',
        curindex: index
      })
    }
    _this.activity(_this.data.id)
  },
  godetail: function (e) {
    wx.navigateTo({
      url: '../activity_de/index?id=' + e.currentTarget.dataset.id,
    })
  }
})