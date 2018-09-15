
Page({
  data: {
    log: 121.443610,
    lat: 28.669770,
    controls:[],   //controls是Array类型，可能会有多个控件
    markers:[
      // {
      //   iconPath: "/images/bike.png",
      //   width: 35,
      //   height: 40,
      //   longitude: 121.443610,
      //   latitude: 28.669770
      // },
      // {
      //   iconPath: "/images/bike.png",
      //   width: 35,
      //   height: 40,
      //   longitude: 121.443610,
      //   latitude: 30.669770
      // }
    ]
  },
//首次加载页面时调用
  onLoad: function () {
    var that = this;  //this=page当前对象
    wx.getLocation({
      success: function(res) {
         //console.log打印
         var longtitude = res.longitude
         var latitude = res.latitude
         that.setData({  //往that里面的data赋值
           log : longtitude,
           lat : latitude
         })
      },
    })

    wx.getSystemInfo({
      success: function(res) {
        var windowWidth = res.windowWidth;
        var windowHeight = res.windowHeight;
        that.setData({
          controls: [
            {
              id: 1,
              //控件的背景图片
              iconPath: '/images/qrcode.png',
              //控件的相对页面的位置
              position: {
                width: 100,
                height: 40,
                left: windowWidth / 2 - 50,
                top: windowHeight - 60
              },
              //是否可点击
              clickable: true
            },

            {
              //充值按钮
              id : 4,
              iconPath: '/images/pay.png',
              position:{
                width : 40,
                height : 40,
                left : windowWidth - 45,
                top : windowHeight - 100
              },
              //是否可点击
              clickable: true
            },

            {
              //报修
              id : 6,
              iconPath: '/images/warn.png',
              position:{
                width : 35,
                heigth : 35,
                left : windowWidth - 42,
                top : windowHeight - 60
              },
              //是否可点击
              clickable: true
            },

            {
              //重新定位
              id: 2,
              iconPath: '/images/img1.png',
              position: {
                width: 40,
                heigth: 40,
                left: 10,
                top: windowHeight - 60
              },
              //是否可点击
              clickable: true
            },

            {
              //中心点位置
              id : 3,
              iconPath : '/images/location.png',
              position : {
                width : 20,
                height : 35,
                left : windowWidth/2 - 10,
                top : windowHeight/2 -40
              },
              //是否可点击
              clickable: true
            },

            { //添加车辆
              id: 5,
              iconPath: "/images/add.png",
              position: {
                width: 35,
                height: 35
              },
              //是否可点击
              clickable:true
            }
          ]
        })
      },
    })
  },
  // 生命周期函数--监听页面初次渲染完成


  //控件被点击事件
  controltap: function (e){
    // console.log(e)
    var that = this;
    var cid = e.controlId;
    switch(cid){
      //定位按钮
      case 2:{
        this.mapCtx.moveToLocation()
        break;
      }
      //添加车辆
      case 5:{
        // console.log("add a bike")
        //获取当前已有的车辆
        var bikes = that.data.markers;
        bikes.push(
          {
            iconPath: "/images/bike.png",
            width: 35,
            height: 40,
            longitude: that.data.log,
            latitude: that.data.lat
          }
        )
        //重新复制
        that.setData({
          markers: bikes
        })
        break;
      }
    }
  },

  //移动后地图视野3发生变化触发的事件
  regionchange: function(e){
    // console.log(e)
    //获取移动后的位置
    var that = this;
    var etype = e.type;
    if(etype == 'end'){
      this.mapCtx.getCenterLocation({
        success: function(res){
          that.setData({
            log: res.longitude,
            lat: res.latitude
          })
        }
      })
    }
  },

  onReady: function(){
    //创建map上下文
    this.mapCtx = wx.createMapContext('myMap')
  }
})
