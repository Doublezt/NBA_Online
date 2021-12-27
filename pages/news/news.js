// pages/news/news.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    list: [],
    showNews: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let localNews = wx.getStorageSync('localNews')
    console.log('本地新闻',JSON.parse(localNews))
    this.setData({
      list: JSON.parse(localNews)
    })
    let newsList = [];
    for(let i = 0 ; i < 10 ; i++) {
      newsList.push(this.data.list[i])
    }
    console.warn(newsList)
    this.setData({
      showNews: newsList
    })
  },
  refresh() {
    let index = (this.data.index + 9) > this.data.list.length ? 0 : this.data.index + 9
    let showNews = [];
    console.warn(index)
    for(let i = index ; i < (index + 9) ; i++) {
      showNews.push(this.data.list[i])
    }
    this.setData({
      showNews,
      index
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})