<template>
	<view class="content-top">
		<view class="content-top-nav">
			<nav-barrr @confirm="choosePara" @cancel="cancelPara">
				<template #title>
					<view>参数变更记录</view>
				</template>
			</nav-barrr>
		</view>
		<view class="content-center">
			<!-- 选择栏 -->
			<view class="allSelect">
				<!-- 选择1 -->
				<view class="select" @click="toShowa">设备种类
					<image src="../../static/img/down.png" v-show="imgDowna"></image>
					<image src="../../static/img/up.png" v-show="!imgDowna"></image>
				</view>
				<!-- 选择2 -->
				<view class="select" @click="toShowb">设备名称
					<image src="../../static/img/down.png" v-show="imgDownb"></image>
					<image src="../../static/img/up.png" v-show="!imgDownb"></image>
				</view>
				<!-- 选择3 -->
				<view class="select" @click="toShowc">设备型号
					<image src="../../static/img/down.png" v-show="imgDownc"></image>
					<image src="../../static/img/up.png" v-show="!imgDownc"></image>
				</view>
				<!-- 选择4 -->
				<!-- <view class="select" @click="toShowd">设备状态
					<image src="../../static/img/down.png" v-show="imgDownd"></image>
					<image src="../../static/img/up.png" v-show="!imgDownd"></image>
				</view> -->
			</view>
			<!-- 内容栏 -->
			<view class="allShow">
				<!-- 内容一 -->
				<view class="show" v-show="isShowa">
					<template>
						<view class="content-xiala-leixing">
							<view class="content-xiala-main" @click="getAll"
								:class="isActivee ? 'content-xiala-main' : 'active'">
								全部
							</view>
							<view class="content-xiala-main" v-for="(item1,index1) in eqListType" :key="index1"
								@click="changeType(item1,index1)" :class="{active: index1 === currentIndex}">
								{{item1.name}}</view>
						</view>
					</template>
				</view>
				<!-- 内容二 -->
				<view class="show" v-show="isShowb">
					<template>
						<view class="content-xiala-leixing">
							<view class="content-xiala-main" v-for="(item2,index2) in eqListName" :key="index2"
								@click="changeName(item2,index2)" :class="{active: index2 === currentIndex}">
								{{item2.name}}</view>
						</view>
					</template>
				</view>
				<!-- 内容三 -->
				<view class="show" v-show="isShowc">
					<template>
						<view class="content-xiala-leixing">
							<view class="content-xiala-main" v-for="(item3,index3) in eqListModel" :key="index3"
								@click="changeModel(item3,index3)" :class="{active: index3 === currentIndex}">
								{{item3.name}}</view>
						</view>
					</template>
				</view>
				<!-- 内容四 -->
				<!-- 				<view class="show" v-show="isShowd">
					<template>
						<view>44444</view>
					</template>
				</view> -->
			</view>
		</view>
		<view class="center">
			<view class="center-top">
				<view class="">序号</view>
				<view class="">操作时间</view>
				<view class="">操作账号</view>
			</view>
		</view>
		<view class="center-main">
			<uniCollapse accordion="true" @change="change">
				<!-- 只能下拉一个 -->
				<uniCollapseItem v-for="(item,index) in paraList" :key="index">
					<template v-slot:title>
						<view class="center-main-title">
							<view class="center-main-title1">{{index}}</view>
							<view class="center-main-title2">{{item.created_at}}</view>
							<view class="center-main-title3">{{item.user}}</view>
						</view>
					</template>
					<template v-slot:content>
						<view class="center-main-content">
							<view class="center-main-content-title">
								<view class="center-main-content-text">
									设备种类
								</view>
								<view class="center-main-content-main">
									{{item.deviceType}}
								</view>
							</view>

							<view class="center-main-content-title">
								<view class="center-main-content-text">
									设备名称
								</view>
								<view class="center-main-content-main">
									{{item.deviceName}}
								</view>
							</view>

							<view class="center-main-content-title">
								<view class="center-main-content-text">
									设备型号
								</view>
								<view class="center-main-content-main">
									{{item.deviceModel}}
								</view>
							</view>
							<view class="center-main-content-title">
								<view class="center-main-content-text">
									设备序列号
								</view>
								<view class="center-main-content-main">
									{{item.sn}}
								</view>
							</view>
							<view class="center-main-content-title">
								<view class="center-main-content-text">
									变更内容
								</view>
								<view class="center-main-content-main">
									{{item.content}}
								</view>
							</view>
						</view>
					</template>
				</uniCollapseItem>
			</uniCollapse>
		</view>
	</view>
