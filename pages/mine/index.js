// pages/mine/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid: '',
    avatar: '',
    username: '',
    level: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    wx.setNavigationBarTitle({
      title: '个人中心',
    })
    wx.login({
      success: function(res) {
        if (res.code) {
          wx.request({
            url: 'https://boss.zjifa.com.cn/member/login',
            data: {code : res.code},
            method: 'post',
            header: { 'Content-Type': 'application/x-www-form-urlencoded' },
            success (p) {
              console.log(p.data.data)
              var dt = p.data.data
              console.log(dt)
              if (p.data.code == 0) {
                _this.setData({
                  username: dt.username,
                  level: dt.level,
                  userid: dt.id
                })
              }
            }
          })
        }
      },
    })
  }
})