// pages/trainItemDet/trainItemDet.js
var Util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    groups: [],
    id: 0,
    Type: '无'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id: options.id
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
    var ALLDATA = wx.getStorageSync(this.data.id.toString())
    if (ALLDATA.TrainType == 0) {
      this.setData({
        Type: '综合训练'
      })
    } else if (ALLDATA.TrainType == 1) {
      this.setData({
        Type: '笔画随机训练'
      })
    } else if (ALLDATA.TrainType == 2) {
      this.setData({
        Type: '笔画顺序训练'
      })
    } else if (ALLDATA.TrainType == 3) {
      this.setData({
        Type: '整字随机训练'
      })
    } else {
      this.setData({
        Type: '整字顺序训练'
      })
    }
    var temp = []
    for (var i = 0; i < 21; i++) {
      temp.push({
        Name: Util.Strocks[Util.indexArr[i]].name,
        L1: ALLDATA.level1[i],
        L2: ALLDATA.level2[i],
        L3: ALLDATA.level3[i],
        Total: ALLDATA.level1[i] + ALLDATA.level2[i] + ALLDATA.level3[i]
      })
    }
    this.setData({
      groups: temp
    })
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