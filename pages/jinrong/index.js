// pages/jinrong/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    wx.setNavigationBarTitle({
      title: '金融+',
    })
  },
  onReady: function () {
    var _this = this
    wx.request({
      url: 'https://boss.zjifa.com.cn/finance/findList',
      method: 'post',
      success (r) {
        console.log(r.data.data)
        if (r.data.code == 0) {
          _this.setData({
            listData: r.data.data
          })
        }
      }
    })
  },
  godetail: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../detail/index?id=' + id,
    })
  }
})