// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    activeName: '',
    color: 'yellow',
  },
  onChange(event) {
    this.setData({
      activeName: event.detail,
    });
  },
  onLoad() {
  },
  onReady() {
    console.log('onready')
  },
  onTabItemTap() {
  },
})
