// pages/msg/msg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: [],
    userid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      userid: options.id
    })
    wx.setNavigationBarTitle({
      title: '我的消息',
    })
    this.msg()
  },
  msg () {
    var _this = this
    wx.request({
      url: 'https://boss.zjifa.com.cn/member/msg?page=1&limit=200',
      data: {
        userId: _this.data.userid,
        page: 1,
        limit: 200
      },
      method: 'post',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success(p) {
        _this.setData({
          msg: p.data.data
        })
      }
    })
  },
  onShow: function () {
    var _this = this
    _this.msg()
  },
  gode: function(e) {
    var dt = e.currentTarget.dataset
    var id = dt.id
    wx.request({
      url: 'https://boss.zjifa.com.cn/member/readMsg',
      data: {
        id: id
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(p) {
        if (p.data.code === 0) {
          wx.navigateTo({
            url: '../msgde/inde?name=' + dt.title + '&content=' + dt.content,
          })
        } else {
          wx.showToast({
            title: p.data.msg,
            icon: 'none',
            image: '../../images/prompt_fill.png'
          })
        }
      }
    })
  }
})