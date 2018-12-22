// pages/pay/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    price: '',
    orderId: '',
    payType: '1',
    show: true,
    shoupload: true,
    imgSrc: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    var _this = this
    _this.setData({
      price: options.fee,
      orderId: decodeURIComponent(options.orderId),
      payType: options.payType,
    })
  },
  upload: function (e) {
    console.log(e)
      var that = this;
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
              var resp = JSON.parse(d.data)
              console.log(resp)
              that.setData({
                imgSrc: resp.data,
                shoupload: false
              })
            }
          })
        }
      })
    
  },
  pay: function(e) {
    var _this = this
    if (_this.data.payType === '1') {
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
              wx.request({
                url: 'https://boss.zjifa.com.cn/member/creatOrder',
                data: {
                  openid: p.data.data.openid,
                  orderId: _this.data.orderId
                },
                method: 'post',
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success(p) {
                  if (p.data.code === 0) {
                    wx.requestPayment({
                      timeStamp: p.data.data.timeStamp,
                      nonceStr: p.data.data.nonceStr,
                      package: p.data.data.package,
                      signType: p.data.data.signType,
                      paySign: p.data.data.paySign,
                      success(res) {
                        wx.showModal({
                          content: '支付成功！',
                          success(res) {
                            if (res.confirm) {
                             wx.navigateTo({
                               url: '../main/index',
                             })
                            }
                          }
                        })

                      },
                      fail(res) {
                        wx.showModal({
                          content: '支付失败！',
                        })
                      }
                    })
                  }
                }
              })
            }
          })
        },
        fail: function(res) {},
        complete: function(res) {},
      })
    }
    if (_this.data.payType === '2') {
      wx.showModal({
        content: '开始支付',
        showCancel: false
      })
      // debugger
      var obj = JSON.parse(_this.data.orderId)
      console.log(obj)
      wx.requestPayment({
        timeStamp: obj.timeStamp,
        nonceStr: obj.nonceStr,
        package: obj.package,
        signType: obj.signType,
        paySign: obj.paySign,
        success(res) {
          wx.showModal({
            content: '支付成功！',
            success(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../activity/index',
                })
              }
            }
          })

        },
        fail(res) {
          wx.showModal({
            content: '支付失败！',
          })
        }
      })
    }
  },
  offlinepay: function (e) {
    this.setData({
      show: false
    })
  },
  gomain: function (e) {
    wx.showLoading({
      title: '提交中...',
    })
    var _this = this
    wx.request({
      url: 'https://boss.zjifa.com.cn/member/offline',
      data: {
        orderId: _this.data.orderId,
        paymentVoucher: _this.data.imgSrc
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(p) {
        if (p.data.code === 0) {
          wx.hideLoading()
          wx.navigateTo({
            url: '../main/index',
          })
        }
      }
    })
  }
})