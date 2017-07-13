// pages/person/info.js
var app = getApp()
Page({

  data: {
    userInfo: {},
    option:0,
    books:[]
  },

  onLoad: function (options) {
    var _this = this
    this.setData({
      option:options.option
    })
    app.getUserInfo(function (userInfo) {
      //更新数据
      _this.setData({
        userInfo: userInfo
      })
    })
  },
  onShow: function () {
    var op = this.data.option
    var _this = this
    if(op == 1){
      wx.request({
        url: 'https://127.0.0.1/library/index.php/Home/Index/b',
        data: {
          wxname: _this.data.userInfo.nickName
        },
        method: 'GET',
        success: function (res) {
          _this.setData({
            'books': res.data
          })
        }
      })
    }else if(op == 2){
      wx.request({
        url: 'https://127.0.0.1/library/index.php/Home/Index/a',
        data: {
          wxname: _this.data.userInfo.nickName
        },
        method: 'GET',
        success: function (res) {
          _this.setData({
            'books': res.data
          })
        }
      })

    }else if(op == 3){
      wx.request({
        url: 'https://127.0.0.1/library/index.php/Home/Index/c',
        data: {
          wxname: _this.data.userInfo.nickName
        },
        method: 'GET',
        success: function (res) {
          _this.setData({
            'books': res.data
          })
        }
      })
    }else if(op == 4){
      wx.request({
        url: 'https://127.0.0.1/library/index.php/Home/Index/history',
        data: {
          wxname: _this.data.userInfo.nickName
        },
        method: 'GET',
        success: function (res) {
          _this.setData({
            'books': res.data
          })
        }
      })
    }else if(op == 5){
      wx.request({
        url: 'https://127.0.0.1/library/index.php/Home/Index/ms',
        data: {
          wxname: _this.data.userInfo.nickName
        },
        method: 'GET',
        success: function (res) {
          _this.setData({
            'books': res.data
          })
        }
      })
    }
  },
  renew:function(e){
    var _this = this
    wx.request({
      url: 'https://127.0.0.1/library/index.php/Home/Index/renew',
      data: {
        wxname: _this.data.userInfo.nickName,
        bid: e.currentTarget.dataset.bid
      },
      method: 'GET',
      success: function (res) {
        wx.redirectTo({
          url: 'info?option=1'
        })
      }
    })
  },
  detail: function (e) {
    wx.navigateTo({
      url: '../index/detail?bid=' + e.currentTarget.dataset.bid
    })
  },
  read: function(e){
    wx.request({
      url: 'https://127.0.0.1/library/index.php/Home/Index/read',
      data: {
        id: e.currentTarget.dataset.mid
      },
      method: 'GET',
      success: function (res) {
        wx.redirectTo({
          url: 'info?option=5'
        })
      }
    })
  }
})