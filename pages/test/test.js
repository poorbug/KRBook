import { Msgboard } from '../../templates/msgboard/msgboard'
Page({
  data: {
    msg: { isHide: true }
  },
  onLoad: function () {
    new Msgboard()
  }
})
