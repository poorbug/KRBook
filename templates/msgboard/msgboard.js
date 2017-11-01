import util from '../../utils/util'
const app = getApp()

let _comData = {
  'msg.isHide': true,
  'touch': undefined, // only user in .js
  'msg.user': app.globalData.user,
  'msg.allMsgs': [],
  'msg.curMsgs': [],
  'msg.input': ''
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
    const { msg, pos, title } = this.data
    if (!msg.allMsgs[`${title}-${pos}`]) {
      // 查询 msg
      var query = new wx.BaaS.Query()
      query.contains('title', `${title}-${pos}`)
      var Product = new wx.BaaS.TableObject(2959)
      Product.setQuery(query).find().then((res) => {
        msg.allMsgs[`${title}-${pos}`] = res.data.objects
        msg.curMsgs = res.data.objects
        this.setData({
          msg
        })
      }, (err) => {
        wx.showToast({
          title: '请求失败',
          duration: 2000
        })
      })
    }

    this.setData({ 'msg.isHide': false });
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
  handleInput: function(e) {
    this.setData({
      'msg.input': e.detail.value
    })
  },
  send: function() {
    const sendMsg = () => {
      const { title, pos, msg } = this.data
      if (!msg.input) {
        wx.showToast({
          title: '请输入留言',
          duration: 2000
        })
        return
      }
      const { nickName, avatarUrl } = msg.user
      const Product = new wx.BaaS.TableObject(2959)
      const product = Product.create()
      const msgTemp = {
        name: nickName,
        icon: avatarUrl,
        title: `${title}-${pos}`,
        content: msg.input,
        date: util.timeFormator(new Date())
      }
      
      product.set(msgTemp).save().then((res) => {
        msg.allMsgs[`${title}-${pos}`].push(res.data)
        msg.input = ''
        this.setData({ msg })
      }, (err) => {
        wx.showToast({
          title: '发送失败',
          duration: 2000
        })
      })
    }

    if (!this.data.msg.user) {
      wx.BaaS.login().then((res) => {
        app.globalData.user = res
        this.setData({ 
          'msg.user': res 
        })
        sendMsg()
      }, (err) => {
        wx.showToast({
          title: '登陆失败',
          duration: 2000
        })
      })
    } else {
      sendMsg()
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
