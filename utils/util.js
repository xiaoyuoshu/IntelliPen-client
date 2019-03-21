const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const indexArr = [0,1,2,3,4,5,6,7,8,10,11,12,13,15,21,22,23,25,28,30,31]

const Strocks = [
  {
    name: '点：㇔',
    address: 's1',
    relaWords: '主 火 刃'
  },
  {
    name: '横：一',
    address: 's2',
    relaWords: '一 二 丁'
  },
  {
    name: '竖：㇑',
    address: 's3',
    relaWords: '十 正 上'
  },
  {
    name: '撇：㇓',
    address: 's4',
    relaWords: '凡 用 齐'
  },
  {
    name: '捺：㇏',
    address: 's5',
    relaWords: '人 爻 木'
  },
  {
    name: '提：㇀',
    address: 's6',
    relaWords: '地 冰 洋'
  },
  {
    name: '扁斜钩：㇃',
    address: 'sbxg',
    relaWords: '心 必 沁'
  },
  {
    name: '横钩：㇖',
    address: 'shg',
    relaWords: '你 了 冗'
  },
  {
    name: '横撇：㇇',
    address: 'shp',
    relaWords: '水 又 互'
  },
  {
    name: '横撇弯钩：㇌',
    address: 'shpwg',
    relaWords: '那 队 耶'
  },
  {
    name: '横斜钩：⺄',
    address: 'shxg',
    relaWords: '凰 凤 风'
  },
  {
    name: '横折：㇕',
    address: 'shz',
    relaWords: '口 品 田'
  },
  {
    name: '横折钩：㇆',
    address: 'shzg',
    relaWords: '月 用 匀'
  },
  {
    name: '横折提：㇊',
    address: 'shzt',
    relaWords: '说 计 鸠'
  },
  {
    name: '横折弯：㇍',
    address: 'shzw',
    relaWords: '朵 躲 没'
  },
  {
    name: '横折弯钩：㇈',
    address: 'shzwg',
    relaWords: '九 几 亢'
  },
  {
    name: '横折折：㇅',
    address: 'shzz',
    relaWords: '凹 卍 兕'
  },
  {
    name: '横折折撇：㇋',
    address: 'shzzp',
    relaWords: '及 建 汲'
  },
  {
    name: '横折折折：㇎',
    address: 'shzzz',
    relaWords: '凸 𢫋 𠱂'
  },
  {
    name: '横折折折钩：㇡',
    address: 'shzzzg',
    relaWords: '乃 孕 仍'
  },
  {
    name: '撇点：㇛',
    address: 'spd',
    relaWords: '女 巡 甾'
  },
  {
    name: '撇折：㇜',
    address: 'spz',
    relaWords: '去 公 玄'
  },
  {
    name: '竖钩：㇚',
    address: 'ssg',
    relaWords: '小 水 事'
  },
  {
    name: '竖提：㇙',
    address: 'sst',
    relaWords: '良 以 比'
  },
  {
    name: '竖弯：㇄',
    address: 'ssw',
    relaWords: '四 西 要'
  },
  {
    name: '竖弯钩：㇟',
    address: 'sswg',
    relaWords: '孔 乱 已'
  },
  {
    name: '竖折：㇗',
    address: 'ssz',
    relaWords: '山 互 牙'
  },
  {
    name: '竖折撇：ㄣ',
    address: 'sszp',
    relaWords: '专 转 传'
  },
  {
    name: '竖折弯钩：㇉',
    address: 'sszwg',
    relaWords: '亏 弟 号'
  },
  {
    name: '竖折折：㇞',
    address: 'sszz',
    relaWords: '鼎 卐 𪔂'
  },
  {
    name: '弯钩：㇁',
    address: 'swg',
    relaWords: '了 狐 狱'
  },
  {
    name: '斜钩：㇂',
    address: 'sxg',
    relaWords: '我 弋 战'
  }
]

const Words = [
  {
    name: '永',
    address: 'w1',
    strockList: [0,12,8,3,4]
  },
  {
    name: '地',
    address: 'w2',
    strockList: [1,2,5,12,2,25]
  },
  {
    name: '体',
    address: 'w3',
    strockList: [3,2,1,2,3,4,1]
  }

]

module.exports = {
  formatTime: formatTime,
  indexArr: indexArr,
  Strocks: Strocks,
  Words: Words
}
