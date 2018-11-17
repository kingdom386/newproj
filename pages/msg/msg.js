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
  onLoad: function (options) {
    console.log(options)
    this.setData({
      userid: options.id
    })
    var _this = this
    wx.setNavigationBarTitle({
      title: '我的消息',
    })
    wx.request({
      url: 'https://boss.zjifa.com.cn/member/msg?page=1&limit=200',
      data: { userId: _this.data.userid, page: 1, limit:200 },
      method: 'post',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      success(p) {
        _this.setData({
          msg: p.data.data
        })
      }
    })
  }
})