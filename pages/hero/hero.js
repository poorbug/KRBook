Page({
  data: {
    heros: require('../../data/heros'),
    show: -1,
    pos: 0
  },
  onLoad: function () {
  },
  toggle: function () {
    const { pos, show } = this.data
    this.setData({
      show: pos === show ? -1 : pos
    })
  },
  swipe: function (e) {
    this.setData({
      pos: e.detail.current,
      show: -1
    })
  },
  playAudio: function () {
    console.log('playAudio')
    const { pos, heros } = this.data
    const idx = Math.floor(Math.random() * heros[pos].audio.length)
    wx.playBackgroundAudio({
      dataUrl: `http://omhr7p9e5.bkt.clouddn.com/microapp/krbook/${heros[pos].name}-${idx}.caf`,
    })
    wx.showToast({
      title: heros[pos].audio[idx],
      duration: 2000
    })
  },
  onShareAppMessage: function () {
    return require('../../data/share')
  }
})
