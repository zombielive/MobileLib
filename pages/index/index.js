//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    bookList: [],
    start:0,
    keyword:'',
    //加载更多按钮相关设定
    loading:false,
    disabled:true,
    loadmoreTxt:'加载更多'
  },
  //事件处理函数
  searchSubmit: function(e) {
    if(e.detail.value.bookname!==''){
      //console.log('form发生了submit事件，携带数据为：', e.detail.value)
      var _this = this
      _this.setData({
        'bookList':[],
        'keyword':e.detail.value.bookname,
        'disabled':true,
        loadmoreTxt:'加载更多',
        'start':0
      })
      wx.showLoading({
        title:'搜索中',
        mask:true
      })
      wx.request({  
        url:'https://127.0.0.1/library/index.php/Home/Index/search',
        data: {
          keyword:e.detail.value.bookname,
          start:_this.data.start
        },
        method: 'GET',
        header: {
          'content-type': 'application/json'
        }, // 设置请求的 header
        success: function(res){
          _this.setData({
            'bookList':_this.data.bookList.concat(res.data),
            'disabled':false,
            'start':_this.data.start+5
          })
          wx.hideLoading()
        }
      })
    }else{
      wx.showModal({
        title:'提示',
        content:'书名不能为空！！',
        showCancel:false
      })
    }   
  },
  loadmore:function(e) {
    this.setData({
      loading:true,
      disabled:true
    })
    var _this = this
    wx.request({  
      url:'https://127.0.0.1/library/index.php/Home/Index/search',
        data: {
          keyword:_this.data.keyword,
          start:_this.data.start
        },
        method: 'GET',
        header: {
          'content-type': 'application/json'
        }, // 设置请求的 header
        success: function(res){
          if(res.data.length){
            _this.setData({
              'bookList':_this.data.bookList.concat(res.data),
              'disabled':false,
              'loading':false,
              'start':_this.data.start+5
            })
          }else{
            _this.setData({
              'loadmoreTxt':'没有更多',
              'loading':false
            })
          }
        }
      })
  },
  detail:function(e) {
    wx.navigateTo({
      url: 'detail?bid='+e.currentTarget.dataset.bid
    })
  }
})
