<template>
	<view class="nav-bar">
		<header class="left">
			<image src="../static/img/to left.png" @click="back"></image>
		</header>
		<view class="center">
			<main>
				<view v-show="isShow">
					<slot name="title"></slot>
				</view>
				<uni-search-bar class="content-bar" v-show="!isShow" placeholder="请输入关键词" input-align="left"
					@confirm="confirm" @input="input" @cancel="cancel"></uni-search-bar>
			</main>
		</view>
		<footer class="right">
			<view>
				<image src="../static/img/search.png" @click="searchEvent" v-show="isShower"></image>
			</view>
		</footer>
	</view>
</template>

<script>
	export default {
		name: "NavBar",
		components: {},
		data() {
			return {
				isShow: true,
				isShower: true,
			};
		},
		methods: {
			searchEvent() {
				this.isShow = false
				this.isShower = false
			},
			cancel(e) {
				this.isShow = true
				this.isShower = true
				console.log(e)
				this.$emit("cancel", e.value);
			},
			input() {

			},
			back() {
				uni.redirectTo({
					url: "/pages/home/Home",
				})
			},
			confirm(e) {
				//console.log(e)
				this.$emit("confirm", e.value);
			},
		},
	};
</script>

<style scoped>
	.nav-bar {
		width: 750rpx;
		height: 88rpx;
		line-height: 40rpx;
		/* background-color: rgba(248, 248, 248, 100); */
		color: rgba(16, 16, 16, 100);
		text-align: center;
		font-family: Arial;
		display: flex;
		align-items: center;
		justify-content: space-around;
		flex-direction: row;
		font-size: 28rpx;
		font-weight: 600;
		height: 100rpx;
	}

	.left {
		width: 48rpx;
		margin-left: 60rpx;
		margin-right: 15rpx;
	}
	.input-box {
		flex: 1;
		padding: 10rpx;
		height: 80rpx;
		font-size: 26rpx;
		border: 2rpx solid #999;
		border-radius: 8rpx;
		font-weight: normal;
	}
	.right {
		width: 48rpx;
		margin-right: 100rpx;
	}
	.content {
		height: 100rpx;
	}
	.content-nav {
		margin-top: 100rpx;
	}
	.nav-bar image {
		width: 65rpx;
		height: 65rpx;
		margin-top: 18rpx;
	}
	.main {
		display: flex;
		justify-content: center;
	}
	.center{
		font-size: 35rpx;
		width: 580rpx;
	}
	.content-bar{
		width: 490rpx;
	}
</style>
