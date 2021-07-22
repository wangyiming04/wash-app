<template>
	<view class="content">
		<view class="main">
			<view class="main-title">
				<view class="main-title-text">欢迎,</view>
				<image src="../../static/img/over.png" @click="onremoveLogout"></image>
			</view>
			<view class="main-title-1">
				{{$store.state.userInfo.userName}}
				<view class="main-title-1-1">
					{{$store.state.userInfo.role}}
				</view>
			</view>
			<view class="main-title-2">
			</view>
			<view class="main-title-2">
			</view>
		</view>
		<view class="center">
			<view></view>
			<view class="center-main" v-for="(item,index) in blockList" :key="index" v-show="blockShow"
				@click="nextPage('',`${item.title}`)">
				<view class="center-img">
					<image class="center-img-image" :src="item.imgUrl"></image>
				</view>
				<view class="center-title">{{item.title}}</view>
				<view class="center-data">{{item.data}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				blockShow: true,
				isShow: false,
				user: [],
				// LoginData:{},
				blockList: [{
						imgUrl: require('../../static/img/ac.png'),
						title: '账号管理',
						data: '',
					},
					{
						imgUrl: require('../../static/img/company.png'),
						title: '公司管理',
						data: '',
					},
					{
						imgUrl: require('../../static/img/ab.png'),
						title: '设备管理',
						data: '',
					},
					{
						imgUrl: require('../../static/img/zhuangtai.png'),
						title: '设备状态',
						data: '设备实时状态',
					},
					{
						imgUrl: require('../../static/img/canshu.png'),
						title: '参数变更记录',
						data: '',
					},
					{
						imgUrl: require('../../static/img/tongji.png'),
						title: '统计报告',
						data: '设备/化料报表',
					},
					{
						imgUrl: require('../../static/img/type.png'),
						title: '设备类型管理',
						data: '设备种类/名称/型号'
					}
				]
			}
		},
		computed: {
			...mapState(['userInfo'])
		},
		// onLoad(){
		// 	this.LoginData = {
		// 		username: uni.getStorageSync('username'),
		// 		role: uni.getStorageSync('role')
		// 	
		// },
		methods: {
			...mapMutations(['logout']),
			// 是否退出登录
			onremoveLogout() {
				var that = this
				uni.showModal({
					title: '提示',
					content: '是否退出登录',
					success: function(res) {
						if (res.confirm) {
							that.logout(res)
							uni.navigateTo({
								url: "/pages/login/Login",
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					},
				})
			},
			nextPage(index, title) {
				console.log(title)
				// if(title=="账号管理"){
				// 	uni.navigateTo({
				// 	url:"/pages/zhanghao/zhanghaoguanli",
				// 	})
				// }
				switch (title) {
					case "账号管理":
						uni.showLoading({
							title: '加载中'
						});
						uni.navigateTo({
							url: "/pages/account/Acmanage",
						})
						uni.hideLoading()
						break;
					case "公司管理":
						uni.showLoading({
							title: '加载中'
						});
						uni.navigateTo({
							url: "/pages/company/Commanage",
						})
						uni.hideLoading()
						break;

					case "设备管理":
						uni.showLoading({
							title: '加载中'
						});
						uni.navigateTo({
							url: "/pages/equipment/Eqmanage",
						})
						uni.hideLoading()
						break;

					case "设备类型管理":
						uni.showLoading({
							title: '加载中'
						});
						uni.navigateTo({
							url: "/pages/equipmenttype/Eqtypemanage",
						})
						uni.hideLoading()
						break;

					case "设备状态":
						uni.showLoading({
							title: '加载中'
						});
						uni.navigateTo({
							url: "/pages/equipmentstate/Eqstatemanage",
						})
						uni.hideLoading()
						break;

					case "参数变更记录":
						uni.showLoading({
							title: '加载中'
						});
						uni.navigateTo({
							url: "/pages/parameter/Parameter",
						})
						uni.hideLoading()
						break;

					case "统计报告":
						uni.showLoading({
							title: '加载中'
						});
						uni.navigateTo({
							url: "/pages/statistics/Statistics",
						})
						uni.hideLoading()
						break;

				}
			}
		},
		// switch ($store.state.userInfo.role){
		// 	case customer:
		// 	this.$store.state.userInfo.role = "客户"
		// 	break;
		// }

	}
</script>

<style scoped>
	.main {
		background-color: rgb(248, 248, 248);
		width: 750rpx;
		height: 350rpx;
		display: flex;
		flex-direction: column;
	}

	.main-title {
		margin-top: 130rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 40rpx;
		font-family: PingFangSC-regular;
	}

	.main-title-text {
		position: absolute;
		left: 50rpx;
		top: 128rpx;
		width: 120rpx;
		height: 56rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 40rpx;
		text-align: left;
		font-family: PingFangSC-regular;
	}

	.main-title-1 {
		display: flex;
		flex-direction: row;
		font-size: 40rpx;
		margin-top: 75rpx;
		color: rgba(16, 16, 16, 100);
		font-family: PingFangSC-bold;
		margin-left: 50rpx;
		;

	}

	.main-title image {
		position: absolute;
		top: 138rpx;
		left: 652rpx;
		width: 48rpx;
		height: 48rpx;
	}

	.main-title-1-1 {
		display: flex;
		margin-left: 30rpx;
		font-weight: 400;
		border: 1rpx solid rgb(166, 166, 166);
		background-color: rgb(166, 166, 166);
		color: white;
		height: 60rpx;
		align-items: center;
		font-size: 36rpx;
		width: 200rpx;
		height: 56rpx;
		line-height: 40rpx;
		border-radius: 4rpx;
		font-family: Arial;
		justify-content: center;
	}

	.center {
		display: flex;
		flex-wrap: wrap;
	}

	.center-main {
		width: 300rpx;
		height: 300rpx;
		background-color: rgb(248, 248, 248);
		display: flex;
		flex-direction: column;
		text-align: center;
		justify-content: center;
		align-items: center;
		margin-top: 30rpx;
		margin-left: 50rpx;
	}

	.center-img {
		width: 100rpx;
		height: 100rpx;
		/* background-color: rgb(166, 166, 166); */

	}

	.center-img-image {
		width: 80rpx;
		height: 80rpx;

	}

	.center-title {
		margin-top: 20rpx;
	}

	.center-data {
		margin-top: 20rpx;
		color: rgb(166, 166, 166);
	}
</style>