</template>

<script>
	import uniCollapse from "../../components/uni-collapse/uni-collapse.vue"
	import uniCollapseItem from "../../components/uni-collapse-item/uni-collapse-item.vue"
	import NavBarrr from '../../components/NavBarrr.vue'
	export default {
		data() {
			return {
				isActivee: false,
				currentIndex: -1,
				paraList: [],
				isShowa: false,
				isShowb: false,
				isShowc: false,
				isShowd: false,
				imgDowna: true,
				imgDownb: true,
				imgDownc: true,
				imgDownd: true,
				eqListType: [],
				eqListModel: [],
				eqListName: []
			}
		},
		components: {
			NavBarrr,
			uniCollapse,
			uniCollapseItem
		},
		onLoad() {
			this.getPara()
			this.getEqType()
			this.getEqName()
			this.getEqModel()
		},
		methods: {
			async getPara() {
				const res = await this.$myRequest({
					url: '/v1/record/parameter-change',
					data: {
						token: this.$store.state.userInfo.token,
						deviceTypeId: uni.getStorageSync('deviceTypeId'),
						deviceNameId: uni.getStorageSync('deviceNameId'),
						deviceModelId: uni.getStorageSync('deviceModelId'),
						search: uni.getStorageSync('search'),
					}
				})
				this.paraList = res.data.data
				console.log(this.paraList)
			},
			async getEqType() {
				const res = await this.$myRequest({
					url: '/v1/device-type/list',
					data: {
						token: this.$store.state.userInfo.token,
						type: "1"
					},
				})
				console.log(res)
				this.eqListType = res.data.data
			},
			async getEqName() {
				const res = await this.$myRequest({
					url: '/v1/device-type/list',
					data: {
						token: this.$store.state.userInfo.token,
						type: "2"
					},
				})
				console.log(res)
				this.eqListName = res.data.data
			},
			async getEqModel() {
				const res = await this.$myRequest({
					url: '/v1/device-type/list',
					data: {
						token: this.$store.state.userInfo.token,
						type: "3"
					},
				})
				console.log(res)
				this.eqListModel = res.data.data
			},
			getAll() {
				this.isActivee = !this.isActivee
				this.currentIndex = -1
				uni.removeStorageSync('deviceTypeId');
				uni.removeStorageSync('deviceModelId');
				uni.removeStorageSync('deviceNameId');
				this.getPara()
			},
			changeType(item1, index1) {
				this.currentIndex = index1
				this.isActivee = true
				console.log(item1)
				uni.removeStorageSync('deviceNameId');
				uni.removeStorageSync('deviceModelId');
				uni.setStorageSync("deviceTypeId", item1.id)
				this.getPara()
			},
			changeName(item2, index2) {
				this.currentIndex = index2
				console.log(item2)
				uni.removeStorageSync('deviceTypeId');
				uni.removeStorageSync('deviceModelId');
				uni.setStorageSync("deviceNameId", item2.id)
				this.getPara()
			},
			changeModel(item3, index3) {
				this.currentIndex = index3
				console.log(item3)
				uni.removeStorageSync('deviceNameId');
				uni.removeStorageSync('deviceTypeId');
				uni.setStorageSync("deviceModelId", item3.id)
				this.getPara()
			},
			choosePara(data) {
				console.log(data)
				uni.setStorageSync("search", data)
				this.getPara()
			},
			cancelPara() {
				uni.removeStorageSync('search');
				this.getPara()
			},
			toShowa() {
				this.isShowa = !this.isShowa
				this.isShowb = false
				this.isShowc = false
				this.isShowd = false
				this.imgDowna = !this.imgDowna
				this.imgDownb = true
				this.imgDownc = true
				this.imgDownd = true
			},
			toShowb() {
				this.isShowb = !this.isShowb
				this.isShowa = false
				this.isShowc = false
				this.isShowd = false
				this.imgDownb = !this.imgDownb
				this.imgDownc = true
				this.imgDownd = true
				this.imgDowna = true
			},
			toShowc() {
				this.isShowc = !this.isShowc
				this.isShowb = false
				this.isShowa = false
				this.isShowd = false
				this.imgDownc = !this.imgDownc
				this.imgDownb = true
				this.imgDownd = true
				this.imgDowna = true
			},
			toShowd() {
				this.isShowd = !this.isShowd
				this.isShowb = false
				this.isShowc = false
				this.isShowa = false
				this.imgDownd = !this.imgDownd
				this.imgDownb = true
				this.imgDownc = true
				this.imgDowna = true
			},
			change() {},
		}

	}
