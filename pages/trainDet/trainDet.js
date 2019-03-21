// pages/trainDet/trainDet.js

var align = false
var isCollecting = false
var dataString = ''
var coTime = 0
var DataList = []
var index = 0
var Util = require("../../utils/util.js")
var indexArrStrock = Util.indexArr.concat()
var index = 0
var wordIndex = 0
var scores = 0
var totalScores = 100
var issubmiting = false
var wordArr = Util.Words.concat()

var NowTrainItem = null

function randomsort(a, b) {
  return Math.random() > .5 ? -1 : 1;
  //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isStrockOrWord: true,
    notWaiting: true,
    nowScores: '★☆☆',
    trainId: 0 ,
    penState: '收笔' ,
    showModal: false ,
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
    loadingHidden: true,
    nowWord: wordArr[wordIndex],
    nextWord: wordArr[wordIndex + 1],
    disabled: true,
    oldStrockName: "无",
    oldStrockIndex: 0,
    ForceImage: "http://119.23.218.94:3000/1"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    NowTrainItem = {
      BeginTime: Date.now(),
      TrainType: options.id,
      level1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      level2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      level3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
    this.setData({
      trainId: options.id
    })
    console.log(this.data.trainId)
    if(options.id == 1){
      wx.setNavigationBarTitle({
        title: '笔画随机训练'
      })
      indexArrStrock.sort(randomsort)
      this.setData({
        isStrockOrWord: true
      })
    } else if(options.id == 2){
      wx.setNavigationBarTitle({
        title: '笔画顺序训练'
      })
      this.setData({
        isStrockOrWord: true
      })
    } else if(options.id == 3){
      wx.setNavigationBarTitle({
        title: '整字随机训练'
      })
      wordArr.sort(randomsort)
      this.setData({
        isStrockOrWord: false,
        nowWord: wordArr[wordIndex],
        nextWord: wordArr[wordIndex + 1]
      })
    } else if(options.id == 4){
      wx.setNavigationBarTitle({
        title: '整字顺序训练'
      })
      this.setData({
        isStrockOrWord: false,
        nowWord: wordArr[wordIndex],
        nextWord: wordArr[wordIndex + 1]
      })
    } else if(options.id == 0){
      indexArrStrock.sort(randomsort)
      wx.setNavigationBarTitle({
        title: '综合训练'
      })
      wordArr.sort(randomsort)
      this.setData({
        isStrockOrWord: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    this.openBluetoothAdapter()
    //初始化笔画
    if(this.data.isStrockOrWord){
      that.setData({
        strock: Util.Strocks[indexArrStrock[index]],
        nextstrock: Util.Strocks[indexArrStrock[index + 1]]
      })
    } else{
      that.setData({
        strock: Util.Strocks[wordArr[wordIndex].strockList[index]],
        nextstrock: Util.Strocks[wordArr[wordIndex].strockList[index + 1]]
      })
    }
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
    this.saveData()
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
    that.setData({
      loadingHidden: false
    })
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
            if (device.name == 'SmartPen') {
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
      if (characteristic.characteristicId == "0000FFE1-0000-1000-8000-00805F9B34FB") {
        var strFromBuffer = this.ab2str(characteristic.value)
        for (var i in strFromBuffer) {
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
  translateString2Data() {
    if (isCollecting) {
      DataList.push(this.data.currentData)
    }
    var re = dataString.substring(0).split(',')
    if (re.length == 12) {
      this.setData({
        currentData: {
          currentTime: Date.now(),
          collectTime: isCollecting ? coTime : Date.now(),
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
        this.initSubmit()
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
   * 打分并进行 下一项
   */
  initSubmit() {
    var that = this
    var ImageIndex = 0
    this.setData({
      notWaiting: false
    })
    scores += 3
    for (var i in DataList) {
      DataList[i].type = this.data.strock.name,
        DataList[i].level = this.data.level
    }
    if (this.data.isStrockOrWord) {
      ImageIndex = Util.indexArr.indexOf(indexArrStrock[index])
    } else {
      ImageIndex = Util.indexArr.indexOf(wordArr[wordIndex].strockList[index])
    }
    console.log('ImageIndex' + ImageIndex)
    this.setData({
      oldStrockIndex: ImageIndex
    })
    wx.request({
      url: 'http://119.23.218.94:3000/getLevel',
      data: {
        Data: DataList,
        TYPE: ImageIndex
        },
      method: 'POST',
      success: function (res) {
        if(res.data == 1){
          that.setData({
            nowScores: '★★☆'
          })
          NowTrainItem.level2[ImageIndex] += 1
        } else if(res.data == 2){
          that.setData({
            nowScores: '★★★'
          })
          NowTrainItem.level3[ImageIndex] += 1
        } else { 
          that.setData({
            nowScores: '★☆☆'
          })
          NowTrainItem.level1[ImageIndex] += 1
        }
        //处理下一笔画的事件
        that.setData({
          notWaiting: true
        })
        wx.showToast({
          title: "等级为" + that.data.nowScores,
          icon: "123",
          duration: 1500
        })
        that.NextStrock()
        issubmiting = false
      }
    })
  },

  /**
   * 
   */
  NextStrock() {
    var that = this
    this.setData({
      disabled: false,
      oldStrockName: this.data.strock.name
    })
    if (that.data.isStrockOrWord) {
      //处理笔画
      index += 1
      console.log(index + '/' + indexArrStrock.length)
      if (index == indexArrStrock.length) {
        if (that.data.trainId == 0) {
          //笔画结束，转字
          console.log('结束或转字')
          index = 0
          wordArr.sort(randomsort)
          that.setData({//Util.indexArr.indexOf(wordArr[wordIndex].strockList[index])
            strock: Util.Strocks[wordArr[wordIndex].strockList[index]],
            nextstrock: Util.Strocks[wordArr[wordIndex].strockList[index + 1]],
            nowWord: wordArr[wordIndex],
            nextWord: wordArr[wordIndex + 1]
          })
          that.setData({
            isStrockOrWord: false
          })
        } else {
          //训练结束，并转到planlist界面
          console.log('关闭页面')
          wx.reLaunch({
            url: '../planlist/planlist'
          })
        }
      } else if (index == indexArrStrock.length - 1) {
        //即将结束
        that.setData({//Util.indexArr.indexOf(indexArrStrock[index])
          strock: Util.Strocks[indexArrStrock[index]],
          nextstrock: {
            name: '无',
            address: 'w0',
            relaWords: '无'
          }
        })
      } else {
        //未结束，下一笔画
        that.setData({
          strock: Util.Strocks[indexArrStrock[index]],
          nextstrock: Util.Strocks[indexArrStrock[index + 1]]
        })
      }
    } else {
      //处理字
      index += 1
      if (index == wordArr[wordIndex].strockList.length) {
        //该字已结束
        index = 0
        wordIndex += 1
        if (wordIndex == 3) {
          //训练结束
          wx.reLaunch({
            url: '../planlist/planlist',
          })
        } else if (wordIndex == 2) {
          //训练即将结束
          that.setData({
            strock: Util.Strocks[wordArr[wordIndex].strockList[index]],
            nextstrock: Util.Strocks[wordArr[wordIndex].strockList[index + 1]],
            nowWord: wordArr[wordIndex],
            nextWord: {
              name: '结束',
              address: 'w0',
              strockList: [0, 12, 8, 3, 4]
            }
          })
        } else {
          that.setData({
            strock: Util.Strocks[wordArr[wordIndex].strockList[index]],
            nextstrock: Util.Strocks[wordArr[wordIndex].strockList[index + 1]],
            nowWord: wordArr[wordIndex],
            nextWord: wordArr[wordIndex + 1]
          })
        }
      } else if (index == wordArr[wordIndex].strockList.length - 1) {
        //该字即将结束
        that.setData({
          strock: Util.Strocks[wordArr[wordIndex].strockList[index]],
          nextstrock: {
            name: '无',
            address: 'w0',
            relaWords: '无'
          }
        })
      } else {
        that.setData({
          strock: Util.Strocks[wordArr[wordIndex].strockList[index]],
          nextstrock: Util.Strocks[wordArr[wordIndex].strockList[index + 1]]
        })
      }
    }
  },

  /**
   * 存储数据
   */
  saveData(){
    var num = wx.getStorageSync('-1') + 1
    //存储当前的item
    wx.setStorageSync(num.toString(), NowTrainItem)
    //更改item数量
    wx.setStorageSync('-1', num)
    //更改total
    var total = wx.getStorageSync('0')
    var i = 0
    for(i = 0;i < 21;i++){
      total.level1[i] += NowTrainItem.level1[i]
      total.level2[i] += NowTrainItem.level2[i]
      total.level3[i] += NowTrainItem.level3[i]
    }
    wx.setStorageSync('0', total)
  },

  /**
   * 观察力度详情
   */
  showForceImage() {
    console.log(this.data.oldStrockIndex)
    this.setData({
      showModal: true,
      ForceImage: "http://119.23.218.94:3000/" + this.data.oldStrockIndex
    })
    issubmiting = true
  },

  preventTouchMove() {
  },

  hideModal() {
    issubmiting = false
    this.setData({
      showModal: false
    });
  },

  /**
   * 对话框取消按钮点击事件
   */
  onCancel() {
    this.hideModal()
  }
})