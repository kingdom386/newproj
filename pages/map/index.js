// pages/map/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lng: '',
    lat: '',
    name: '',
    // --
    latitude: '',
    longitude: '',
    markers: [],
    covers: [],
    polygons: [],
    subKey: 'XESBZ-V7GRK-Q4XJD-A4GFF-FFXM3-D5BOK',
    enable3d: false,
    showCompass: false,
    enableOverlooking: false,
    enableZoom: true,
    enableScroll: true,
    enableRotate: false,
    drawPolygon: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(parseFloat(options.lng))
    var lng = parseFloat(options.lng)
    var lat = parseFloat(options.lat)
    this.setData({
      latitude: lng,
      longitude: lat,
      markers: [{
        latitude: lng,
        longitude: lat,
        name: options.name
      }]
    })
  }
})