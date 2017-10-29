Page({
  data: {
    show: true
  },
  toggle: function () {
    console.log(11111)
    this.setData({
      show: !this.data.show
    })
  }
})
