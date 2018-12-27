// pages/apply/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: '获取验证码',
    typename: '',
    timer: null,
    showxuqiu: false,
    showusername: false,
    showmobile: false,
    showcode: false,
    sendcode: true,
    demand: '',
    username: '',
    phone: '',
    id: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var _this = this
    _this.setData({
      typename: options.name,
      id: options.id
    })
    _this.getData(options)
  },
  getData (obj) {
    var _this = this
    wx.request({
      url: 'https://boss.zjifa.com.cn/member/invertDetail',
      data: {
        invertId: obj.id,
        userId: obj.userid
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(p) {
        if (p.data.code === 0) {
          var dt = p.data.data
          console.log(dt)
          _this.setData({
            demand: dt.demand,
            username: dt.username,
            phone: dt.phone,
            showxuqiu: true,
            showusername: true,
            showmobile: true,
          })
        }
      }
    })
  },
  timers() {
    var _this = this
    clearInterval(_this.data.timer)
    var t = 60
    _this.data.timer = setInterval(function () {
      if (t >= 1) {
        t -= 1;
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
  checkxuqiu: function (e) {
    var _this = this
    var val = e.detail.value
    if (val) {
      _this.setData({
        demand: val,
        showxuqiu: true
      })
    } else {
      _this.setData({
        demand: '',
        showxuqiu: false
      })
    }
  },
  checkusername: function (e) {
    var _this = this
    var val = e.detail.value
    if (val) {
      _this.setData({
        username: val,
        showusername: true
      })
    } else {
      _this.setData({
        username: '',
        showusername: false
      })
    }
  },
  checkmobile(e) {
    var val = e.detail.value
    var reg = /^1(3|4|5|7|8)\d{9}$/
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
            type: 1
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
        wx.showToast({
          title: '请稍后再试！',
          icon: 'none'
        })
      }
    } else {
      wx.showToast({
        title: '请检查输入的手机号码是否有误！',
        icon: 'none'
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
    }
  },
  formSubmit(e) {
    var _this = this
    if (!_this.data.showxuqiu) {
      wx.showToast({
        title: '请输入服务需求',
        icon: 'none'
      })
      return false;
    }

    if (!_this.data.showusername) {
      wx.showToast({
        title: '请输入联系人',
        icon: 'none'
      })
      return false;
    }

    if (!_this.data.showmobile) {
      wx.showToast({
        title: '请输入手机号码',
        icon: 'none'
      })
      return false;
    }
    // if (!_this.data.showcode) {
    //   wx.showToast({
    //     title: '请输入手机验证码',
    //     icon: 'none'
    //   })
    //   return false;
    // }
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
            success(r) {
              _this.setData({
                openid: r.data.data.openid
              })
              wx.request({
                url: 'https://boss.zjifa.com.cn/invert/form',
                data: {
                  type: _this.data.id,
                  demand: _this.data.demand,
                  username: _this.data.username,
                  phone: _this.data.phone,
                  userId: r.data.data.id,
                  code: _this.data.code
                },
                method: 'post',
                header: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                success(p) {
                  if (p.data.code === 0) {
                    console.log(p.data.data)
                    wx.showToast({
                      title: p.data.msg,
                      icon: 'none'
                    })
                    setTimeout(function () {
                      wx.navigateTo({
                        url: '../mine/index',
                      })
                    }, 1600)
                  } else {
                    wx.showToast({
                      title: p.data.msg,
                      icon: 'none'
                    })
                  }
                },
                fail(f) {
                  cosole.log('f')
                  console.log(f)
                }
              })
            }
          })
        }
      }
    })
  }
})