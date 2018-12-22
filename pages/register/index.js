// pages/register/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    useravatar: '',
    showmobile: false,
    showcode: false,
    checked: false,
    sendcode: true,
    phone: '',
    code: '',
    openId: '',
    timer: '',
    msg: '获取验证码'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        console.log(res.data.userInfo);
        var userData = res.data.userInfo
        _this.setData({
          useravatar: userData.avatarUrl
        })
      },
    })
  },
  timers() {
    var _this = this
    clearInterval(_this.data.timer)
    var t = 60
    _this.data.timer = setInterval(function() {
      if (t >= 1) {
        t -= 1;
        console.log(_this.data.msg)
        _this.setData({
          msg: t + 's'
        })
      } else {
        _this.setData({
          msg: '获取验证码',
          sendcode: true
        })
      }
    }, 1000)
  },
  checkmobile(e) {
    var val = e.detail.value
    var reg = /^1(3|4|5|7|8|9)\d{9}$/
    if (reg.test(val)) {
      this.setData({
        phone: val,
        showmobile: true
      })
    } else {
      this.setData({
        phone: '',
        showmobile: false
      })
      wx.showModal({
        content: '输入的手机号码有误!',
        showCancel: false
      })
    }
  },
  sendcode(e) {
    var _this = this
    var reg = /^1(3|4|5|7|8)\d{9}$/
    var phone = _this.data.phone
    if (reg.test(_this.data.phone)) {
      if (_this.data.sendcode) {
        _this.setData({
          sendcode: false
        })
        wx.showLoading({
          title: '短信发送中...',
        })
        wx.request({
          url: 'https://boss.zjifa.com.cn/sendCode',
          data: {
            phone: phone,
            type: 4
          },
          method: 'post',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success(p) {
            if (p.data.code === 0) {
              wx.hideLoading();
              _this.timers()
            }
          }
        })
      } else {
        wx.showModal({
          content: '请稍后再试！',
        })
      }
    } else {
      wx.showModal({
        content: '请检查输入的手机号码是否有误！',
        showCancel: false
      })
    }
  },
  checkcode(e) {
    var val = e.detail.value
    var reg = /^\d{6}$/
    if (reg.test(val)) {
      this.setData({
        code: val,
        showcode: true
      })
    } else {
      this.setData({
        code: '',
        showcode: false
      })
      wx.showModal({
        content: '输入的验证码格式有误！',
        showCancel: false
      })
    }
  },
  radiochange(e) {
    if (this.data.checked) {
      this.setData({
        checked: false
      })
    } else {
      this.setData({
        checked: true
      })
    }
  },
  formSubmit: function(e) {
    var _this = this
    if (_this.data.showmobile && _this.data.showcode && _this.data.checked) {
      wx.showLoading({
        title: '正在绑定中...',
      })
      wx.login({
        success: function(res) {
          if (res.code) {
            wx.request({
              url: 'https://boss.zjifa.com.cn/member/login',
              data: {
                code: res.code
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              method: 'post',
              success(p) {
                if (p.data.code === 0) {
                  var openid = p.data.data.openid
                  wx.request({
                    url: 'https://boss.zjifa.com.cn/member/bindPhone',
                    data: {
                      openid: openid,
                      phone: _this.data.phone,
                      code: _this.data.code
                    },
                    method: 'post',
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    success(p) {
                      if (p.data.code === 0) {
                        wx.hideLoading()
                        wx.showModal({
                          content: p.data.msg,
                          showCancel: false,
                          success (res) {
                            if (res.confirm) {
                              wx.navigateTo({
                                url: '../main/index',
                              })
                            }
                          }
                        })
                      } else {
                        wx.hideLoading()
                        wx.showModal({
                          content: p.data.msg,
                          showCancel: false
                        })
                      }
                    }
                  })
                }
              }
            })
          }
        },
        fail: function(res) {},
        complete: function(res) {},
      })
    } else {
      if (!_this.data.checked) {
        wx.showModal({
          content: '请勾选同意协议！',
          showCancel: false
        })
      } else {
        wx.showModal({
          content: '请检查填写的绑定信息是否有误！',
          showCancel: false
        })
      }
    }
  },
  goxieyi: function () {
    wx.navigateTo({
      url: '../xieyi/index',
    })
  },
  skip: function (e) {
    console.log(e);
    wx.navigateTo({
      url: '../main/index',
    })
  }
})