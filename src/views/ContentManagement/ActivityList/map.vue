<template>
	<div>
		<el-input placeholder="请输入xx市+详细地址" style="width: 300px; margin-right: 10px" v-model="address" size="mini"></el-input>
		<el-button type="primary" size="mini" @click="getAddress()">确定</el-button>
		<div id="allmap" style="height: 300px"></div>
	</div>
</template>

<script>
export default {
	props: {
		radius: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			map: {},
			circle: {},
			address: ''
		};
	},
	watch: {
		radius(v) {
			console.log(v);
			this.circle.setRadius(v);
		}
	},
	mounted() {
		this.mapLoad();
	},
	methods: {
		//地图生成
		mapLoad() {
			// GL版命名空间为BMapGL
			// 按住鼠标右键，修改倾斜角和角度
			var map = new BMapGL.Map('allmap'); // 创建Map实例
			map.centerAndZoom(new BMapGL.Point(116.404, 39.915), 11); // 初始化地图,设置中心点坐标和地图级别
			map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
			var scaleCtrl = new BMapGL.ScaleControl(); // 添加比例尺控件
			map.addControl(scaleCtrl);
			var zoomCtrl = new BMapGL.ZoomControl(); // 添加比例尺控件
			map.addControl(zoomCtrl);
			var geolocation = new BMapGL.Geolocation();
			geolocation.getCurrentPosition(
				function (r) {
					if (this.getStatus() == BMAP_STATUS_SUCCESS) {
						var mk = new BMapGL.Marker(r.point);
						map.addOverlay(mk);
						map.panTo(r.point);
						//alert('您的位置：' + r.point.lng + ',' + r.point.lat);
					} else {
						alert('failed' + this.getStatus());
					}
				},
				{ enableHighAccuracy: true }
			);
			this.map = map;
		},
		//解析地址
		getAddress() {
			let _this = this;
			if (this.address.trim() == '') return;
			var localSearch = new BMapGL.LocalSearch(this.map);
			localSearch.enableAutoViewport(); //允许自动调节窗体大小
			localSearch.setSearchCompleteCallback(function (searchResult) {
				var poi = searchResult.getPoi(0); //document.getElementById("result_").value = poi.point.lng + "," + poi.point.lat; //获取经度和纬度，将结果显示在文本框中
				console.log(poi);
				_this.circle = new BMapGL.Circle(poi.point, Number(_this.radius), {
					strokeColor: 'red', //边线颜色。
					fillColor: '#DDD3D1', //填充颜色。当参数为空时，圆形将没有填充效果。
					strokeWeight: 2, //边线的宽度，以像素为单位。
					strokeOpacity: 0.8, //边线透明度，取值范围0 - 1。
					fillOpacity: 0.6, //填充的透明度，取值范围0 - 1。
					strokeStyle: 'solid' //边线的样式，solid或dashed。
				});
				_this.map.addOverlay(_this.circle);
				_this.map.centerAndZoom(poi.point, 16);
    _this.map.addOverlay(new BMapGL.Marker(poi.point, { title: _this.address }));
    poi.point.addressName=_this.address;
				_this.$emit('setlngAndLat', poi.point);
			});
			localSearch.search(_this.address);

			//创建地址解析器实例
			/* 			var myGeo = new BMapGL.Geocoder();
			// 将地址解析结果显示在地图上，并调整地图视野
			myGeo.getPoint(_this.address, function (point) {
				if (point) {
					console.log(point);
					_this.map.centerAndZoom(point, 16);
					_this.map.addOverlay(new BMapGL.Marker(point, { title: _this.address }));
				} else {
					alert('您选择的地址没有解析到结果！');
				}
			}); */
		}
	}
};
</script>

<style></style>
