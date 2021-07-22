<template>
	<view class="content">
		<view class="content-nav">
			<nav-bar class="content-nav-title">
				<template #header>
					<view>
						<image src="../../static/img/to left.png" @click="back"></image>
					</view>
				</template>
				<template>
					<view v-show="isShow"><slot name="title"></slot></view>
					<uni-search-bar class="content-bar" v-show="!isShow" placeholder="请输入关键词进行搜索" input-align="left" 
					@confirm="search" @input="input" @cancel="cancel"></uni-search-bar>
				</template>
				<template #footer>
					<view>
						<image src="../../static/img/search.png" @click="searchEvent" v-show="isShower"></image>
					</view>
				</template>
			</nav-bar>
		</view>
	</view>
</template>

<script>
	import NavBar from '../NavBar.vue'
	export default {
		data() {
			return {
				isShow: true,
				isShower: true,
			}
		},
		components: {
			NavBar
		},
		methods:{
			back(){
				uni.navigateBack({
					url: "/pages/home/Home",
				})
			},
			cancel() {
				this.isShow = true
				this.isShower = true
			},
			input(){
				
			},
			search(){
				uni.showToast({
					title:"搜索ing",
				})
			},
			searchEvent() {
				this.isShow = false
				this.isShower = false
			},
			
			
		}
	}
</script>

<style scoped>
	.content{
		height: 100rpx;
	}
	.content-nav {
		margin-top: 100rpx;
	}
	
	.content-nav-title image {
		width: 65rpx;
		height: 65rpx;
		margin-top: 18rpx;
	}
	
	.content-bar {
		margin-bottom: 740rpx;
	}
	.main{
		display: flex;
		justify-content: center;
	}
</style>
