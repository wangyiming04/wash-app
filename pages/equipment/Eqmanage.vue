<template>
	<view class="content-top">
		<view class="content-top-nav">
			<nav-barrr @confirm="chooseEq">
				<template #title>
					<view>设备管理</view>
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
			<!-- 	<view class="select" @click="toShowd">设备状态
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
							<view @click="getAll" :class="isActivee ? 'content-xiala-main' : 'active'">全部</view>
							<view class="content-xiala-main" v-for="(item1,index1) in eqListType" :key="index1"
							@click="changeType(item1,index1)" :class="{active: index1 === currentIndex}"> {{item1.name}}</view>
						</view>
					</template>
				</view>
				<!-- 内容二 -->
				<view class="show" v-show="isShowb">
					<template>
						<view class="content-xiala-leixing">
							<view class="content-xiala-main" v-for="(item2,index2) in eqListName" :key="index2"
								@click="changeName(item2,index2)" :class="{active: index2 === currentIndex}"> {{item2.name}}</view>
						</view>
					</template>
				</view>
				<!-- 内容三 -->
				<view class="show" v-show="isShowc">
					<template>
						<view class="content-xiala-leixing">
							<view class="content-xiala-main" v-for="(item3,index3) in eqListModel" :key="index3"
								@click="changeModel(item3,index3)" :class="{active: index3 === currentIndex}"> {{item3.name}}</view>
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
				<view class="">设备种类</view>
				<view class="center-top-tiaowei">设备名称</view>
			</view>
		</view>
		<view class="center-main">
			<uniCollapse accordion="true" @change="change">
				<!-- 只能下拉一个 -->
				<uniCollapseItem v-for="(item,index) in eqList" :key="index">
					<template v-slot:title>
						<view class="center-main-title">
							<view class="center-main-title1">{{index+1}}</view>
							<view class="center-main-title2">{{item.deviceType}}</view>
							<view class="center-main-title3">{{item.deviceName}}</view>
						</view>
					</template>
					<template v-slot:content>
						<view class="center-main-content">
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
									客户名称
								</view>
								<view class="center-main-content-main">
									{{item.customer}}
								</view>
							</view>
							<view class="center-main-content-title">
								<view class="center-main-content-text">
									终端用户名称
								</view>
								<view class="center-main-content-main">
									{{item.client}}
								</view>
							</view>
							<view class="center-main-content-title">
								<view class="center-main-content-text">
									状态
								</view>
								<view class="center-main-content-main">
									{{item.stat}}
								</view>
							</view>
							<view class="center-main-content-title">
								<view class="center-main-content-text">
									国家/城市
								</view>
								<view class="center-main-content-main">
									{{item.place}}
								</view>
							</view>
							<view class="center-main-content-button">
								<view class="center-main-content-buttona" @click="paramentPage(item)"><view class="tiaozheng">
									查看参数
								</view></view>
								<view class="center-main-content-buttona" @click="statePage(item)"><view class="tiaozheng">
									设备状态
								</view></view>
							</view>
						</view>
					</template>
				</uniCollapseItem>
			</uniCollapse>
		</view>
		<view :class="isActive ? 'content-footer' : 't'">
			<view class="view-btn" @click="backPage"> 上一页 </view>
			<view class="view-btn1">{{params.currentPage}}/{{params.totalPage}} </view>
			<view class="view-btn" @click="nextPage"> 下一页 </view>
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
				isActivee:false,
				isActive:true,
				eqList: [],
				isShowa: false,
				isShowb: false,
				isShowc: false,
				isShowd: false,
				imgDowna: true,
				imgDownb: true,
				imgDownc: true,
				imgDownd: true,
				newSn: [],
				newTypeList: [],
				newModelList: [],
				newNameList: [],
				eqListType: [],
				eqListName: [],
				eqListModel: [],
				currentIndex:-1,
				params: {
					totalPage: "",
					total: "",
				}
			}
		},
		components: {
			NavBarrr,
			uniCollapseItem,
			uniCollapse
		},
		onLoad() {
			uni.setStorageSync("currentPage", 1);
			uni.removeStorageSync('deviceNameId');
			uni.removeStorageSync('deviceModelId');
			uni.removeStorageSync('deviceTypeId');
			this.getEq()
			this.getEqType()
			this.getEqName()
			this.getEqModel()
		},
		methods: {
			getAll(){
				this.isActivee = !this.isActivee
				this.currentIndex = -1
				uni.removeStorageSync('deviceNameId');
				uni.removeStorageSync('deviceModelId');
				uni.removeStorageSync('deviceTypeId');
				this.getEq()
			},
			changeType(item1,index1) {
				this.currentIndex = index1
				this.isActivee = true
				console.log(item1)
				uni.removeStorageSync('deviceNameId');
				uni.removeStorageSync('deviceModelId');
				uni.setStorageSync("deviceTypeId", item1.id)
				this.getEq()
			},
			changeName(item2,index2) {
				this.currentIndex = index2
				console.log(item2)
				uni.removeStorageSync('deviceTypeId');
				uni.removeStorageSync('deviceModelId');
				uni.setStorageSync("deviceNameId", item2.id)
				this.getEq()
			},
			changeModel(item3,index3) {
				this.currentIndex = index3
				console.log(item3)
				uni.removeStorageSync('deviceNameId');
				uni.removeStorageSync('deviceTypeId');
				uni.setStorageSync("deviceModelId", item3.id)
				this.getEq()
			},
			chooseEq(data) {
				console.log(data)
				uni.setStorageSync("search", data)
				this.getEq()
			},
			backPage() {
				currentPage:uni.getStorageSync("currentPage")
				if (this.params.currentPage > 1) {
					this.params.currentPage--
					uni.setStorageSync("currentPage", this.params.currentPage);
				}
				this.getEq();
			},
			nextPage() {
				currentPage:uni.getStorageSync("currentPage")
				if (this.params.currentPage < this.params.totalPage) {
					this.params.currentPage++
					uni.setStorageSync("currentPage", this.params.currentPage);
				}
				this.getEq();
			},
			// cancelEq(){
			// 	uni.removeStorageSync('search');
			// 	uni.removeStorageSync('deviceNameId');
			// 	uni.removeStorageSync('deviceTypeId');
			// 	uni.removeStorageSync('deviceModelId');
			// 	this.getEq()
			// },
			async getEq() {
				const res = await this.$myRequest({
					url: '/v1/device/list',
					data: {
						token: this.$store.state.userInfo.token,
						deviceTypeId: uni.getStorageSync('deviceTypeId'),
						deviceNameId: uni.getStorageSync('deviceNameId'),
						deviceModelId: uni.getStorageSync('deviceModelId'),
						search: uni.getStorageSync('search'),
						currentPage: 1,
					}
				})
				console.log(res)
				this.eqList = res.data.data.info
				this.params.totalPage = res.data.data.page.totalPage
				this.params.currentPage = res.data.data.page.currentPage
				console.log(this.eqList)
				this.eqList.map((event, index) => {
					this.newSn.push({
						sn: event.sn,
					})
					// if(JSON.stringify(this.newTypeList).indexOf(JSON.stringify({deviceType: event.deviceType})) == -1){					
					// 	this.newTypeList.push({
					// 		deviceType: event.deviceType,	
					// 	})
					// }
				})
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
			toShowa() {
				this.isActive = ! this.isActive
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
				this.isActive = ! this.isActive
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
				this.isActive = ! this.isActive
				this.isShowc = !this.isShowc
				this.isShowb = false
				this.isShowa = false
				this.isShowd = false
				this.imgDownc = !this.imgDownc
				this.imgDownb = true
				this.imgDownd = true
				this.imgDowna = true
			},
			change(e) {
				// console.log(e[0])
				// var id = e[0]
				// console.log(this.eqList[id].sn)
				// var sn = this.eqList[id].sn
				// uni.setStorageSync('sn',sn)
			},
			paramentPage(item) {
				uni.setStorageSync("sn", item.sn)
				uni.navigateTo({
					url: "/pages/equipment/Parametersetting",
				})

			},
			statePage(item) {
				console.log(item.sn)
				uni.setStorageSync("sn", item.sn)
				uni.navigateTo({
					url: "/pages/equipmentstate/Statemain",
				})
			}
		}
	}
