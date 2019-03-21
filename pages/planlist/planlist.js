// pages/planlist/planlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden:true,
    groups:[]
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
    this.setData({
      loadingHidden: false
    })
    var count = wx.getStorageSync('-1')
    console.log(wx.getStorageSync('-1'))
    console.log(wx.getStorageSync('0'))
    var temp = []
    for (var i = count; i > 0; i--) {

      var t = wx.getStorageSync(i.toString())

      var item = {
        TrainType: '综合训练',
        AveLevel: '★☆☆',
        BeginDate: '0月0日0时',
        KEY: 1
      }
      if (t.TrainType == 0) {
        item.TrainType = '综合训练'
      } else if (t.TrainType == 1) {
        item.TrainType = '笔画随机训练'
      } else if (t.TrainType == 2) {
        item.TrainType = '笔画顺序训练'
      } else if (t.TrainType == 3) {
        item.TrainType = '整字随机训练'
      } else {
        item.TrainType = '整字顺序训练'
      }
      item.KEY = i
      
      item.BeginDate = (new Date(t.BeginTime).getMonth() + 1).toString()+'月'+ (new Date(t.BeginTime).getDate()).toString()+'日'+ (new Date(t.BeginTime).getHours()).toString()+':'+ (new Date(t.BeginTime).getMinutes()).toString()
      var totalGrades = 0
      var totalNum = 0
      for (var index = 0; index < 21; index++) {
        totalNum += t.level1[index]
        totalGrades += t.level1[index] * 1
      }
      for (var index = 0; index < 21; index++) {
        totalNum += t.level2[index]
        totalGrades += t.level2[index] * 2
      }
      for (var index = 0; index < 21; index++) {
        totalNum += t.level3[index]
        totalGrades += t.level3[index] * 3
      }
      totalNum = totalNum == 0 ? 1 : totalNum
      totalGrades = totalGrades * 1.0 / totalNum
      console.log(totalGrades)
      if (totalGrades < 1.6) {
        item.AveLevel = "★☆☆"
      } else if (totalGrades < 2.4 && totalGrades >= 1.6) {
        item.AveLevel = "★★☆"
      } else {
        item.AveLevel = "★★★"
      }
      temp.push(item)
    }
    console.log(temp)
    this.setData({
      groups: temp,
      loadingHidden: true
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

  showDet: function(e) {
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: '../trainItemDet/trainItemDet?id=' + e.currentTarget.id
    })
  }
})