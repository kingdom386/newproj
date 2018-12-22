function tabbarinit() {
  return [{
      "current": 0,
      "pagePath": "/pages/main/index",
      "iconPath": "/images/home.jpg",
      "selectedIconPath": "/images/home_s.jpg",
      "text": "首页"
    },
    {
      "current": 0,
      "pagePath": "/pages/activity/index",
      "iconPath": "/images/hd.jpg",
      "selectedIconPath": "/images/hd_s.jpg",
      "text": "活动"
    },
    {
      "current": 0,
      "pagePath": "/pages/kefu/index",
      "iconPath": "/images/kf.jpg",
      "selectedIconPath": "/images/kf_s.jpg",
      "text": "客服"
    },
    {
      "current": 0,
      "pagePath": "/pages/mine/index",
      "iconPath": "/images/my.jpg",
      "selectedIconPath": "/images/my_s.jpg",
      "text": "我的"
    }
  ]

}
//tabbar 主入口
function tabbarmain(bindName = "tabdata", id, target) {
  var that = target;
  var bindData = {};
  var otabbar = tabbarinit();
  otabbar[id]['iconPath'] = otabbar[id]['selectedIconPath'] //换当前的icon
  otabbar[id]['current'] = 1;
  bindData[bindName] = otabbar
  that.setData({
    bindData
  });
}

module.exports = {
  tabbar: tabbarmain
}