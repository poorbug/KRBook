let _comData = {
  'msg.isHide': true,
  'touch': undefined
}
// let _comEvent = {
//   msg_isShow: function () {
//     this.msgShow()
//   },
//   msg_isHide: function () {
//     this.msgHide()
//   }
// }

let _comMethod = {
  msgShow: function () {
    this.setData({ 'msg.isHide': false })
  },
  msgHide: function () {
    this.setData({ 'msg.isHide': true })
  },
  msgTouchStart: function (e) {
    this.setData({
      touch: e.touches[0].pageY
    })
  },
  msgMoveUp: function (e) {
    const { touch, msg } = this.data
    const pos = e.changedTouches[0].pageY
    if (msg.isHide || !touch || touch < pos) return ;
    if (touch - pos > 50) {
      this.setData({
        touch: undefined,
        'msg.isHide': true
      })
    }
  }
}

function Msgboard() {
  let pages = getCurrentPages()
  let curPage = pages[pages.length - 1]
  //组件中调用页面
  this._page = curPage
  Object.assign(curPage,/* _comEvent,*/ _comMethod)
  curPage.setData(_comData)
  curPage.msgboard = this
  return this
}

export { Msgboard }
