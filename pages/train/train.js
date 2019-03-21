// pages/train/train.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {   
    var ItemNumber = wx.getStorageSync('-1')
    if (ItemNumber === "") {
      wx.setStorageSync('-1', 0)
      wx.setStorageSync('0', {
        BeginTime: 0,
        TrainType: -1,
        level1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        level2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        level3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      })
    }
    console.log(wx.getStorageSync('-1'))
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
    let Pages = getCurrentPages()
    console.log(Pages)
    for (let i in Pages) {
      console.log(Pages[i].__route__)
      if (Pages[i].__route__ == 'pages/trainDet/trainDet') {
        console.log(reLaunch)
        wx.reLaunch({
          url: '../train/train',
        })
      }
    }
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
   * dailyTrain
   */
  dailyTrain: function () {
    wx.navigateTo({
      url: '../trainDet/trainDet?id=' + 0
    })
  },

  /**
   * randomStrocksTrain
   */
  randomStrocksTrain: function () {
    wx.navigateTo({
      url: '../trainDet/trainDet?id=' + 1
    })
  },

  /**
   * sortedStrocksTrain
   */
  sortedStrocksTrain: function () {
    wx.navigateTo({
      url: '../trainDet/trainDet?id=' + 2
    })
  },

  /**
   * randomWordsTrain
   */
  randomWordsTrain: function () {
    wx.navigateTo({
      url: '../trainDet/trainDet?id=' + 3
    })
  },

  /**
   * sortedWordsTrain
   */
  sortedWordsTrain: function () {
    wx.navigateTo({
      url: '../trainDet/trainDet?id=' + 4
    })
  }

})