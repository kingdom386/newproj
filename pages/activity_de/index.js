// pages/activity_de/index.js
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    collection: true,
    details: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this
    wx.setNavigationBarTitle({
      title: '活动详情',
    })
    wx.showLoading({
      title: '数据加载中...',
    })
    // console.log(options.id)
    wx.login({
      success: function(res) {
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
                  url: 'https://boss.zjifa.com.cn/activity/detail?id=' + options.id + '&userId=' + p.data.data.id,
                  method: 'get',
                  success(p) {
                    if (p.data.code === 0) {
                      wx.hideLoading()
                      var article = p.data.data.detail
                      WxParse.wxParse('article', 'html', article, _this, 5)
                      _this.setData({
                        listData: p.data.data
                      })
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
  gode: function(e) {
    console.log(e);
  },
  // 收藏
  gocollection: function(e) {
    var _this = this
    var id = e.currentTarget.dataset.id
    console.log(id)
    wx.showLoading({
      title: '数据执行中...',
    })
    wx.login({
      success: function(res) {
        wx.request({
          url: 'https://boss.zjifa.com.cn/member/login',
          data: {
            code: res.code
          },
          method: 'post',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success(p) {
            if (p.data.code === 0) {
              wx.hideLoading()
              var userId = p.data.data.id
              wx.request({
                url: 'https://boss.zjifa.com.cn/activity/collect',
                data: {
                  userId: userId,
                  id: id
                },
                method: 'get',
                success(p) {
                  console.log(p)
                  if (p.data.code === 0) {
                    wx.showModal({
                      content: p.data.msg,
                      showCancel: false
                    })
                    _this.setData({
                      collection: false
                    })
                  } else {
                    wx.showModal({
                      content: p.data.msg,
                      showCancel: false
                    })
                    _this.setData({
                      collection: true
                    })
                  }
                }
              })
            }
          }
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  gomap: function(e) {
    var obj = e.currentTarget.dataset
    wx.openLocation({
      latitude: parseFloat(obj.lng),
      longitude: parseFloat(obj.lat),
      name: obj.name
    })
  },
  gopay: function(e) {
    var fee = e.currentTarget.dataset.pay
    wx.showLoading({
      title: '正在报名中...',
    })
    wx.login({
      success(res) {
        console.log(res.code)
        wx.request({
          url: 'https://boss.zjifa.com.cn/member/login',
          data: {
            code: res.code
          },
          method: 'post',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success(p) {
            if (p.data.code === 0) {
              // console.log(p.data.data.phone)
              wx.hideLoading()
              var phone = p.data.data.phone
              var openid = p.data.data.openid
              var id = e.currentTarget.dataset.id
              if (phone) {
                wx.request({
                  url: 'https://boss.zjifa.com.cn/activity/signUp',
                  data: {
                    openid: openid,
                    id: id
                  },
                  method: 'get',
                  success(p) {
                    if (p.data.code === 0) {
                      console.log(p.data.data)
                      wx.showModal({
                        content: '报名成功！',
                        showCancel: false,
                        success(res) {
                          wx.navigateTo({
                            url: '../pay/index?fee=' + fee + '&orderId=' + encodeURIComponent(JSON.stringify(p.data.data)) + '&payType=2'
                          })
                        }
                      })
                    } else {
                      wx.showModal({
                        content: p.data.msg,
                        showCancel: false
                      })
                    }
                  }
                })
              } else {
                wx.showModal({
                  content: '请绑定手机号码！',
                  showCancel: false,
                  success(res) {
                    if (res.confirm) {
                      wx.navigateTo({
                        url: '../register/index',
                      })
                    }
                  }
                })
              }
            }
          }
        })
      }
    })
  }
})