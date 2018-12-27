// pages/financing /index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jzid: '',
    glid: '',
    flid: '',
    swid: '',
    rlid: '',
    yjid: '',
    qaid: '',
    dzid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: 'https://boss.zjifa.com.cn/invert/type/findTypeList',
      data: {
        page: 1,
        limit: 2000
      },
      success(p) {
        console.log(p.data.data)
        if (p.data.code === 0) {
          wx.hideLoading()
          var dt = p.data.data
          dt.map(function(el) {
            console.log(el)
            if (el.name === '尽职调查') {
              _this.setData({
                jzid: el.id
              })
            }
            if (el.name === '企业管理') {
              _this.setData({
                glid: el.id
              })
            }
            if (el.name === '法律联系') {
              _this.setData({
                flid: el.id
              })
            }
            if (el.name === '税务筹划') {
              _this.setData({
                swid: el.id
              })
            }
            if (el.name === '人力资源') {
              _this.setData({
                rlid: el.id
              })
            }
            if (el.name === '研究报告') {
              _this.setData({
                yjid: el.id
              })
            }
            if (el.name === '全案委托') {
              _this.setData({
                qaid: el.id
              })
            }
            if (el.name === '定制服务') {
              _this.setData({
                dzid: el.id
              })
            }
          })
        }
      }
    })
  },
  coding: function(e) {
    var _this = this
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name

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
                    url: '../financingapplye/index?id=' + id + '&name=' + name,
                  })
                } else {
                  wx.showToast({
                    title: '请绑定手机号码！',
                    icon: 'none'
                  })
                  setTimeout(function() {
                    wx.navigateTo({
                      url: '../register/index',
                    })
                  }, 1600)
                }
              }
            }
          })
        }
      },
    })


  },
  goliucheng: function() {
    wx.navigateTo({
      url: '../process/index',
    })
  }
})