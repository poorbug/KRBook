const app = getApp()

let _comData = {
  'msg.isHide': true,
  'touch': undefined, // only user in .js
  'msg.user': app.globalData.user
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
  },
  send: function() {
    if (!this.data.msg.user) {
      wx.BaaS.login().then((res) => {
        app.globalData.user = res
        console.log('this', this)
        this.setData({ 
          'msg.user': res 
        })
        // 发送留言
        console.log('发送留言')
      }, (err) => {
        console.log('err', err)
      })
    } else {
      // 发送留言
      console.log('发送留言')
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
