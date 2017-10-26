Page({
  data: {
    heros: require('../../data/heros'),
    show: -1
  },
  onLoad: function () {
  },
  toggle: function (e) {
    this.setData({
      show: e.target.dataset.idx === this.data.show ? -1 : e.target.dataset.idx
    })
  }
})
