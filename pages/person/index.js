// pages/person/index.js
var app = getApp()
Page({
  data:{
    userInfo:{},
    bNum:0,
    aNum:0,
    cNum:0,
    haveMs:0
  },
  onLoad:function(options){
    var _this = this
    app.getUserInfo(function (userInfo) {
      //更新数据
      _this.setData({
        userInfo: userInfo
      })
    })
  },
  onShow:function(){
    var nickName = this.data.userInfo.nickName
    var _this = this
    wx.request({
      url: 'https://127.0.0.1/library/index.php/Home/Index/person',
      data: {
        wxname: nickName
      },
      method: 'GET',
      success: function (res) {
        _this.setData({
          'bNum': parseInt(res.data.borrow),
          'aNum': parseInt(res.data.appoint),
          'cNum': parseInt(res.data.collect),
          'haveMs': parseInt(res.data.haveMs)
        })
      }
    })
  },
  op1:function(){
    wx.navigateTo({
      url: 'info?option=1'
    })
  },
  op2: function () {
    wx.navigateTo({
      url: 'info?option=2'
    })
  },
  op3: function () {
    wx.navigateTo({
      url: 'info?option=3'
    })
  },
  op4: function () {
    wx.navigateTo({
      url: 'info?option=4'
    })
  },
  op5: function () {
    wx.navigateTo({
      url: 'info?option=5'
    })
  }
})