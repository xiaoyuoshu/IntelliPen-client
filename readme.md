# IntelliPen

力度矫正笔--微信小程序

### 文件目录与文件含义
```
image //图片资源
 └─strocks //笔画、字的图片
pages //页面文件
 ├─collect
 ├─index
 ├─planlist
 ├─reCharge
 ├─reChargeDet
 ├─tips
 ├─train
 ├─trainDet
 └─trainItemDet
typings //存放头文件定义
utils //存放工具类
app.js //小程序入口文件，在此注册小程序
app.json //小程序全局配置页面路径、窗口、tab、网络超时等等
app.wxss //小程序全局样式文件
jsconfig.json //js运行配置文件
project.config.json //配置小程序名称、appid，项目信息等等
```

### 页面路由及功能

1. index

   前期测试蓝牙模块与硬件的数据交换，正式小程序未使用

2. collect

   收集训练数据并上传到服务器，正式小程序未使用

3. reCharge

   以大组为划分，展示收集的训练数据（一个训练笔画有n个数据点，一个大组有21个训练笔画），正式小程序未使用

4. reChargeDet

   由reCharge导航而来，展示某一指定分组的所有笔画，且可以重新设置笔画等级，正式小程序未使用

5. train

   tab页面之一，入口页面

   展示五种训练方式，并可以导航至训练用的页面

6. planlist

   tab页面之一

   以训练为划分，展示用户目前为止的训练记录，以及训练的平均等级

7. tips

   tab页面之一

   以笔画为划分，展示用户目前为止的所有训练中的笔画等级及次数

8. trainDet

   训练用页面，由train导航而来

   根据train页面传入的数据决定训练方式。训练方式将决定用户训练的笔画顺序，收集训练数据，通过服务器端机器学习模型，反馈给用户其笔画判定等级。并可以让用户看见其笔画力度与标准力度的差别。

9. trainItemDet

   由planlist导航而来

   以笔画为划分，展示用户在某一次训练中的所有笔画等级及次数

### 蓝牙连接信息

蓝牙设备信息在连接时默认为以下数据

蓝牙设备名：SmartPen

蓝牙设备地址：D4: 36: 39: 6A: C8: 77

所用蓝牙服务的服务uuid：0000FFE0-0000-1000-8000-00805F9B34FB

所用蓝牙服务的特征值uuid：0000FFE1-0000-1000-8000-00805F9B34FB
