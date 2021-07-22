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
					<view>设备日志</view>
				</template>
			</nav-bar>
		</view>
<!-- 	    <view class="container-center">
			<nav-bar>
				<template #center>
					<view>报警记录</view>
				</template>
			</nav-bar>
		</view> -->
		<view class="center">
			<view class="center-top">
				<view class="">序号</view>
				<view class="">日期</view>
				<view class="">事件</view>
			</view>
		</view>
		<view class="center-main">
				<uni-collapse accordion="true" @change="change"><!-- 只能下拉一个 -->
<!-- 				<uni-collapse-item v-for="(item,index) in companyList" :key="index">
					<template v-slot:title>
						<view class="center-main-title">
							<view class="center-main-title1">{{index}}</view>
							<view class="center-main-title2">{{item.companyName}}</view>
							<view class="center-main-title3">{{item.companyType}}</view>
							<view class="center-main-title3">{{item.place}}</view>
						</view>
					</template>
					<template v-slot:content>
						<view class="center-main-content">
							<view class="center-main-content-title">公司地址
								<view class="center-main-content-main">
									{{item.companyAddr}}
								</view>
							</view>
		
							<view class="center-main-content-title">公司邮箱
								<view class="center-main-content-main">
									{{item.companyEmail}}
								</view>
							</view>
		
							<view class="center-main-content-title">国家/城市
								<view class="center-main-content-main">
									{{item.place}}
								</view>
							</view>
						</view>
					</template>
				</uni-collapse-item> -->
			</uni-collapse>
		</view>
	</view>
</template>

<script>
	import NavBar from '../../components/NavBar.vue'
	export default {
		data() {
			return {
				items:['报警记录'],
				current: 0,
				colorIndex: 0,
				warnList:[],
			}
		},
		components: {
			NavBar
		},
		onLoad() {
			this.getWarn()
		},
		methods:{
			async getWarn() {
				//console.log(this.$store.state.userInfo.token)
				const res = await this.$myRequest({
					url: '/v1/warn/list',
					data: {
						// token: uni.getStorageSync('token')
						token: this.$store.state.userInfo.token,
						sn: uni.getStorageSync('sn')
					}
				})
				console.log(res)
				this.warnList = res.data.data
				console.log(this.warnList)
			},
			back(){
				uni.navigateTo({
					url: "/pages/equipmentstate/Statemain",
				})	
			},
		}
	}
</script>

<style scoped>
	.container{
		height: 100rpx;
	}
	.container-top {
		margin-top: 100rpx;
	}
	
	.container-top image {
		width: 65rpx;
		height: 65rpx;
		margin-top: 18rpx;
	}
	.center-top {
		display: flex;
		justify-content: space-around;
		align-items: center;
		border-bottom: 1rpx solid #dddddd;
		height: 70rpx;
		font-size: 28rpx;
	}
</style>