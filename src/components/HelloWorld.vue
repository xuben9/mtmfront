<template>
  <baidu-map class="bm-view" :center="mapData.center"
                :zoom="mapData.zoom"
                @ready="mapHandler"
                @click="getLocation">
    <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
  </baidu-map>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      businessDetail:{},
      mapData: {
        center: {lng: 116.404, lat: 39.915},
        zoom: 5
      },
      //BMap类
      BMap: null,
      //地图对象
      map: null
    }
  },
  methods: {
    handler ({BMap, map}) {
      console.log(BMap, map)
      this.center.lng = 116.404
      this.center.lat = 39.915
      this.zoom = 300
    },
    //地图预处理
    async mapHandler({ BMap, map }) {
      if (this.businessId) {
        //可以在此处请求接口获取坐标数据
        await this.getMallBusinessDetail()
      }
      //保存百度地图类
      this.BMap = BMap
      //保存地图对象
      this.map = map
      //如果一开始坐标存在(编辑的时候)
      map.enableScrollWheelZoom(true);
      if (this.businessDetail.longitude && this.businessDetail.latitude) {
        //设置坐标
        this.mapData.center.lng = this.businessDetail.longitude
        this.mapData.center.lat = this.businessDetail.latitude
      } else {
        //如果坐标不存在则动态获取当前浏览器坐标（创建的时候）
        let geolocation = new BMap.Geolocation()
        //获取当前的坐标（使用promise 将异步转换为同步）
        await new Promise((resolve) => {
          geolocation.getCurrentPosition((r) => {
            this.mapData.center.lng = this.businessDetail.longitude =
              r.point.lng
            this.mapData.center.lat = this.businessDetail.latitude = r.point.lat
            resolve()
          })
        })
      }
      // //创建定位标记
      // let marker = new BMap.Marker(
      //   new BMap.Point(
      //     this.businessDetail.longitude,
      //     this.businessDetail.latitude
      //   )
      // )
      // //将标记添加到地图上
      // map.addOverlay(marker)
    },
    //在地图上选择区域
    getLocation(e) {
      //设置经度
      this.businessDetail.longitude = e.point.lng
      //设置纬度
      this.businessDetail.latitude = e.point.lat
      //百度地图类
      let BMapGL = this.BMap
      //地图对象
      let map = this.map
      //清除地图上所有的覆盖物(保证每次点击只有一个标记)
      // map.clearOverlays()
      //创建定位标记
      let marker = new BMapGL.Marker(new BMapGL.Point(e.point.lng, e.point.lat), {enableDragging: true})
      //将标记添加到地图上
      map.addOverlay(marker)
      
      marker.addEventListener("rightclick", function() {map.removeOverlay(this)})

      console.log(e.point.lng, e.point.lat)
      //创建坐标解析对象
      let geoc = new BMapGL.Geocoder()
      //解析当前的坐标成地址
      geoc.getLocation(e.point, (rs) => {
        //获取地址对象
        let addressComp = rs.addressComponents
        //拼接出详细地址
        this.businessDetail.address =
          addressComp.province +
          addressComp.city +
          addressComp.district +
          addressComp.street +
          addressComp.streetNumber
      })
      console.log(this.businessDetail)
    },
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bm-view {
  width: 100%;
  height: 600px;
}
</style>
