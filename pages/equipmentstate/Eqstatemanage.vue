<template>
	<view class="container">
		<view class="container-top">
			<nav-bar>
				<template #header>
					<view>
						<image src="../../static/img/to left.png" @click="back"></image>
					</view>
				</template>
				<template>
					<view>设备状态</view>
				</template>
			</nav-bar>
		</view>
		<view class="container-center">
			<view class="container-center-title">
				设备种类
			</view>
			<uni-data-picker v-model="eq" :localdata="newTypeList" @change="onchange" placeholder="请选择设备种类">
			</uni-data-picker>
			<view class="container-center-title">
				设备名称
			</view>
			<uni-data-picker v-model="eq1" :localdata="newNameList" @change="onchangeName" placeholder="请选择设备名称">
			</uni-data-picker>
			<view class="container-center-title">
				设备型号
			</view>
			<uni-data-picker v-model="eq2" :localdata="newModelList" @change="onchangeModel" placeholder="请选择设备型号">
			</uni-data-picker>
			<view class="container-center-title">
				设备序列号
			</view>
			<uni-data-picker v-model="eq3" :localdata="newSnList" @change="onchangeSn" placeholder="请选择序列号">
			</uni-data-picker>
			<view class="btn" @click="btnEvent">
				筛选设备
			</view>
		</view>
	</view>
</template>

<script>
	import NavBar from '../../components/NavBar.vue'
	export default {
		data() {
			return {
				typeList: [],
				newTypeList: [],
				eq: '',
				nameList: [],
				newNameList: [],
				eq1: '',
				modelList: [],
				newModelList: [],
				eq2: '',
				eq3: '',
				newSnList: [],
			}
		},
		components: {
			NavBar,
		},
		onLoad() {
			this.getType()
		},
		methods: {
			onchange(e) {
				//console.log(e.detail.value[0].id)
				let pid = e.detail.value[0].id
				//console.log(pid)
				uni.setStorageSync("pid", pid)
				this.getName()
				this.eq1 = []
				this.eq3 = []
				this.newNameList = []
				this.newModelList = []
				this.newSnList = []
			},
			onchangeName(e) {
				//console.log(e.detail.value[0].id)
				let pidd = e.detail.value[0].id
				//console.log(pid)
				uni.setStorageSync("pidd", pidd)
				this.getModel()
				this.eq2 = []
				this.newModelList = []
			},
			onchangeModel(e) {
				this.newSnList = []
				console.log(e)
				let deviceModelId = e.detail.value[0].id
				uni.setStorageSync("deviceModelId", deviceModelId)
				this.getDropdown()
			},
			onchangeSn(e) {
				console.log(e)
				let sn = e.detail.value[0].value
				uni.setStorageSync("sn", sn)
			},
			btnEvent() {
				uni.navigateTo({
					url: "/pages/equipmentstate/Statemain",
				})
			},
			back() {
				uni.redirectTo({
					url: "/pages/home/Home",
				})
			},
			async getType() {
				//console.log(this.$store.state.userInfo.token)
				const res = await this.$myRequest({
					url: '/v1/device-type/list',
					data: {
						// token: uni.getStorageSync('token')
						token: this.$store.state.userInfo.token,
						type: '1'
					}
				})
				console.log(res)
				this.typeList = res.data.data
				res.data.data.map((event, index) => {
					console.log(event)
					this.newTypeList.push({
						text: event.name,
						value: event.name,
						id: event.id,
					})
				})
			},
			async getName() {
				//console.log(this.$store.state.userInfo.token)
				const res = await this.$myRequest({
					url: '/v1/device-type/list',
					data: {
						// token: uni.getStorageSync('token')
						token: this.$store.state.userInfo.token,
						type: '2',
						pid: uni.getStorageSync('pid'),
					}
				})
				console.log(res)
				this.nameList = res.data.data
				res.data.data.map((event, index) => {
					//console.log(event)
					this.newNameList.push({
						text: event.name,
						value: event.name,
						id: event.id,
					})
				})
			},
			async getModel() {
				//console.log(this.$store.state.userInfo.token)
				const res = await this.$myRequest({
					url: '/v1/device-type/list',
					data: {
						// token: uni.getStorageSync('token')
						token: this.$store.state.userInfo.token,
						type: '3',
						pid: uni.getStorageSync('pidd'),
					}
				})
				console.log(res)
				this.modelList = res.data.data
				res.data.data.map((event, index) => {
					console.log(event)
					this.newModelList.push({
						text: event.name,
						value: event.name,
						id: event.id,
					})
				})
			},
			async getDropdown() {
				//console.log(this.$store.state.userInfo.token)
				const res = await this.$myRequest({
					url: '/v1/device/dropdown-list',
					data: {
						deviceModelId: uni.getStorageSync('deviceModelId'),
						// token: uni.getStorageSync('token')
						token: this.$store.state.userInfo.token,
					}
				})
				console.log(res)
				this.deviceSn = res.data.data
				res.data.data.map((event) => {
					console.log(event)
					this.newSnList.push({
						text: event.sn,
						value: event.sn,
						id: event.sn,
					})
				})
			},
		},
	}
</script>

<style scoped>
	.container-top {
		margin-top: 100rpx;
	}

	.container-top image {
		width: 65rpx;
		height: 65rpx;
		margin-top: 18rpx;
	}

	.container-center-title {
		margin-top: 40rpx;
		margin-left: 40rpx;
		margin-bottom: 20rpx;
	}

	/deep/.input-value {
		width: 85%;
		margin-left: 40rpx;
	}

	.btn {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 750rpx;
		height: 88rpx;
		line-height: 40rpx;
		background-color: rgba(149, 149, 149, 100);
		color: rgba(255, 255, 255, 100);
		font-size: 28rpx;
		font-family: Arial;
		margin-top: 80rpx;
	}
</style>
