// pages/collect/collect.js

var align = false
var issubmiting = false
var isCollecting = false
var dataString = ''
var coTime = 0
var DataList = []
var index = 0
var Util = require("../../utils/util.js")


/**
 * page
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden: true,
    submitingHidden: true,
    coll_value: "无",
    currentData: {
      currentTime: Date.now() + 1000,
      collectTime: Date.now(),
      w_alpha: -44,
      w_beta: 155,
      w_gama: -39,
      a_x: 9828,
      a_y: 12598,
      a_z: -1024,
      alpha: 65.888466,
      beta: -106.530106,
      gama: 15.565425,
      force1: 2,
      force2: 2,
      force3: 2
    },
    penState: '收笔',
    strock: {
      name: '点：㇔',
      address: 's1',
      relaWords: '主 火 刃'
    },
    nextstrock: {
      name: '横：一',
      address: 's2',
      relaWords: '一 二 丁'
    },
    showModal: false,
    dataLenth: 0,
    items: [
      { name: '3', value: '等级3', checked: 'true' },
      { name: '2', value: '等级2' },
      { name: '1', value: '等级1' },
    ],
    level: 3
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
    var that = this
    this.setData({
      loadingHidden: false
    })
    wx.request({
      url: 'http://119.23.218.94:3000/users',
      header: { 'content-type': 'application/json' },
      success: function (res) {
        console.log(res.data)
        if (!res.data.length) {
          // old:index = 0
          index = 11 // 横折钩
        } else {
          for (var i = 0; i < Util.indexArr.length; i++){
            if (res.data[0].type == Util.Strocks[Util.indexArr[i]].name){
              // old:index = (i == (Util.indexArr.length - 1)) ? 0 : (i + 1)
              index = 11
            }
          }
        }
        that.setData({
          strock: Util.Strocks[Util.indexArr[index]],
          nextstrock: Util.Strocks[Util.indexArr[index]] // old:Util.Strocks[Util.indexArr[index + 1]]
        })
      }
    })
    this.openBluetoothAdapter()
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
   * 打开蓝牙适配器
   */
  openBluetoothAdapter() {
    var that = this
    wx.openBluetoothAdapter({
      success: (res) => {
        console.log('openBluetoothAdapter success', res)
        that.createBLEConnection()
      },
      fail: (res) => {
        if (res.errCode === 10001) {
          wx.onBluetoothAdapterStateChange(function (res) {
            console.log('onBluetoothAdapterStateChange', res)
           if (res.available) {
              that.createBLEConnection()
            }
          })
        }
      }
    })
  },

  /**
   * 连接SmartPen
   */
  createBLEConnection() {
    var that = this
    this.setData({
      loadingHidden: false
    })
    wx.startBluetoothDevicesDiscovery({
      allowDuplicatesKey: true,
      success: (res) => {
        console.log('startBluetoothDevicesDiscovery success', res)
        wx.onBluetoothDeviceFound((res) => {
          res.devices.forEach(device => {
            console.log(device.name)
            if (device.name == 'SmartPen'){
              wx.stopBluetoothDevicesDiscovery({
                success: function (res) {
                  console.log(res)
                }
              })
              const deviceId = device.deviceId
              const name = "SmartPen"
              wx.createBLEConnection({
                deviceId,
                timeout: 3000,
                success: (res) => {
                  console.log(res)
                  that.setData({
                    loadingHidden: true
                  })
                  wx.onBLEConnectionStateChange(function (res) {
                    if (!res.connected) {
                      that.createBLEConnection()
                    }
                  })
                  that.getBLEDeviceServices(deviceId)
                },
                fail: (res) => {
                  that.createBLEConnection()
                }
              })
            }
          })
        })
      },
    })
    
  },

  /**
   * 获取蓝牙设备服务
   */
  getBLEDeviceServices(deviceId) {
    wx.getBLEDeviceServices({
      deviceId,
      success: (res) => {
        console.log('getBLEDeviceServices success', res)
        for (let i = 0; i < res.services.length; i++) {
          if (res.services[i].uuid == "0000FFE0-0000-1000-8000-00805F9B34FB") {
            this.getBLEDeviceCharacteristics(deviceId, res.services[i].uuid)
            return
          }
        }
      }
    })
  },

  /**
   * 获取蓝牙特征值
   */
  getBLEDeviceCharacteristics(deviceId, serviceId) {
    var that = this
    wx.getBLEDeviceCharacteristics({
      deviceId,
      serviceId,
      success: (res) => {
        console.log('getBLEDeviceCharacteristics success', res.characteristics)
        for (let i = 0; i < res.characteristics.length; i++) {
          let item = res.characteristics[i]
          if (item.properties.notify || item.properties.indicate) {
            wx.notifyBLECharacteristicValueChange({
              deviceId,
              serviceId,
              characteristicId: item.uuid,
              state: true,
            })
            
          }
        }
      },
      fail(res) {
        console.error('getBLEDeviceCharacteristics', res)
      }
    })
    // 操作之前先监听，保证第一时间获取数据

    

    wx.onBLECharacteristicValueChange((characteristic) => {
      if (characteristic.characteristicId == "0000FFE1-0000-1000-8000-00805F9B34FB"){
        var strFromBuffer = this.ab2str(characteristic.value)
        this.setData({
          coll_value: strFromBuffer
        })
        for (var i in strFromBuffer){
          if (strFromBuffer[i] == ')' && align) {
            align = false;
            //正在收集数据则转换，否则不转换
            if (!issubmiting) {
              this.translateString2Data();
            }
          }
          if (align) {
            dataString += strFromBuffer[i];
          }
          if (strFromBuffer[i] == '(') {
            dataString = ''
            align = true;
          }
        }
      }
    })
  },

  /**
   * 转化字符串为合理数据
   */
  translateString2Data(){
    if (isCollecting) {
      DataList.push(this.data.currentData)
    }
    var re = dataString.substring(0).split(',')
    if(re.length==12){
      this.setData({
        currentData: {
          currentTime: Date.now(),
          collectTime: isCollecting?coTime:Date.now(),
          w_alpha: re[0],
          w_beta: re[1],
          w_gama: re[2],
          a_x: re[3],
          a_y: re[4],
          a_z: re[5],
          alpha: re[6],
          beta: re[7],
          gama: re[8],
          force1: re[9],
          force2: re[10],
          force3: re[11]
        }
      })
    }
    if (parseInt(this.data.currentData.force2) > 1400 && parseInt(this.data.currentData.force3) > 1900) {
      if (!isCollecting) {
        isCollecting = true
        coTime = this.data.currentData.collectTime
        this.setData({
          penState: '落笔'
        })
        DataList = []
      }
    }

    if (parseInt(this.data.currentData.force2) < 1200 || parseInt(this.data.currentData.force3) < 1200) {
      if (isCollecting) {
        //添加上传服务器的内容
        isCollecting = false
        this.setData({
          penState: '收笔',
          dataLenth: DataList.length
        })
        issubmiting = true
        this.initSubmitView()
      }
    }
    
  },

  /**
   * arraybuffer转换ascii
   */
  ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint8Array(buf));
  },

  /**
   * 打开模态弹窗
   */
  initSubmitView() {
    this.setData({
      showModal: true
    })
  },

  /**
   * 复选框值发生改变
   */
  checkboxChange(e) {
    if(e.detail.value[1]==3){
      this.setData({
        items: [
          { name: '3', value: '等级3', checked: 'true' },
          { name: '2', value: '等级2' },
          { name: '1', value: '等级1' },
        ],
        level: 3
      })
    } else if (e.detail.value[1] == 2){
      this.setData({
        items: [
          { name: '3', value: '等级3' },
          { name: '2', value: '等级2', checked: 'true' },
          { name: '1', value: '等级1' },
        ],
        level: 2
      })
    } else{
      this.setData({
        items: [
          { name: '3', value: '等级3' },
          { name: '2', value: '等级2' },
          { name: '1', value: '等级1', checked: 'true' },
        ],
        level: 1
      })
    }
  },

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
    issubmiting = false
  },

  /**
   * 对话框确认按钮点击事件
   */
  onConfirm() {
    this.hideModal()
    var that = this
    this.setData({
      submitingHidden: false
    })
    for(var i in DataList){
      DataList[i].type = this.data.strock.name,
      DataList[i].level = this.data.level
    }
    wx.request({
      url: 'http://119.23.218.94:3000/' + 'submit',
      data: DataList,
      method: 'POST',
      success: function (res) {
        console.log(res)
        if(res.data=='ojbk'){
          that.setData({
            submitingHidden: true
          })
          // old:index = (index == (Util.indexArr.length - 1)) ? 0 : (index + 1)
          that.setData({
            strock: Util.Strocks[Util.indexArr[index]],
            nextstrock: Util.Strocks[Util.indexArr[index]]// old:Util.Strocks[Util.indexArr[((index == Util.indexArr.length - 1)) ? 0 : (index + 1)]]
          })
          issubmiting = false
        }
      }
    })
  }
})

