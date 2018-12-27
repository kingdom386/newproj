// pages/zixuncenter/index.js
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: {},
    col: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  /**
   * WxParse.wxParse(bindName , type, data, target,imagePadding)
   * 1.bindName绑定的数据名(必填)
   * 2.type可以为html或者md(必填)
   * 3.data为传入的具体数据(必填)
   * 4.target为Page对象,一般为this(必填)
   * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
   */
  onLoad: function (options) {
    var _this = this
    _this.zixun(options.id)
  },
  zixun(id) {
    var _this = this
    wx.showLoading({
      title: '加载中...',
    })
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            url: 'https://boss.zjifa.com.cn/member/login',
            data: {
              code: res.code
            },
            method: 'post',
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            success(p) {
              var dt = p.data.data
              if (p.data.code == 0) {
                wx.request({
                  url: 'https://boss.zjifa.com.cn/information/detail',
                  data: {
                    id: id,
                    userId: p.data.data.id
                  },
                  method: 'post',
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  success(p) {
                    if (p.data.code === 0) {
                      wx.hideLoading()
                      _this.setData({
                        listData: p.data.data
                      })
                      var article = p.data.data.detail
                      WxParse.wxParse('article', 'html', article, _this, 5)
                    }
                  }
                })
              }
            }
          })
        }
      },
    })
  },
  collect: function (e) {
    var _this = this
    var id = e.currentTarget.dataset.id
    console.log(id)
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            url: 'https://boss.zjifa.com.cn/member/login',
            data: {
              code: res.code
            },
            method: 'post',
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            success(p) {
              var dt = p.data.data
              if (p.data.code == 0) {
                wx.request({
                  url: 'https://boss.zjifa.com.cn/information/collect',
                  data: {
                    userId: p.data.data.id,
                    id: id
                  },
                  success(res) {
                    console.log(res)
                    if (res.data.code === 0) {
                      // wx.showModal({
                      //   content: res.data.msg,
                      //   showCancel: false
                      // })
                      wx.showToast({
                        title: res.data.msg,
                        icon: 'none'
                      })
                      _this.setData({
                        col: false
                      })
                    } else {
                      wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                        image: '../../images/prompt_fill.png'
                      })
                    }
                  }
                })
              }
            }
          })
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})