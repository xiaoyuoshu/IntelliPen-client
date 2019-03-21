// pages/tips/tips.js
var Util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden:true,
    groups: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    let Pages = getCurrentPages()
    console.log(Pages)
    for (let i in Pages){
      if (Pages[i].__route__ =='pages/collect/collect'){
        console.log(reLaunch)
        wx.reLaunch({
          url: '../tips/tips',
        })
      }
    }
    wx.stopBluetoothDevicesDiscovery({
      success: function (res) {
        console.log(res)
      },
      complete: function () {
        wx.closeBLEConnection({
          deviceId: 'D4: 36: 39: 6A: C8: 77',
          success: function (res) {
            console.log(res)
          },
          fail: function(err){
            console.log(err)
          },
          complete: function () {
            wx.closeBluetoothAdapter({
              success: function (res) {
                console.log(res)
              },
              fail: function (err) {
                console.log(err)
              }
            })
          }
        })
      }
    })
    var ALLDATA = wx.getStorageSync('0')
    var temp = []
    for(var i = 0;i < 21;i++) {    
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
  
  },
  /**
   * 打开收集信息的页面
   */
  startCollectPages: function () {
    wx.navigateTo({
      url: '../collect/collect'
    });
  },
  /**
   * 打开重判数据的页面
   */
  startReChargePages: function () {
    wx.navigateTo({
      url: '../reCharge/reCharge'
    });
  }
})