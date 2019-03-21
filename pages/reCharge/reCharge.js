// pages/reCharge/reCharge.js

/**
 * 获取数据
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    groups: [],
    loadingHidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      loadingHidden: false
    })
    wx.request({
      url: 'http://119.23.218.94:3000/download',
      header: { 'content-type': 'application/json' },
      success: function (res) {
        var temp = []
        for (var i in res.data) {
          console.log(res.data[i])
          var time = new Date(res.data[i].collectTime).toLocaleString()
          temp.push({
            groups: res.data[i].groups,
            time: time
          })
        }
        that.setData({
          loadingHidden: true,
          groups: temp
        })
      }
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
  
  },

  /**
   * 点击事件
   */
  initGroups(e){
    wx.navigateTo({
      url: '../reChargeDet/reChargeDet?id=' + e.currentTarget.id
    })
  }
})