</script>

<style scoped>
	.content-top-nav{
			margin-top: 80rpx;
	}
	.allSelect {
		display: flex;
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

	.center {}

	.center-top {
		display: flex;
		justify-content: space-around;
		align-items: center;
		border-bottom: 5rpx solid #dddddd;
		height: 70rpx;
		font-size: 28rpx;
	}
	.center-top-tiaowei{
		margin-right: 15rpx;
	}
	.center-main {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.center-main-title {
		display: flex;
		align-items: center;
		height: 70rpx;
		font-size: 28rpx;
		text-align: center;
	}

	.center-main-title1 {
		margin-left: 40rpx;
		width: 90rpx;
	}

	.center-main-title2 {
		margin-left: 30rpx;
		width: 320rpx;
	}

	.center-main-title3 {
		width: 200rpx;
	}

	/deep/.uni-collapse-cell {
		display: flex;
		justify-content: center;
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
	.center-main-content-text{
		width: 168rpx;
		height: 40rpx;
		color: rgba(149, 149, 149, 100);
		font-size: 28rpx;
		font-family: PingFangSC-regular;
	}
	.center-main-content-main {
		margin-left: 40rpx;
		color: black;
	}

	.center-main-content-buttona {
		width: 150rpx;
		height: 50rpx;
		border: 1px solid #007AFF;
		color: #007AFF;
		align-items: center;
		justify-content: center;
		text-align: center;
		margin: 30rpx 30rpx 20rpx 0;
	}
	.tiaozheng{
		margin: 6rpx;
	}
	.center-main-content-button {
		display: flex;
		justify-content: flex-end;
	}

	.content-xiala-leixing {
		display: flex;
		height: 215rpx;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
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

.content-footer {
		margin-left: 43rpx;
		margin-top: 40rpx;
		display: flex;
		justify-content: space-around;
		position: absolute;
		top: 1370rpx;
	}

	.view-btn {
		width: 220rpx;
		height: 64rpx;
		line-height: 40rpx;
		border-radius: 4rpx;
		background-color: rgba(255, 255, 255, 100);
		color: rgba(0, 128, 193, 100);
		font-size: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: Arial;
		border: 2rpx solid rgba(0, 128, 193, 100);
	}

	.view-btn1 {
		width: 220rpx;
		line-height: 40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.t {
		margin-left: 43rpx;
		margin-top: 40rpx;
		display: flex;
		justify-content: space-around;
		position: absolute;
		top: 1800rpx;
	}
	.active{
		background-color: rgba(0, 128, 193, 100);
		color: rgba(255, 255, 255, 100);
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: Arial;
		text-align: center;
		height: 64rpx;
		line-height: 40rpx;
		margin: 10rpx;
		border: 2rpx solid white;
		border-radius: 2px;
		padding: 6rpx;
	}
</style>
