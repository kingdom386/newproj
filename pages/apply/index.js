// pages/apply/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qyjs: [],
    front: [],
    back: [],
    yyzz: [],
    showusererror: true,
    showmobilerror: true,
    showyzmerror: false,
    showqyadd: true,
    showidcardfront: true,
    showidcardback: true,
    showyyzz: true,
    openid: '',
    level: '',
    username: '',
    phone: '',
    code: '1111',
    introduce: '',
    idcardFront: '',
    idcardBack: '',
    businessLicense: '',
    msg: '获取验证码'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.jb)
    var _this = this
    _this.setData({
      level: options.jb
    })
    wx.setNavigationBarTitle({
      title: '会员申请',
    })
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
          success (d) {
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
  checkuser: function (e) {
    var val = e.detail.value
    var reg = /^[a-zA-Z0-9_-]{4,16}$/
    var username = /^[\u4e00-\u9fff\w]{2,16}$/
    if (reg.test(val)||username.test(val)) {
      this.setData({
        showusererror: false,
        username: val
      })
    } else {
      this.setData({
        showusererror: true,
        username: ''
      })
      wx.showModal({
        title: '表单提示',
        content: '请输入联系人姓名!',
        showCancel: false
      })
    }
  },
  checkmobile: function (e) {
    var val = e.detail.value
    var reg = /^1(3|4|5|7|8)\d{9}$/
    if (reg.test(val)) {
      this.setData({
        showmobilerror: false,
        phone: val
      })
    } else {
      this.setData({
        showmobilerror: true,
        phone: ''
      })
      wx.showModal({
        title: '表单提示',
        content: '请输入联系人手机号码!',
        showCancel: false
      })
    }
  },
  // checkcode: function (e) {
  //   var val = e.detail.value
  //   var reg = /^\d{4}$/
  //   if (reg.test(val)) {
  //     this.setData({
  //       showyzmerror: false,
  //       code: val
  //     })
  //   } else {
  //     this.setData({
  //       showyzmerror: true,
  //       code: ''
  //     })
  //   }
  // },
  formSubmit: function (e) {
    var _this = this
    if (!_this.data.username||_this.showusererror) {
      wx.showModal({
        title: '表单提示',
        content: '请输入联系人信息！',
        showCancel: false
      })
      return false;
    }
    if (!_this.data.phone||_this.showmobilerror) {
      wx.showModal({
        title: '表单提示',
        content: '手机号码信息有误！',
        showCancel: false
      })
      return false;
    }
    // if (!_this.data.code||_this.showyzmerror) {
    //   wx.showModal({
    //     title: '表单提示',
    //     content: '验证码信息有误！',
    //     showCancel: false
    //   })
    //   return false;
    // }
    if (_this.data.showqyadd) {
      wx.showModal({
        title: '表单提示',
        content: '请上传企业介绍！',
        showCancel: false
      })
      return false;
    }
    if (_this.data.showidcardfront) {
      wx.showModal({
        title: '表单提示',
        content: '请上传身份证正面！',
        showCancel: false
      })
      return false;
    }
    if (_this.data.showidcardback) {
      wx.showModal({
        title: '表单提示',
        content: '请上传身份证反面！',
        showCancel: false
      })
      return false;
    }
    if (_this.data.showyyzz) {
      wx.showModal({
        title: '表单提示',
        content: '请上传营业执照！',
        showCancel: false
      })
      return false;
    }
    wx.login({
      success: function(res) {
        if (res.code) {
          // 获取openid
          wx.request({
            url: 'https://boss.zjifa.com.cn/member/login',
            data: { code: res.code},
            method: 'post',
            header: { 'Content-Type': 'application/x-www-form-urlencoded' },
            success (r) {
              _this.setData({
                openid: r.data.data.openid
              })
              // console.log(r.data.data.openid)
              wx.request({
                url: 'https://boss.zjifa.com.cn/member/add',
                data: _this.data,
                method: 'post',
                header: { 'Content-Type': 'application/x-www-form-urlencoded' },
                success (p) {
                  // console.log(typeof (p.data))
                  if (p.data.code == 0) {
                    wx.showModal({
                      title: '申请提示',
                      content: p.msg,
                      success (res) {
                        if (res.confirm) {
                          wx.navigateTo({
                            url: '../main/index',
                          })
                        } else {
                        }
                      }
                    })
                  } else {
                    wx.showModal({
                      title: '申请提示',
                      content: p.data.msg,
                    })
                  }
                },
                fail (f) {
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