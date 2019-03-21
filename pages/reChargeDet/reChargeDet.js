// pages/reChargeDet/reChargeDet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    strocks: [],
    loadingHidden: true,
    groups: 0,
    items: [
      { name: '3', value: '等级3', checked: 'true' },
      { name: '2', value: '等级2' },
      { name: '1', value: '等级1' },
    ],
    showModal: false,
    nowStrock: '',
    nowlevel: 3,
    newlevel: 3
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    options.id = 1;
    var that = this
    this.setData({
      loadingHidden: false
    })
    wx.request({
      url: 'http://119.23.218.94:3000/download',
      data: options,
      method: 'POST',
      success: function (res) {
        var temp = []
        for (var i in res.data) {
          var time = new Date(res.data[i].collectTime).toLocaleString()
          temp.push({
            strock: res.data[i].type,
            time: time,
            level: res.data[i].level,
          })
        }
        that.setData({
          loadingHidden: true,
          strocks: temp,
          groups: options.id
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
   * 
   */
  change_level(e){
    var l = 3
    for (var i in this.data.strocks){
      if (e.currentTarget.id == this.data.strocks[i].strock){
        l = this.data.strocks[i].level
      }
    }
    if(l == 3){
      this.setData({
        items: [
          { name: '3', value: '等级3', checked: 'true' },
          { name: '2', value: '等级2' },
          { name: '1', value: '等级1' },
        ],
        nowStrock: e.currentTarget.id,
        nowlevel: l,
        newlevel: l
      })
    } else if(l == 2){
      this.setData({
        items: [
          { name: '3', value: '等级3' },
          { name: '2', value: '等级2', checked: 'true' },
          { name: '1', value: '等级1' },
        ],
        nowStrock: e.currentTarget.id,
        nowlevel: l,
        newlevel: l
      })
    } else {
      this.setData({
        items: [
          { name: '3', value: '等级3' },
          { name: '2', value: '等级2' },
          { name: '1', value: '等级1', checked: 'true' },
        ],
        nowStrock: e.currentTarget.id,
        nowlevel: l,
        newlevel: l
      })
    }
    this.setData({
      showModal: true
    })
  },

  /**
   * 弹窗相关
   */

  /**
     * 弹出框蒙层截断touchmove事件
     */
  preventTouchMove() {
  },

  /**
   * 隐藏模态对话框
   */
  hideModal() {
    this.setData({
      showModal: false
    });
  },

  /**
   * 对话框取消按钮点击事件
   */
  onCancel() {
    this.hideModal()
  },

  /**
   * 对话框确认按钮点击事件
   */
  onConfirm() {
    var that = this
    var d = {
      strock: that.data.nowStrock,
      newlevel: that.data.newlevel,
      groups: that.data.groups
    }
    console.log(d)
    wx.request({
      url: 'http://119.23.218.94:3000/users',
      data: d,
      method: 'POST',
      success: function (res) {
        console.log(res)
        that.hideModal()
        that.onLoad({
          id: that.data.groups
        })
      }
    })
    
  },

  checkboxChange(e) {
    if (e.detail.value[1] == 3) {
      this.setData({
        items: [
          { name: '3', value: '等级3', checked: 'true' },
          { name: '2', value: '等级2' },
          { name: '1', value: '等级1' },
        ],
        newlevel: 3
      })
    } else if (e.detail.value[1] == 2) {
      this.setData({
        items: [
          { name: '3', value: '等级3' },
          { name: '2', value: '等级2', checked: 'true' },
          { name: '1', value: '等级1' },
        ],
        newlevel: 2
      })
    } else {
      this.setData({
        items: [
          { name: '3', value: '等级3' },
          { name: '2', value: '等级2' },
          { name: '1', value: '等级1', checked: 'true' },
        ],
        newlevel: 1
      })
    }
  }
})