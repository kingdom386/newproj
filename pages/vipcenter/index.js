// pages/vipcenter/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    autoplay: false,
    indicatorDots: false,
    interval: 9999999999,
    duration: 600,
    circular: true,
    curIndex: 0,
    curIndex1: 0,
    curIndex2: 0,
    curIndex3: 0,
    curIndex4: 0,
    curIndex5: 0,
    listData: [],
    userlevel: '',
    hasmobile: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    wx.showLoading({
      title: '数据加载中...',
    })
    wx.request({
      url: 'https://boss.zjifa.com.cn/web/findList?',
      data: {
        position: 0
      },
      success(p) {
        if (p.data.code === 0) {
          console.log(p.data.data)
          wx.hideLoading()
          _this.setData({
            listData: p.data.data
          })
        }
      }
    })
    // 获取当前的等级
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
              console.log(p)
              _this.setData({
                userlevel: p.data.data.level
              })
              if (p.data.data.phone) {
                _this.setData({
                  hasmobile: false
                })
              } else {
                _this.setData({
                  hasmobile: true
                })
              }
            }
          })
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })

  },
  swichpage: function (ev) {
    console.log(typeof (ev.currentTarget.dataset.index))
    this.setData({
      value: ev.currentTarget.dataset.index
    })
  },
  apply: function (ev) {
    var _this = this
    var fee = 0
    var jb = ev.currentTarget.dataset.jb
    if (_this.data.curIndex === 0) {
      fee = 0
    }
    if (_this.data.curIndex === 1) {
      fee = 1988
    }

    if (_this.data.curIndex === 2) {
      fee = 5988
    }

    if (_this.data.curIndex === 3) {
      fee = 9988
    }

    if (_this.data.curIndex === 3) {
      fee = 19888
    }
    // 登录判断用户是否已经注册了手机号码没有注册直接跳转到注册页面
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
                console.log(dt)
                if (dt.phone) {
                  wx.navigateTo({
                    url: '../apply/index?jb=' + _this.data.curIndex + '&fee=' + fee,
                  })
                } else {
                  wx.showModal({
                    content: '请绑定手机号码！',
                    showCancel: false,
                    success (res) {
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
      },
    })
  },
  intervalChange: function (e) {
    console.log(e.detail.current)
    if (e.detail.current === 0) {
      this.setData({
        curIndex: parseInt(e.detail.current),
        curIndex1: parseInt(e.detail.current),
        curIndex2: -1,
        curIndex3: -1,
        curIndex4: -1,
        curIndex5: -1
      })
    }
    if (e.detail.current === 1) {
      this.setData({
        curIndex: parseInt(e.detail.current),
        curIndex1: -1,
        curIndex2: parseInt(e.detail.current),
        curIndex3: -1,
        curIndex4: -1,
        curIndex5: -1
      })
    }
    if (e.detail.current === 2) {
      this.setData({
        curIndex: parseInt(e.detail.current),
        curIndex1: -1,
        curIndex2: -1,
        curIndex3: parseInt(e.detail.current),
        curIndex4: -1,
        curIndex5: -1
      })
    }
    if (e.detail.current === 3) {
      this.setData({
        curIndex: parseInt(e.detail.current),
        curIndex1: -1,
        curIndex2: -1,
        curIndex3: -1,
        curIndex4: parseInt(e.detail.current),
        curIndex5: -1
      })
    }
    if (e.detail.current === 4) {
      this.setData({
        curIndex: parseInt(e.detail.current),
        curIndex1: -1,
        curIndex2: -1,
        curIndex3: -1,
        curIndex4: -1,
        curIndex5: parseInt(e.detail.current)
      })
    }
  },
  govip: function (e) {
    // console.log(e.currentTarget.dataset.index)
    this.setData({
      curIndex: e.currentTarget.dataset.index
    })
  },
  goregister: function (e) {
    wx.navigateTo({
      url: '../register/index',
    })
  }
})