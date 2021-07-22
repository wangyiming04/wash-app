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
				<template #footer>
					<view @click="netPage" class="text">设备日志</view>
				</template>
			</nav-bar>
		</view>
		<view class="container-center" v-for="(item,index) in stateList" :key="index">
			<view class="container-center-block">
				<view class="container-center-block-title">
					<view class="container-center-block-text">
						洗衣龙仓{{index}}
					</view>
				</view>
				<view class="container-center-block-center">
					<view class="container-center-block-up">
						配方名称
						<view class="container-center-block-down">
							{{item.recipe}}
						</view>
					</view>
					<view class="container-center-block-up">
						泵的状态
						<view class="container-center-block-down">
							{{item.pump}}
						</view>
					</view>
					<view class="container-center-block-up">
						运行状态
						<view class="container-center-block-down">
							{{item.stat}}
						</view>
					</view>
				</view>
				<view class="container-center-block-bottom">
					<view class="container-center-block-up">
						所加药剂名称及加药量
					</view>	
					<view class="container-center-block-topblock">
						<view class="container-center-block-block" v-for="(itema,indexa) in item.medicamentName"
							:key="indexa">
							<view class="">
								{{itema}}
							</view>
						</view>
					</view>
					<view class="container-center-block-top1block">
						<view class="container-center-block-1block" v-for="(itemb,indexb) in item.consume" :key="indexb">
							<view class="">
								{{itemb}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import NavBar from '../../components/NavBar.vue'
	export default {
		data() {
			return {
				stateList: [],
			}
		},
		components: {
			NavBar
		},
		onLoad() {
			this.getState()
		},
		methods: {
			back() {
				uni.navigateBack({
				    delta: 1
				});
			},
			netPage() {
				uni.navigateTo({
					url: "/pages/equipmentstate/Journal",
				})
			},
			async getState() {
				//console.log(this.$store.state.userInfo.token)
				const res = await this.$myRequest({
					url: '/v1/device/channel-state',
					data: {
						// token: uni.getStorageSync('token')
						token: this.$store.state.userInfo.token,
						sn: uni.getStorageSync('sn')
					}
				})
				console.log(res)
				this.stateList = res.data.data
				console.log(this.stateList)
			},
		},
	}
</script>

<style scoped>
	.container {
		height: 750rpx;
	}

	.container-top {
		margin-top: 100rpx;
	}

	.container-top image {
		width: 65rpx;
		height: 65rpx;
		margin-top: 18rpx;
	}

	.container-center {
		left: 30rpx;
		top: 206rpx;
		width: 690rpx;
		height: 460rpx;
		line-height: 40rpx;
		text-align: center;
		border: 2rpx solid rgba(187, 187, 187, 100);
		margin: 30rpx;
	}

	.container-center-block-title {
		width: 130rpx;
		height: 86rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		border-bottom: 2rpx solid rgba(187, 187, 187, 100);
		width: 100%;
	}

	.container-center-block-text {
		position: absolute;
		right: 240rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 30rpx;
		font-weight: 900;
		width: 100%;
		font-family: SourceHanSansSC-bold;
		margin-top: 20rpx;
	}

	.container-center-block-center {
		display: flex;
		justify-content: space-between;
	}

	.container-center-block-up {
		margin: 40rpx;
		height: 30rpx;
		color: rgba(136, 136, 136, 100);
		font-size: 20rpx;
		text-align: left;
		font-family: SourceHanSansSC-regular;
	}

	.container-center-block-down {
		width: 168rpx;
		height: 40rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: SourceHanSansSC-regular;
	}

	.container-center-block-topblock {
		position: absolute;
		margin-left: 33rpx;
		
	}

	.container-center-block-top1block {
		position: absolute;
		margin-left: 300rpx;
		
	}
	.container-center-block-block{
		width: 300rpx;
		height: 40rpx;
		line-height: 40rpx;
		background-color: rgba(255, 255, 255, 100);
		border: 2rpx solid rgba(240, 240, 240, 100);
	}
	.container-center-block-1block{
		width: 300rpx;
		height: 40rpx;
		line-height: 40rpx;
		background-color: rgba(255, 255, 255, 100);
		border: 2rpx solid rgba(240, 240, 240, 100);
		border-left: none;
	}
	.text{
		width: 115rpx;
	}
</style>
