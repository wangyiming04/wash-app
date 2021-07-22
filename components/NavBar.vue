<template>
	<view class="nav-bar">
		<header class="left">
			<slot name="header"></slot>
		</header>
		<main class="center">
			<slot></slot>
		</main>
		<footer class="right">
			<slot name="footer"></slot>
		</footer>
	</view>
</template>

<script>
	export default{
		name:"NavBar",
		components:{
		}
	}
</script>

<style scoped>
	 .nav-bar {
	 	width: 750rpx;
	 	height: 40rpx;
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
	 .input-box {
	 	flex: 1;
	 	padding: 10rpx;
	 	height: 80rpx;
	 	font-size: 26rpx;
	 	border: 2rpx solid #999;
	 	border-radius: 8rpx;
	 	font-weight: normal;
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
	 }
	 .left{
		margin-right: 120rpx;
		width: 48rpx;
	 }
	 .right{
		 width: 48rpx;
	 }
</style>