</script>

<style scoped>
	.charts-box {
		width: 100%;
		height: 300px;
	}

	.content-top-nav {
		margin-top: 80rpx;
	}

	.allSelect {
		display: flex;
		justify-content: center;
		border-bottom: 5rpx solid #dddddd;
	}

	.select {
		width: 750rpx;
		height: 60rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		color: rgba(16, 16, 16, 100);
		font-family: PingFangSC-regular;
		margin-left: 55rpx;
	}

	.select image {
		width: 26rpx;
		height: 26rpx;
		background-color: rgba(255, 255, 255, 100);
	}

	.show {
		height: 200rpx;
		background-color: rgb(130, 130, 130);
	}

	.center-top {
		display: flex;
		justify-content: space-around;
		align-items: center;
		border-bottom: 5rpx solid #dddddd;
		height: 70rpx;
		font-size: 28rpx;
	}

	.center-main {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.center-main-title {
		display: flex;
		justify-content: space-around;
		align-items: center;
		/* border-bottom: 1rpx solid #dddddd; */
		height: 70rpx;
		font-size: 28rpx;
	}

	.center-main-title1 {
		margin-left: 70rpx;
		width: 100rpx;
	}

	.center-main-title2 {
		width: 280rpx;
		margin-left: 30rpx;
		margin-right: 55rpx;
	}

	.center-main-title3 {
		width: 130rpx;
	}

	.center-main-content {
		font-size: 30rpx;
		display: flex;
		justify-content: flex-start;
		flex-direction: column;
	}

	.center-main-content-title {
		display: flex;
		justify-content: flex-start;
		color: rgba(149, 149, 149, 100);
		font-size: 14px;
		text-align: left;
		font-family: PingFangSC-regular;
		margin-left: 70rpx;
	}

	.center-main-content-text {
		width: 150rpx;
		height: 50rpx;
		color: rgba(149, 149, 149, 100);
		font-size: 28rpx;
		text-align: left;

	}

	.center-main-content-main {
		width: 500rpx;
		margin-left: 40rpx;
		color: black;
	}

	.content-xiala-leixing {
		align-items: center;
		justify-content: center;
		display: flex;
		height: 215rpx;
		flex-wrap: wrap;
		background-color: rgba(241, 241, 241, 100);
	}

	.content-xiala-main {
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: Arial;
		text-align: center;
		height: 64rpx;
		line-height: 40rpx;
		margin: 10rpx;
		border: 2rpx solid white;
		background-color: rgba(255, 255, 255, 100);
		color: rgba(149, 149, 149, 100);
		border-radius: 2px;
		padding: 6rpx;
	}

	.active {
		background-color: rgba(0, 128, 193, 100);
		color: rgba(255, 255, 255, 100);
	}
</style>
