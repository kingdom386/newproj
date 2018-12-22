// pages/myapply/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    page: 1,
    limit: 200,
    listData: [],
    curindex: '1'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.finance(options.id)
    this.setData({
      id: options.id
    })
  },
  finance(id) {
    var _this = this
    wx.showLoading({
      title: '数据加载中...',
    })
    wx.request({
      url: 'https://boss.zjifa.com.cn/member/finance',
      data: {
        page: _this.data.page,
        limit: _this.data.limit,
        userId: id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success(p) {
        console.log(p)
        if (p.data.code === 0) {
          wx.hideLoading()
          if (p.data.count !== 0) {
            _this.setData({
              listData: p.data.data
            })
          } else {
            wx.showToast({
              title: p.data.msg,
              image: '../../images/prompt_fill.png'
            })
          }
        }
      }
    })
  },
  server(id) {
    var _this = this
    wx.showLoading({
      title: '数据加载中...',
    })
    wx.request({
      url: 'https://boss.zjifa.com.cn/member/invert',
      data: {
        page: _this.data.page,
        limit: _this.data.limit,
        userId: id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success(p) {
        if (p.data.code === 0) {
          wx.hideLoading()
          if (p.data.count !== 0) {
            _this.setData({
              listData: p.data.data
            })
          } else {
            _this.setData({
              listData: ''
            })
            wx.showToast({
              title: p.data.msg,
              image: '../../images/prompt_fill.png'
            })
          }
        }
      }
    })
  },
  changeindex: function(e) {
    var _this = this
    var index = e.currentTarget.dataset.index
    console.log(typeof (index))
    console.log(index)
    if (index === '1') {
      _this.setData({
        curindex: index
      })
      _this.finance(_this.data.id)
    } else {
      _this.setData({
        curindex: index
      })
      _this.server(_this.data.id)
    }
  },
  revoke: function(e) {
    var id = e.currentTarget.dataset.id
    var _this = this
    if (_this.data.curindex === '1') {
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
                    url: 'https://boss.zjifa.com.cn/member/financeCancle',
                    data: {
                      financeId: id,
                      userId: p.data.data.id
                    },
                    method: 'post',
                    header: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    success(p) {
                      var dt = p.data.data
                      if (p.data.code == 0) {
                        console.log(p.data.data)
                        wx.showModal({
                          content: p.data.msg,
                          showCancel: false,
                          success: function (res) {
                            if (res.confirm) {
                              _this.finance(_this.data.id)
                            }
                          },
                          fail: function (res) { },
                          complete: function (res) { },
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
    } else {
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
                    url: 'https://boss.zjifa.com.cn/member/invertCancle',
                    data: {
                      invertId: id,
                      userId: p.data.data.id
                    },
                    method: 'post',
                    header: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    success(p) {
                      var dt = p.data.data
                      if (p.data.code == 0) {
                        console.log(p.data.data)
                        wx.showModal({
                          content: p.data.msg,
                          showCancel: false,
                          success: function (res) {
                            if (res.confirm) {
                              _this.server(_this.data.id)
                            }
                          },
                          fail: function (res) { },
                          complete: function (res) { },
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
    }
  },
  again: function(e) {
    var id = e.currentTarget.dataset.id
    var _this = this
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
                  url: 'https://boss.zjifa.com.cn/member/financeCancle',
                  data: {
                    financeId: id,
                    userId: p.data.data.id
                  },
                  method: 'post',
                  header: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  },
                  success(p) {
                    var dt = p.data.data
                    if (p.data.code == 0) {
                      console.log(p.data.data)
                      wx.showModal({
                        content: p.data.msg,
                        showCancel: false,
                        success: function(res) {
                          if (res.confirm) {
                            if (_this.data.curindex === '0') {
                              _this.finance(_this.data.id)
                            } else {
                              _this.server(_this.data.id)
                            }
                          }
                        },
                        fail: function(res) {},
                        complete: function(res) {},
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
  }
})