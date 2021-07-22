<template>
	<view class="content">
		<view class="content-nav">
			<nav-barrr @confirm = "searchbar">
				<template #title>
					<view>账号管理</view>
				</template>
			</nav-barrr>
		</view>
		<view class="content-xiala">
			<uniCollapse @change="change">
				<uniCollapseItem>
					<template v-slot:title class="content-xiala-top">
						<view class="content-xiala-title">
							账号类型
						</view>
					</template>
					<template v-slot:content>
						<view class="content-xiala-leixing">
							<view class="content-xiala-main" @click="searchType(item1,index1)"
								v-for="(item1, index1) in typeList" :key="index1"
										:class="{ active: index1 === currentIndex }"
										>{{ item1.name }}</view>
						</view>
					</template>
				</uniCollapseItem>
			</uniCollapse>
		</view>
		<view class="center">
			<view class="center-top">
				<view class="center-top-tiaowei1">序号</view>
				<view class="center-top-tiaowei2">账号名称</view>
				<view class="center-top-tiaowei3">账号类型</view>
			</view>
			<view class="center-main">
				<uniCollapse @change="changee" accordion="true">
					<uniCollapseItem v-for="(item, index) in userList" :key="index">
						<template v-slot:title>
							<view class="center-main-title">
								<view class="center-main-title1">{{ index + 1 }}</view>
								<view class="center-main-title2">{{ item.name }}</view>
								<view class="center-main-title3">{{ item.role }}</view>
							</view>
						</template>
						<template v-slot:content>
							<view class="center-main-content">
								<view class="center-main-content-title">
									<view class="center-main-content-text">
										邮箱
									</view>
									<view class="center-main-content-main">
										{{ item.email }}
									</view>
								</view>

								<view class="center-main-content-title">
									<view class="center-main-content-text">
										公司名称
									</view>
									<view class="center-main-content-main">
										{{ item.companyName }}
									</view>
								</view>

								<view class="center-main-content-title">
									<view class="center-main-content-text">
										创建日期
									</view>
									<view class="center-main-content-main">
										{{ item.created_at }}
									</view>
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
	</view>
</template>

<script>
	import uniCollapse from "../../components/uni-collapse/uni-collapse.vue"
    import uniCollapseItem from "../../components/uni-collapse-item/uni-collapse-item.vue"
	import NavBarrr from '../../components/NavBarrr.vue'
	export default {
		data() {
			return {
				isActive:true,
				isShow: true,
				isShower: true,
				userList: [],
				searchData: {
					value: "",
					companyType: "",
				},
				typeList: [{
						value: "0",
						name: "全部",
					},
					{
						value: "2",
						name: "管理员",
					},
					{
						value: "3",
						name: "客户",
					},
					{
						value: "4",
						name: "终端用户",
					},
				],
				params: {
					totalPage: "",
					total: "",
				},
				currentIndex:0
			};
		},
		components: {
			NavBarrr,
			uniCollapse,
			uniCollapseItem
		},
		onLoad() {
			uni.setStorageSync("currentPage", 1);
			uni.removeStorageSync("accountType");
			this.getYonghu();
		},
		methods: {
			searchEvent() {
				this.isShow = false;
				this.isShower = false;
			},
			// backEvent(){
			// 	this.isShow = true
			// 	this.isShower = true
			// }
			cancel() {
				this.isShow = true;
				this.isShower = true;
			},
			changee(){},
			change() {
				this.isActive = !this.isActive
			},
			searchType(item1,index1) {
				console.log(item1,index1)
				this.currentIndex = index1;
				console.log(item1.value);
				uni.setStorageSync("accountType", item1.value);
				this.getYonghu();
			},
			searchbar(data) {
				console.log(data);
				uni.setStorageSync("search", data);
				uni.showToast({
					title: "搜索ing",
				});
				this.getYonghu();
			},
			backPage() {
				currentPage:uni.getStorageSync("currentPage")
				if (this.params.currentPage > 1) {
					this.params.currentPage--
					uni.setStorageSync("currentPage", this.params.currentPage);
				}
				this.getYonghu();
			},
			nextPage() {
				currentPage:uni.getStorageSync("currentPage")
				if (this.params.currentPage < this.params.totalPage) {
					this.params.currentPage++
					uni.setStorageSync("currentPage", this.params.currentPage);
				}
				this.getYonghu();
			},
			back() {
				uni.redirectTo({
					url: "/pages/home/Home",
				});
			},
			async getYonghu() {
				console.log(this.$store.state.userInfo.token);
				const res = await this.$myRequest({
					url: "/v1/user/list",
					data: {
						token: this.$store.state.userInfo.token,
						accountType: uni.getStorageSync("accountType"),
						search: uni.getStorageSync("search"),
						currentPage: uni.getStorageSync("currentPage"),
					}
				});
				console.log(res);
				this.userList = res.data.data.info;
				this.params.totalPage = res.data.data.page.totalPage
				this.params.currentPage = res.data.data.page.currentPage
			},
		},
	};
</script>

<style scoped>
	.content {
		width: 750rpx;
		height: 750rpx;
	}
	.content-nav{
		margin-top: 80rpx;
	}
	.content-xiala {
		margin-top: 5rpx;
	}

	.content-xiala-title {
		width: 750rpx;
		height: 60rpx;
		text-align: center;
		margin: 0 auto;
		line-height: 60rpx;
		font-family: PingFangSC-regular;
	}	

	.content-xiala-leixing {
		border-top: 5rpx solid #dddddd;
		display: flex;
		height: 228rpx;
		flex-wrap: wrap;
		align-items: center;
		background-color: rgba(241, 241, 241, 100);
	}

	.content-xiala-main {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: 30rpx;
		font-family: Arial;
		width: 150rpx;
		height: 64rpx;
		line-height: 40rpx;
		border: 2rpx solid white;
		background-color: rgba(255, 255, 255, 100); 
		color: rgba(149, 149, 149, 100);
		border-radius: 2px;
		padding: 6rpx;
	}
	.active{
		background-color: rgba(0, 128, 193, 100);
		color: rgba(255, 255, 255, 100);
	}
	.center-top {
		display: flex;
		flex-direction: row;
		align-items: center;
		border-bottom: 1rpx solid #dddddd;
		height: 70rpx;
		font-size: 28rpx;
	}
	.center-top-tiaowei1{
		margin-left: 75rpx;
	}
	.center-top-tiaowei2{
		margin-left: 90rpx;
	}
	.center-top-tiaowei3{
		margin-left: 228rpx;
	}
	.center-main-title {
		display: flex;
		font-size: 30rpx;
		align-items: center;
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

	.center-main-content {
		font-size: 30rpx;
		display: flex;
		justify-content: flex-start;
		flex-direction: column;
	}
	.center-main-content-title {
		
		margin-left: 70rpx;
		display: flex;
		justify-content: flex-start;
		color: rgba(149, 149, 149, 100);
		font-size: 14px;
		text-align: left;
		font-family: PingFangSC-regular;
	}
	.center-main-content-text{
		width: 112rpx;
		height: 40rpx;
		color: rgba(149, 149, 149, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: PingFangSC-regular;
	}
	.center-main-content-main {
		margin-left: 40rpx;
		color: black;
	}
	.content-footer {
		margin-left: 43rpx;
		margin-top: 40rpx;
		display: flex;
		justify-content: space-around;
		position: absolute;
		top: 1350rpx;
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
</style>
