// pages/myshoucang/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    page: 1,
    limit: 200,
    listData: [],
    curindex: '1',
    types: 1,
    status: '0'
  },
  onLoad: function(options) {
    console.log(options.id)
    var _this = this
    _this.setData({
      id: options.id
    })
    _this.shoucang()
  },
  shoucang() {
    var _this = this
    wx.showLoading({
      title: '数据加载中...',
    })
    wx.request({
      url: 'https://boss.zjifa.com.cn/member/activityCollect',
      data: {
        page: _this.data.page,
        limit: _this.data.limit,
        userId: _this.data.id
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(p) {
        // console.log(p)
        if (p.data.code === 0) {
          wx.hideLoading()
          _this.setData({
            listData: p.data.data,
            types: 1
          })
        }
      }
    })
  },
  zixun() {
    var _this = this
    wx.showLoading({
      title: '数据加载中...',
    })
    wx.request({
      url: 'https://boss.zjifa.com.cn/member/informationCollect',
      data: {
        page: _this.data.page,
        limit: _this.data.limit,
        userId: _this.data.id
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(p) {
        if (p.data.code === 0) {
          if (p.data.count === 0) {
            wx.showToast({
              title: p.data.msg,
              duration: 2000,
              image: '../../images/prompt_fill.png'
            })
          }
          wx.hideLoading()
          _this.setData({
            listData: p.data.data,
            types: 2
          })
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
      _this.shoucang()
    } else {
      _this.setData({
        status: '2',
        curindex: index
      })
      _this.zixun()
    }
  },
  godetail: function (e) {
    var t = e.currentTarget.dataset.types
    if (t === 1) {
      wx.navigateTo({
        url: '../activity_de/index?id=' + e.currentTarget.dataset.id,
      })
    } else {
      wx.navigateTo({
        url: '../zixuncenter/index?id=' + e.currentTarget.dataset.id,
      })
    }
    
  }
})