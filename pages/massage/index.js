// pages/massage/index.js
var app = getApp()
Page({
  data:{
    userInfo: {},
    funs:[],
    start: 0,
    //加载更多按钮相关设定
    loading: false,
    disabled: false,
    loadmoreTxt: '加载更多'
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
    var _this = this
    wx.request({
      url: 'https://127.0.0.1/library/index.php/Home/Index/fun',
      data: {
        start: _this.data.start
      },
      method: 'GET',
      success: function (res) {
        _this.setData({
          'funs': _this.data.funs.concat(res.data),
          'start': _this.data.start + 5
        })
        wx.hideLoading()
      }
    })
  },
  loadmore: function (e) {
    this.setData({
      loading: true,
      disabled: true
    })
    var _this = this
    wx.request({
      url: 'https://127.0.0.1/library/index.php/Home/Index/fun',
      data: {
        start: _this.data.start
      },
      method: 'GET',
      success: function (res) {
        if (res.data.length) {
          _this.setData({
            'funs': _this.data.funs.concat(res.data),
            'disabled': false,
            'loading': false,
            'start': _this.data.start + 5
          })
        } else {
          _this.setData({
            'loadmoreTxt': '没有更多',
            'loading': false
          })
        }
      }
    })
  },
  detail: function (e) {
    wx.navigateTo({
      url: '../index/detail?bid=' + e.currentTarget.dataset.bid
    })
  },
  onPullDownRefresh:function(){
    wx.redirectTo({
      url: 'index'
    })
  }
})