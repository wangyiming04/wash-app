<template>
	<view class="main">
		<view class="main-logo">
			<image src="../../static/img/Logo.png"></image>
		</view>
		<view class="main-text">
			账号名称
		</view>
		<view class="main-input">
			<input type="text" v-model='username' placeholder-class="place" placeholder="请输入您的账号" />
		</view>
		<view class="main-text-1" v-for="(value,index) in iconType" :key="index" v-show="isShow">
			<icon :type="value" size="18" />
			<view>
				{{errorMsg}}
			</view>
		</view>
		<view class="main-text">
			账号密码
		</view>
		<view class="main-input">
			<input type="password" v-model='password' placeholder-class="place" placeholder="请输入账号密码" />
		</view>
		<view class="main-btn" @click='loginBtn(username,password)'>
			登 陆
		</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'

	export default {
		data() {
			return {
				iconType: ['cancel'],
				isShow: false,
				BASE_URL: 'https://hydro.jihepingfang.com/',
				loginUrl: 'v1/user/login',
				userListUrl: '/v1/user/list',
				username: '', //用户名
				password: '', //密码
				errorMsg: '',
				userInfo: {}
			}
		},
		onLoad() {
			this.iconType = ['cancel'];
		},
		methods: {
			...mapMutations(['login']),

			loginBtn(name, passw) {
				uni.showLoading({
					title: '登录中'
				});
				//console.log(name)
				//console.log(passw) 
				let data = {
					'name': name,
					'password': passw
				}
				this.getParamsRequest(this.BASE_URL + this.loginUrl, data).then((res) => {
					//console.log(res)
					let code = res.data.code
					if (code === 2000) {
						this.isShow = false;
						this.userInfo = res.data.data //这样，一整个都获取到了
						console.log(this.userInfo)
						// 存储token
						uni.setStorageSync('token', this.userInfo.token)
						//提交到vuex
						this.$store.state.userInfo.token = this.userInfo.token
						//获取用户数据
						let userInfo = {
							userName: res.data.data.name,
							role: res.data.data.role,
							token: res.data.data.token,
						}
						// uni.setStorage({
						// 	key:'token',
						// 	data:userInfo,
						// 	success:function(){
						// 		uni.getStorage({
						// 			key:'token',
						// 			success:function(res){
						// 				console.log(res.data);
						// 			}
						// 		});
						// 	}
						// });
						//执行vuex里面的登录函数并把用户数据传输过去
						this.login(userInfo)
						//转换
						switch (this.userInfo.role) {
							case 'customer':
								console.log(this.userInfo.role)
								this.userInfo.role = "客户"
								break;
							case 'admin':
								console.log(this.userInfo.role)
								this.userInfo.role = "管理员"
								break;
							case 'client':
								console.log(this.userInfo.role)
								this.userInfo.role = "终端"
								break;
							case 'super':
								console.log(this.userInfo.role)
								this.userInfo.role = "超级管理员"
								break;

						}
						console.log(code)
						console.log(this.userInfo.role)
						this.$store.state.userInfo.role = this.userInfo.role
						
						//登录成功 跳转界面
						uni.navigateTo({
							url: "/pages/home/Home",
							success: res => {},
							fail: () => {},
							complete: () => {},
						})
					} else {
						//用户名密码错误
						this.isShow = true
						this.errorMsg = res.data.msg
						console.log(res.data.msg)
					}uni.hideLoading()
				})
			},
			//post请求
			getParamsRequest(url, params) {
				return new Promise((resolve, reject) => {
					uni.request({
						header: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						url: url, //仅为示例，并非真实接口地址。
						method: 'POST',
						data: params,
						dataType: 'json',
						success: (res) => {
							resolve(res)
						}
					});
				})
			},
		}
	}
</script>

<style scoped>
	.main {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.main-logo image {
		width: 448rpx;
		height: 150rpx;
		margin: 320rpx 242rpx 226rpx 60rpx;
	}

	.main-input {
		display: flex;
		align-items: center;
		width: 630rpx;
		height: 64rpx;
		line-height: 34rpx;
		border-radius: 4rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 24rpx;
		text-align: left;
		box-shadow: 0rpx 4rpx 20rpx 0rpx rgba(0, 0, 0, 0.07);
		font-family: Arial;
		border: 2rpx solid rgba(227, 20, 20, 100);
		border: solid 1rpx #333333;
		margin: 0 50rpx;
		padding-left: 10rpx
	}

	.main-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 630rpx;
		height: 88rpx;
		line-height: 40rpx;
		border-radius: 4rpx;
		background-color: rgba(0, 128, 193, 100);
		color: rgba(255, 255, 255, 100);
		font-size: 28rpx;
		text-align: center;
		box-shadow: 0rpx 4rpx 20rpx 0rpx rgba(0, 128, 193, 30);
		font-family: Arial;
		margin-top: 110rpx;
	}

	.main-text {
		width: 112rpx;
		height: 40rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: SourceHanSansSC-regular;
		margin-right: 539rpx;
		margin-bottom: 10rpx;
		margin: 10rpx 539rpx 10rpx 30rpx;
	}

	.place {
		font-size: 26rpx;
		line-height: 48rpx;
	}

	.main-text-1 {
		display: flex;
		flex-direction: row;
		color: rgb(227, 20, 20);
		height: 72rpx;
		color: rgba(227, 20, 20, 100);
		font-size: 24rpx;
		font-family: SourceHanSansSC-regular;
		margin-right: 400rpx;
	}
</style>
