// pages/detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deImg: '',
    intro: '',
    ys: '',
    fid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this
    var id = options.id
    _this.setData({
      fid: id
    })
    wx.setNavigationBarTitle({
      title: '产品详情',
    })
    wx.request({
      url: 'https://boss.zjifa.com.cn/finance/detail',
      data: {
        id: id
      },
      method: 'post',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success(r) {
        console.log(r.data)
        if (r.data.code == 0) {
          _this.setData({
            deImg: r.data.data.img,
            intro: r.data.data.introduce,
            ys: r.data.data.advantage
          })
        }
      }
    })
  },
  apply: function() {
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
                var phone = p.data.data.phone
                if (phone) {
                  wx.navigateTo({
                    url: '../jinrongshenqing/index?id=' + _this.data.fid,
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
      },
    })
  }
})