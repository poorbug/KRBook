//app.js
App({
  onLaunch: function () {
    require('./lib/minapp.js');
    wx.BaaS.init('0809bbb4537248869192');
    const user = wx.BaaS.storage.get('userinfo')
    if (user) this.globalData.user = user
  },
  globalData: {
    user: undefined
  }
})