let _comData = {
  'msg.isHide': true
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
  }
}

function Msgboard() {
  console.log(this)
  let pages = getCurrentPages()
  let curPage = pages[pages.length - 1]
  //组件中调用页面
  this._page = curPage
  Object.assign(curPage,/* _comEvent,*/ _comMethod)
  curPage.setData(_comData)

  curPage.msgboard = this

  console.log(this)
  return this
}

export { Msgboard }
