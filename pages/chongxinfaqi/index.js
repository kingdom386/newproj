// pages/jinrongshenqing/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    region: ['请选择所属区域'],
    qyjs: [],
    front: [],
    back: [],
    yyzz: [],
    xycx: [],
    rzf: [],
    financeId: '',
    company: '',
    money: '',
    province: '',
    city: '',
    time: '',
    purpose: '',
    username: '',
    phone: '',
    code: '',
    introduce: '',
    idcardFront: '',
    idcardBack: '',
    businessLicense: '',
    authorization: '',
    finance: '',
    addTime: '',
    status: '',
    userId: '',
    code: '',
    msg: '获取验证码',
    a: false,
    b: false,
    c: false,
    d: false,
    f: false,
    g: false,
    h: false,
    i: false,
    showidcardfront: true,
    showidcardback: true,
    showyyzz: true,
    showxycx: true,
    showrzf: true,
    showcode: false,
    ag: false,
    sendcode: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '产品申请',
    })
    this.data.financeId = options.id
    this.getdata(options)
  },
  getdata(options) {
    var _this = this
    wx.showLoading({
      title: '获取数据中...',
    })
    wx.request({
      url: 'https://boss.zjifa.com.cn/member/financeDetail',
      data: {
        financeId: options.id,
        userId: options.userid
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(p) {
        console.log(p.data.data)
        if (p.data.code === 0) {
          var dt = p.data.data
          wx.hideLoading();
          _this.setData({
            company: dt.company,
            money: dt.money,
            region: dt.address.match(/.+?(省|市|自治区|自治州|县|区)/g),
            time: dt.time,
            purpose: dt.purpose,
            username: dt.username,
            phone: dt.phone,
            a: true,
            b: true,
            c: true,
            d: true,
            e: true,
            f: true,
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
  chooseImage: function (e) {
    var that = this;
    var tp = e.currentTarget.dataset.img
    var imgurl = ''
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'https://boss.zjifa.com.cn/file/uploadFile',
          filePath: tempFilePaths[0],
          name: 'file',
          success(d) {
            console.log(typeof (JSON.parse(d.data)))
            var resp = JSON.parse(d.data)
            imgurl = resp.data
            if (resp.code === 0) {
              if (tp == 'front') {
                that.setData({
                  front: that.data.front.concat(res.tempFilePaths),
                  showidcardfront: false,
                  idcardFront: imgurl
                });
              }
              if (tp == 'back') {
                that.setData({
                  back: that.data.back.concat(res.tempFilePaths),
                  showidcardback: false,
                  idcardBack: imgurl
                });
              }
              if (tp == 'yyzz') {
                that.setData({
                  yyzz: that.data.yyzz.concat(res.tempFilePaths),
                  showyyzz: false,
                  businessLicense: imgurl
                });
              }
              if (tp == 'xycx') {
                that.setData({
                  xycx: that.data.xycx.concat(res.tempFilePaths),
                  showxycx: false,
                  authorization: imgurl
                });
              }
              if (tp == 'rzf') {
                that.setData({
                  rzf: that.data.rzf.concat(res.tempFilePaths),
                  showrzf: false,
                  finance: imgurl
                });
              }
            }
          }
        })
      }
    })
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value,
      province: e.detail.value[0],
      city: e.detail.value[1],
    })
  },
  cmp: function (e) {
    var _this = this
    var val = e.detail.value
    if (val) {
      _this.setData({
        company: val
      })
      _this.setData({
        a: true
      })
    } else {
      _this.setData({
        a: false
      })
    }
  },
  mny: function (e) {
    var _this = this
    var val = e.detail.value
    if (val) {
      this.setData({
        money: val
      })
      _this.setData({
        b: true
      })
    } else {
      _this.setData({
        b: false
      })
    }
  },
  tme: function (e) {
    var _this = this
    var reg = /^\d+$/
    var val = e.detail.value
    if (reg.test(val)) {
      this.setData({
        time: val,
        c: true
      })
    } else {
      _this.setData({
        time: '',
        c: false
      })
    }
  },
  pur: function (e) {
    var _this = this
    var val = e.detail.value
    if (val) {
      this.setData({
        purpose: val,
        d: true
      })
    } else {
      this.setData({
        purpose: '',
        d: false
      })
    }
  },
  nme: function (e) {
    var _this = this
    var val = e.detail.value
    if (val) {
      this.setData({
        username: val,
        e: true
      })
    } else {
      this.setData({
        username: '',
        e: false
      })
    }
  },
  phn: function (e) {
    var reg = /^1(3|4|5|7|8)\d{9}$/
    var _this = this
    var val = e.detail.value
    if (reg.test(val)) {
      this.setData({
        phone: val,
        f: true
      })
    } else {
      this.setData({
        phone: val,
        f: false
      })
    }
  },
  checkcode: function (e) {
    var val = e.detail.value
    var reg = /^\d{6}$/
    if (reg.test(val)) {
      this.setData({
        code: val,
        g: true,
      })
    } else {
      this.setData({
        code: '',
        g: false
      })
    }
  },
  radiochange: function (e) {
    console.log(e.detail.value)
    if (e.detail.value.length > 0) {
      this.setData({
        ag: true
      })
    } else {
      this.setData({
        ag: false
      })
    }
  },
  goxieyi: function () {
    wx.navigateTo({
      url: '../mianze/index',
    })
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
        wx.showToast({
          title: '请稍后再试！',
          icon: 'none'
        })
      }
    } else {
      wx.showToast({
        title: '请检查手机号码!',
        icon: 'none'
      })
    }
  },
  formSubmit: function (e) {
    var _this = this
    if (!_this.data.a) {
      wx.showToast({
        title: '请输入融资主体信息!',
        icon: 'none'
      })
      return false;
    }
    if (!_this.data.b) {
      wx.showToast({
        title: '请输入融资金额!',
        icon: 'none'
      })
      return false;
    }
    // console.log(_this.data.region)
    if (_this.data.region.length <= 1) {
      wx.showToast({
        title: '请选择地区!',
        icon: 'none'
      })
      return false;
    }

    if (!_this.data.c) {
      wx.showToast({
        title: '请输入融资期限!',
        icon: 'none'
      })
      return false;
    }
    if (!_this.data.d) {
      wx.showToast({
        title: '请输入资金用途!',
        icon: 'none'
      })
      return false;
    }
    if (!_this.data.e) {
      wx.showToast({
        title: '请输入联系人!',
        icon: 'none'
      })
      return false;
    }
    if (!_this.data.f) {
      wx.showToast({
        title: '请输入手机号码!',
        icon: 'none'
      })
      return false;
    }
    if (!_this.data.g) {
      wx.showToast({
        title: '验证码格式错误!',
        icon: 'none'
      })
      return false;
    }
    
    if (!_this.data.ag) {
      wx.showToast({
        title: '请同意免责协议!',
        icon: 'none'
      })
      return false;
    }

    wx.login({
      success: function (res) {
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
              // console.log(p)
              if (p.data.code === 0) {
                wx.showLoading({
                  title: '正在申请中...',
                })
                wx.request({
                  url: 'https://boss.zjifa.com.cn/finance/apply',
                  data: {
                    financeId: _this.data.financeId,
                    company: _this.data.company,
                    money: _this.data.money,
                    province: _this.data.region[0],
                    city: _this.data.region[1],
                    time: _this.data.time,
                    purpose: _this.data.purpose,
                    username: _this.data.username,
                    phone: _this.data.phone,
                    idcardFront: _this.data.idcardFront,
                    idcardBack: _this.data.idcardBack,
                    businessLicense: _this.data.businessLicense,
                    authorization: _this.data.authorization,
                    finance: _this.data.finance,
                    userId: p.data.data.id,
                    code: _this.data.code,
                    id: _this.data.financeId
                  },
                  method: 'post',
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  success(r) {
                    console.log(r)
                    if (r.data.code === 0) {
                      wx.hideLoading()
                      wx.showToast({
                        title: r.data.msg,
                        icon: 'none'
                      })
                      setTimeout(function () {
                        wx.navigateTo({
                          url: '../main/index',
                        })
                      }, 1600)
                    } else {
                      wx.hideLoading()
                      wx.showToast({
                        title: r.data.msg,
                        icon: 'none'
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