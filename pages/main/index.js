const app = getApp()
var template = require('../../template/index.js');
Page({
  data: {
    imgUrls: [],
    swiperImg: '../../images/c1.jpg',
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 500,
    dots: true,
    show: true,
    activeIndex: '1',
    zixunList: [],
    qiyeList: [],
    type: 0,
    page: 1,
    limit: 20,
    isShow: 1,
    aa: [{
      nickName: "wang",
      reward: "2"
    },
    {
      nickName: "wang",
      reward: "2"
    },
    {
      nickName: "wang",
      reward: "2"
    }
    ],
  },
  onLoad: function () {
    var _this = this
    template.tabbar("tabBar", 0, _this)
    wx.getStorage({
      key: 'isSHow',
      success: function (res) {
        _this.setData({
          show: false
        })
      },
      fail: function (res) {
        _this.setData({
          show: true
        })
      }
    })
    wx.setNavigationBarTitle({
      title: '浙江省投融资协会',
    })
    wx.request({
      url: 'https://boss.zjifa.com.cn/web/findList',
      data: {
        position: 0
      },
      method: 'get',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
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
    // 咨询中心
    _this.zixun()
    // 会员企业展示
    _this.vipcompany()
  },
  zixun() {
    var _this = this
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: 'https://boss.zjifa.com.cn/information/findList',
      data: {
        page: _this.data.page,
        limit: _this.data.limit,
        type: _this.data.type
      },
      method: 'post',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success(p) {
        if (p.data.code === 0) {
          wx.hideLoading()
          _this.setData({
            zixunList: p.data.data
          })
        }
      },
    })
  },
  vipcompany() {
    var _this = this
    wx.request({
      url: 'https://boss.zjifa.com.cn/company/findList',
      data: {
        page: _this.data.page,
        limit: _this.data.limit,
        isShow: _this.data.isShow
      },
      method: 'post',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success(p) {
        if (p.data.code === 0) {
          _this.setData({
            qiyeList: p.data.data
          })
        }
      }
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
    wx.navigateTo({
      url: '../financing/index',
    })
  },
  detail: function () {
    wx.navigateTo({
      url: '../jianjie/index',
    })
  },
  tab_change: function (e) {
    // console.log(e.currentTarget.dataset.index)
    this.setData({
      activeIndex: e.currentTarget.dataset.index,
      type: e.currentTarget.dataset.index - 1
    })
    this.zixun()
  },
  search: function () {
    wx.navigateTo({
      url: '../search/index',
    })
  },
  getUserInfo(e) {
    var _this = this
    var bl = false
    var userInfo = e.detail
    console.log(userInfo)
    wx.setStorage({
      key: 'isSHow',
      data: bl,
      success: function (res) { }
    })
    wx.setStorage({
      key: 'userInfo',
      data: userInfo,
      success: function (res) { }
    })
    _this.setData({
      show: false
    })
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
              var t = p.data.data.phone
              console.log(p.data.data.phone)
              if (t) {

              } else {
                wx.navigateTo({
                  url: '../register/index',
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
  gocompany: function () {
    wx.navigateTo({
      url: '../search/index',
    })
  },
  comdetail: function (e) {
    wx.navigateTo({
      url: '../comdetail/index?id=' + e.currentTarget.dataset.id,
    })
  },
  gocenter: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../zixuncenter/index?id=' + id,
    })
  }
})