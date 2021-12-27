// index.js
// 获取应用实例
const app = getApp();
import { setLocalStorage } from '../../utils/tools'
Page({
  data: {
    color: 'yellow',
    selectedIndex: 0,
    match:[],
    showMatch:[],
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    let myDate = new Date();
    let day = myDate.getDate().toString();
    let localMatches = wx.getStorageSync('localMatches');
    let localDay = wx.getStorageSync('localday');
    let localRank = wx.getStorageSync('localRank');
    this.getNews();
    if(day != localDay || !localMatches || !localRank) {
      this.currentWatchList()
      this.getTeamRank()
    } else {
      console.log('本地',JSON.parse(localMatches),JSON.parse(localRank))
      this.setData({
        match : JSON.parse(localMatches),
        showMatch: JSON.parse(localMatches)[0].list
      })
    }
  },
  changeWeek(e) {
    this.setData({
      showMatch: this.data.match[e.detail.index].list
    })
    console.log(e.detail.index,this.data.showMatch)
  },
  // 近期赛程
  currentWatchList() {
    let that = this;
    return new Promise((resolve , reject) => {
      wx.request({
        url: 'https://apis.juhe.cn/fapig/nba/query?key=217f0598b7cd33755af3d3def2e56806',
        method:'GET',
        success: (response) => {
          console.log('获取赛程成功',response)
          that.setData({
            showMatch : response.data.result.matchs[0].list,
            match: response.data.result.matchs
          }
          )
          let myDate = new Date();
          let day = myDate.getDate().toString();
          wx.setStorageSync('localMatches',JSON.stringify(response.data.result.matchs));
          wx.setStorageSync('localday',day);
          console.log('获取赛程成功11',this.data.match,this.data.showMatch)
          resolve(response)
        },
        fail: (err) => {
          reject(`近期赛程获取失败${err}`)
        }
      })
    })
  },
  // 球队排名
  getTeamRank() {
    let that = this;
    return new Promise((resolve , reject) => {
      wx.request({
        url: 'https://apis.juhe.cn/fapig/nba/rank?key=217f0598b7cd33755af3d3def2e56806',
        method:'GET',
        success: (response) => {
          console.log('获取球队排名成功',response)
          wx.setStorageSync('localRank',JSON.stringify(response.data.result.ranking));
          resolve(response)
        },
        fail: (err) => {
          reject(`获取球队排名失败${err}`)
        }
      })
    })
  },
  // 新闻
  getNews() {
    let myDate = new Date();
    let day = myDate.getDate().toString();
    let localDay = wx.getStorageSync('localday');
    let localNews = wx.getStorageSync('localNews')
    if(!localNews || day != localDay) {
    let that = this;
    return new Promise((resolve , reject) => {
      wx.request({
        url: 'https://api.tianapi.com/nba/index?key=a26b045e05440800856587401682b7f4&num=50',
        method:'GET',
        success: (response) => {
          console.log('获取新闻成功',response.data.newslist)
          let myDate = new Date();
          let day = myDate.getDate().toString();
          wx.setStorageSync('localNews',JSON.stringify(response.data.newslist));
          resolve(response)
        },
        fail: (err) => {
          reject(`近期赛程获取失败${err}`)
        }
      })
    })
    } else {
      // 用本地的
      let news = wx.getStorageSync('localNews')
      console.log('本地新闻',JSON.parse(news))
    }
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
