// pages/mine/index.js
const app = getApp()
var template = require('../../template/index.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid: '',
    avatar: '',
    username: '',
    phone:'',
    level: 0,
    unable_date: '',
    userInfo: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // 获取个人信息成功，然后处理剩下的业务或跳转首页
  setUserInfoAndNext(res) {
    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    // 所以此处加入 callback 以防止这种情况
    if (this.userInfoReadyCallback) {
      this.userInfoReadyCallback(res)
    }
    wx.hideLoading()
    // 跳转首页
    setTimeout(() => {
      wx.reLaunch({
        url: '../home/home'
      })
    }, 1000)
  },
  onLoad: function (options) {
    var _this = this
    template.tabbar("tabBar", 3, _this)
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        console.log(res.data.userInfo);
        _this.setData({
          userInfo: res.data.userInfo
        })
      },
    })
    wx.showLoading({
      title: '用户信息加载中...',
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
              var dt = p.data.data
              if (p.data.code == 0) {
                wx.hideLoading()
                _this.setData({
                  username: dt.username||'',
                  level: dt.level,
                  phone: dt.phone,
                  userid: dt.id,
                  unable_date: dt.effectiveTime||''
                })
              }
            }
          })
        }
      },
    })
  },
  gomsg: function (e) {
    // console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../msg/msg?id=' + e.currentTarget.dataset.id,
    })
  },
  gomyactivity: function (e) {
    // console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../myactivity/index?id=' + e.currentTarget.dataset.id,
    })
  },
  gomyapply: function (e) {
    // console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../myapply/index?id=' + e.currentTarget.dataset.id,
    })
  },
  goshoucang: function (e) {
    // console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../myshoucang/index?id=' + e.currentTarget.dataset.id,
    })
  },
  gocontactus: function (e) {
    // console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../contact/index?id=' + e.currentTarget.dataset.id,
    })
  },
  govipcenter: function () {
    wx.navigateTo({
      url: '../vipcenter/index',
    })
  }
})