// pages/apply/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showuser: false,
    showmobile: false,
    showcode: false,
    showqyadd: true,
    showidcardfront: true,
    showidcardback: true,
    showyyzz: true,
    // ---
    qyjs: [],
    front: [],
    back: [],
    yyzz: [],
    sendcode: true,
    openid: '',
    level: '',
    username: '',
    phone: '',
    code: '',
    introduce: '',
    idcardFront: '',
    idcardBack: '',
    businessLicense: '',
    msg: '获取验证码',
    timer: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options.jb)
    var _this = this
    _this.setData({
      level: options.jb
    })
    wx.setNavigationBarTitle({
      title: '会员申请',
    })
  },
  timers() {
    var _this = this
    clearInterval(_this.data.timer)
    var t = 60
    _this.data.timer = setInterval(function() {
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
  chooseImage: function(e) {
    var that = this;
    var tp = e.currentTarget.dataset.img
    var imgurl = ''
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'https://boss.zjifa.com.cn/file/uploadFile',
          filePath: tempFilePaths[0],
          name: 'file',
          success(d) {
            var resp = JSON.parse(d.data)
            imgurl = resp.data
            if (resp.code === 0) {
              if (tp == 'qyjs') {
                that.setData({
                  qyjs: that.data.qyjs.concat(res.tempFilePaths),
                  showqyadd: false,
                  introduce: imgurl
                });
              }
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
            }
          }
        })
      }
    })
  },
  checkuser(e) {
    var val = e.detail.value
    // var reg = /^[a-zA-Z0-9_-]{4,16}$/
    // var username = /^[\u4e00-\u9fff\w]{2,16}$/
    if (val) {
      this.setData({
        username: val,
        showuser: true
      })
    } else {
      this.setData({
        username: '',
        showuser: false
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
          icon: 'none',
        })
      }
    } else {
      wx.showToast({
        title: '请检查手机号！',
        icon: 'none',
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
    if (!_this.data.showuser) {
      wx.showToast({
        title: '请输入机构名称',
        icon: 'none',
      })
      return false;
    }
    if (!_this.data.showmobile) {
      wx.showToast({
        title: '手机号码有误！',
        icon: 'none',
      })
      return false;
    }
    // if (!_this.data.showcode) {
    //   wx.showToast({
    //     title: '验证码错误！',
    //     icon: 'none',
    //   })
    //   return false;
    // }
    // if (_this.data.showqyadd) {
    //   wx.showToast({
    //     title: '请上传企业介绍！',
    //     icon: 'none',
    //     image: '../../images/prompt_fill.png'
    //   })
    //   return false;
    // }
    // if (_this.data.showidcardfront) {
    //   wx.showToast({
    //     title: '请上传身份证正面！',
    //     icon: 'none',
    //     image: '../../images/prompt_fill.png'
    //   })
    //   return false;
    // }
    // if (_this.data.showidcardback) {
    //   wx.showToast({
    //     title: '请上传身份证反面！',
    //     icon: 'none',
    //     image: '../../images/prompt_fill.png'
    //   })
    //   return false;
    // }
    // if (_this.data.showyyzz) {
    //   wx.showToast({
    //     title: '请上传营业执照！',
    //     icon: 'none',
    //     image: '../../images/prompt_fill.png'
    //   })
    //   return false;
    // }
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
            success(r) {
              _this.setData({
                openid: r.data.data.openid
              })
              wx.request({
                url: 'https://boss.zjifa.com.cn/member/add',
                data: _this.data,
                method: 'post',
                header: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                success(p) {
                  if (p.data.code === 0) {
                    wx.showToast({
                      title: p.data.msg,
                      icon: 'none'
                    })
                    setTimeout(function() {
                      wx.navigateTo({
                        url: '../pay/index?fee=' + p.data.data.fee + '&orderId=' + encodeURIComponent(p.data.data.orderId) + '&payType=1',
                      })
                    }, 1600)
                  } else {
                    console.log("p:")
                    console.log(p)
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