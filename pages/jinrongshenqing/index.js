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
    financeId:'',
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
    code: '1111',
    msg: '获取验证码',
    one: true,
    two: true,
    three: true,
    four: true,
    five: true,
    six: true,
    showidcardfront: true,
    showidcardback: true,
    showyyzz: true,
    showxycx: true,
    showrzf: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '产品申请',
    })
    this.data.financeId = options.id
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
                  authorization: imgurl
                });
              }
            }
          }
        })
      }
    })
  },
  bindRegionChange: function (e) {
    console.log(e.detail.value)
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
        one: false
      })
    } else {
      wx.showModal({
        title: '表单提示',
        content: '融资主体填写有误！',
        showCancel: false
      })
      _this.setData({
        one: true
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
        two: false
      })
    } else {
      wx.showModal({
        title: '表单提示',
        content: '融资金额填写有误！',
        showCancel: false
      })
      _this.setData({
        two: false
      })
    }
  },
  tme: function (e) {
    var _this = this
    var reg = /^\d+$/
    var val = e.detail.value
    if (reg.test(val)) {
      this.setData({
        time: val
      })
    } else {
      wx.showModal({
        title: '表单提示',
        content: '融资期限填写有误！',
        showCancel: false
      })
    }
  },
  pur: function (e) {
    var _this = this
    var val = e.detail.value
    if (val) {
      this.setData({
        purpose: val
      })
    } else {
      wx.showModal({
        title: '表单提示',
        content: '资金用途填写有误！',
        showCancel: false
      })
    }
  },
  nme: function (e) {
    var reg = /^[a-zA-Z0-9_-]{4,16}$/
    var username = /^[\u4e00-\u9fff\w]{2,16}$/
    var _this = this
    var val = e.detail.value
    if (reg.test(val) || username.test(val)) {
      this.setData({
        username: val
      })
    } else {
      wx.showModal({
        title: '表单提示',
        content: '联系人姓名填写有误！',
        showCancel: false
      })
    }
  },
  phn: function(e) {
    var reg = /^1(3|4|5|7|8)\d{9}$/
    var _this = this
    var val = e.detail.value
    if (reg.test(val)) {
      this.setData({
        phone: val
      })
    } else {
      wx.showModal({
        title: '表单提示',
        content: '手机号码填写有误！',
        showCancel: false
      })
    }
  },
  // checkcode: function (e) {
  //   var val = e.detail.value
  //   var reg = /^\d{4}$/
  //   if (reg.test(val)) {
  //     this.setData({
  //       code: val
  //     })
  //   } else {
  //     this.setData({
  //       code: ''
  //     })
  //   }
  // },
  formSubmit: function (e) {
    var _this = this
    if (!_this.data.company|| this.data.one) {
      wx.showModal({
        title: '表单提示',
        content: '请输入融资主体信息！',
        showCancel: false
      })
      return false;
    }
    if (!_this.data.money ||this.data.two) {
      wx.showModal({
        title: '表单提示',
        content: '请输入融资金额息！',
        showCancel: false
      })
      return false;
    }
    console.log(_this.data.region.length <= 0)
    if (_this.data.region.length <= 0) {
      wx.showModal({
        title: '表单提示',
        content: '请选择地区！',
        showCancel: false
      })
      return false;
    }
    if (!_this.data.code || _this.showyzmerror) {
      wx.showModal({
        title: '表单提示',
        content: '验证码信息有误！',
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
    wx.request({
      url: 'https://boss.zjifa.com.cn/finance/apply',
      data: _this.data,
      method: 'post',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      success(p) {
        console.log(p.data.code)
        if (p.data.code == 0) {
          wx.showModal({
            title: '申请提示',
            content: p.data.msg,
            success(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../jinrong/index',
                })
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
      fail(f) {
      }
    })
  }
})