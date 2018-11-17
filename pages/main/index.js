Page({
  data: {
    imgUrls: [],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '浙江省投融资协会',
    })
    var _this = this
    wx.request({
      url: 'https://boss.zjifa.com.cn/web/findList',
      data: { position: 0},
      method: 'get',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      success(p) {
        if (p.data.code == 0) {
          var dt = p.data.data
          var ary = []
          dt.map(function (e) {
            _this.setData({
              imgUrls: _this.data.imgUrls.concat(e.img)
            })
          })
          
        } else {
          wx.showModal({
            title: '申请提示',
            content: p.data.msg,
          })
        }
      },
    })
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  govipcenter: function () {
    wx.navigateTo({
      url: '../vipcenter/index',
    })
  },
  gojinrong: function () {
    wx.navigateTo({
      url: '../jinrong/index',
    })
  },
  gofz: function () {
    wx.navigateTo({
      url: '../committee/index',
    })
  },
  tourongfuwu: function () {
    wx.showModal({
      title: '消息提示',
      content: '功能正在开发，敬请期待',
      showCancel: false
    })
  }
})