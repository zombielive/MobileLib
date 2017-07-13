// pages/index/detail.js
var app = getApp()
Page({
  data: {
    userInfo:{},
    book:{},
    com:[],
    comstart:0,
    //加载更多按钮相关设定
    loading: false,
    disabled: false,
    loadmoreTxt: '加载更多',
    //遮罩层的显示
    isSeen:false
  },
  onLoad: function (options) {
    var _this = this
    app.getUserInfo(function (userInfo) {
      //更新数据
      _this.setData({
        userInfo: userInfo
      })
    })
    var nickName = this.data.userInfo.nickName
    //获取书本信息
    wx.request({
      url: 'https://127.0.0.1/library/index.php/Home/Index/detail',
      data:{
        nickName:nickName,
        bid: options.bid
      },
      method: 'GET',
      success:function(res){
        _this.setData({
          'book':res.data
        })
      }
    })
    //获取评论列表
    wx.request({
      url: 'https://127.0.0.1/library/index.php/Home/Index/detailCom',
      data: {
        bid: options.bid,
        comstart: _this.data.comstart
      },
      method: 'GET',
      success: function (res) {
        _this.setData({
          'com': _this.data.com.concat(res.data),
          'disabled': false,
          'comstart': _this.data.comstart + 5
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
      url: 'https://127.0.0.1/library/index.php/Home/Index/detailCom',
      data: {
        bid: _this.data.book.id,
        comstart: _this.data.comstart
      },
      method: 'GET',
      success: function (res) {
        if (res.data.length) {
          _this.setData({
            'com': _this.data.com.concat(res.data),
            'disabled': false,
            'loading': false,
            'comstart': _this.data.comstart + 5
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
  collect: function (e) {
    var _this = this
    wx.request({
      url: 'https://127.0.0.1/library/index.php/Home/Index/collect',
      data:{
        wxname:_this.data.userInfo.nickName,
        bid:_this.data.book.id
      },
      method: 'GET',
      success:function(res){
        _this.data.book.isCollect = 1;
        _this.data.book.collection = parseInt(_this.data.book.collection)+1;
        _this.setData({
          'book':_this.data.book
        })
      }
    })
  },
  clcollect: function (e) {
    var _this = this
    wx.request({
      url: 'https://127.0.0.1/library/index.php/Home/Index/clcollect',
      data: {
        wxname: _this.data.userInfo.nickName,
        bid: _this.data.book.id
      },
      method: 'GET',
      success: function (res) {
        _this.data.book.isCollect = 0;
        _this.data.book.collection = parseInt(_this.data.book.collection) - 1;
        _this.setData({
          'book': _this.data.book
        })
      }
    })
  },
  borrow: function (e) {
    var _this = this
    wx.request({
      url: 'https://127.0.0.1/library/index.php/Home/Index/borrow',
      data: {
        wxname: _this.data.userInfo.nickName,
        bid: _this.data.book.id
      },
      method: 'GET',
      success: function (res) {
        _this.data.book.isBorrow = 1;
        _this.data.book.rest = parseInt(_this.data.book.rest) - 1;
        _this.setData({
          'book': _this.data.book
        })
      }
    })
  },
  appoint: function (e) {
    var _this = this
    wx.request({
      url: 'https://127.0.0.1/library/index.php/Home/Index/appoint',
      data: {
        wxname: _this.data.userInfo.nickName,
        bid: _this.data.book.id
      },
      method: 'GET',
      success: function (res) {
        _this.data.book.isAppoint = 1;
        _this.setData({
          'book': _this.data.book
        })
      }
    })
  },
  comment: function (e){
    this.setData({
      'isSeen':true
    })
  },
  clComment: function (e) {
    this.setData({
      'isSeen': false
    })
  },
  commentSubmit: function (e){
    if (e.detail.value.content !== '') {
      var _this = this
      wx.request({
        url: 'https://127.0.0.1/library/index.php/Home/Index/comment',
        data: {
          wxname: _this.data.userInfo.nickName,
          bid: _this.data.book.id,
          content:e.detail.value.content,
          score: e.detail.value.score
        },
        method: 'GET',
        success: function (res) {
          wx.redirectTo({
            url: 'detail?bid=' + _this.data.book.id
          })
        }
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '评论内容不能为空！！',
        showCancel: false
      })
    }
  }
})