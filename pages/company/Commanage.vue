<template>
	<view>
		<view class="content-nav">
			<nav-barrr @confirm = "chooseEvent">
				<template #title>
					<view>公司管理</view>
				</template>
			</nav-barrr>
		</view>
		<!-- 最外部 -->
		<view class="content-center">
			<!-- 选择栏 -->
			<view class="allSelect">
				<!-- 选择1 -->
				<view class="select" @click="toShowa">国家/城市
					<image src="../../static/img/down.png" v-show="imgDowna" class="select"></image>
					<image src="../../static/img/up.png" v-show="!imgDowna" class="select"></image>
				</view>
				<!-- 选择2 -->
				<view class="select" @click="toShowb">公司类型
					<image src="../../static/img/down.png" v-show="imgDownb" class="select"></image>
					<image src="../../static/img/up.png" v-show="!imgDownb" class="select"></image>
				</view>
			</view>
			<!-- 内容栏 -->
			<view class="allShow">
				<!-- 内容一 -->
				<view class="show" v-show="isShowa">
					<template>
						<view class="content-xiala-leixing">
							<view class="content-xiala-main" v-for="(item,index) in All" :key="index" @click="getAll(item,index)"
							:class="{active: index === currentIndex}">{{item}}</view>
						</view>
						<view class="content-xiala-title">
							<view class="text">
								国家
							</view>
						</view>
						<view class="content-xiala-leixing">
							<view class="content-xiala-main" v-for="(item1,index1) in countryList" :key="index1"
								@click="changeCountry(item1,index1)" :class="{active: index1 === currentIndex1}"> {{item1.name}}</view>
						</view>
						<view class="content-xiala-title">
							<view class="text">
								城市
							</view>
						</view>
						<view class="content-xiala-leixing">
							<view class="content-xiala-main" v-for="(item3,index3) in cityList" :key="index3"
								@click="changeCity(item3,index3)":class="{active: index3 === currentIndex}"> {{item3.name}}</view>
						</view>
					</template>
				</view>
				<!-- 内容二 -->
				<view class="show" v-show="isShowb">
					<template>
						<view class="content-xiala-leixing">
							<view class="content-xiala-main1" v-for="(item2,index2) in typeList" :key="index2" 
								@click="searchType(item2,index2)" :class="{active: index2 === currentIndex}">
								{{item2.name}}</view>
						</view>
					</template>
				</view>
			</view>
		</view>
		<view class="center">
			<view class="center-top">
				<view class="center-top-tiaowei1">序号</view>
				<view class="center-top-tiaowei2">公司名称</view>
				<view class="center-top-tiaowei3">公司类型</view>
				<view class="center-top-right">国家/城市</view>
			</view>
		</view>
		<view class="center-main">
			<uniCollapse accordion="true" @change="change">
				<uniCollapseItem v-for="(item,index) in companyList" :key="index">
					<template v-slot:title>
						<view class="center-main-title">
							<view class="center-main-title1">{{index+1}}</view>
							<view class="center-main-title2">{{item.companyName}}</view>
							<view class="center-main-title3">{{item.companyType}}</view>
							<view class="center-main-title4">{{item.place}}</view>
						</view>
					</template>
					<template v-slot:content>
						<view class="center-main-content">
							<view class="center-main-content-title">
								<view class="center-main-content-text">
									公司地址
								</view>
								<view class="center-main-content-main">
									{{item.companyAddr}}
								</view>
							</view>

							<view class="center-main-content-title">
								<view class="center-main-content-text">
									公司邮箱
								</view>
								<view class="center-main-content-main">
									{{item.companyEmail}}
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
		components: {
			NavBarrr,
			uniCollapse,
			uniCollapseItem
		},
		data() {
			return {
				isActive:true,
				isShow: true,
				isShower: true,
				companyList: [],
				countryList: [],
				cityList: [],
				isShowa: false,
				isShowb: false,
				imgDowna: true,
				imgDownb: true,
				currentIndex :0,
				currentIndex1 : 0,
				All:["全部"],
				typeList: [{
						value: "0",
						name: "全部"
					},
					{
						value: "-1",
						name: "管理员"
					},
					{
						value: "1",
						name: "客户"
					},
					{
						value: "2",
						name: "终端"
					},
				],
				params: {
					totalPage:"",
					total:"",
				},
			}
		},
		onLoad() {
			uni.setStorageSync("currentPage", 1);
			uni.removeStorageSync('search');
			uni.removeStorageSync('companyType');
			uni.removeStorageSync('country');
			uni.removeStorageSync('city');
			this.getCompany()
			this.getCountry()
		},

		methods: {
			getAll(e) {
				console.log(e)
				uni.removeStorageSync('country');
				uni.removeStorageSync('city');
				this.getCompany()
			},
			changeCountry(item1,index1) {
				this.currentIndex1 = index1
				console.log(item1.id)
				uni.setStorageSync("country", item1.id)
				this.getCompany()
			},
			changeCity(item3,index3) {
				this.currentIndex = index3
				console.log(item3.id)
				uni.setStorageSync("city", item3.id)
				this.getCompany()
			},
			searchType(item2,index2) {
				this.currentIndex = index2
				console.log(item2.value)
				uni.setStorageSync("companyType", item2.value)
				this.getCompany()
			},
			backPage() {
				currentPage:uni.getStorageSync("currentPage")
				if(this.params.currentPage>1){
					this.params.currentPage--
					uni.setStorageSync("currentPage", this.params.currentPage);
				}
				this.getCompany();
			},
			nextPage() {
				currentPage:uni.getStorageSync("currentPage")
				if(this.params.currentPage<this.params.totalPage){
					this.params.currentPage++
					uni.setStorageSync("currentPage", this.params.currentPage);
				}
				this.getCompany();
			},
			chooseEvent(data){
				console.log(data)
				uni.setStorageSync("search",data)
				this.getCompany()
			},
			back() {
				uni.navigateBack({
					url: "/pages/home/Home",
				})
			},
			toShowa() {
				this.isActive = !this.isActive
				this.isShowa = !this.isShowa
				this.isShowb = false
				this.imgDowna = !this.imgDowna
			},
			toShowb() {
				this.isActive = !this.isActive
				this.isShowb = !this.isShowb
				this.isShowa = false
				this.imgDownb = !this.imgDownb
			},
			change() {
				// console.log("12")
				// this.isActive = !this.isActive
			},
			async getCompany() {
				const res = await this.$myRequest({
					url: '/v1/company/list',
					data: {
						token: this.$store.state.userInfo.token,
						companyType: uni.getStorageSync('companyType'),
						country: uni.getStorageSync('country'),
						city: uni.getStorageSync('city'),
						search: uni.getStorageSync('search'),
						currentPage:  uni.getStorageSync('currentPage'),
					}
				})
				console.log(res)
				this.companyList = res.data.data.info
				this.params.totalPage=res.data.data.page.totalPage
				this.params.currentPage=res.data.data.page.currentPage
			},
			async getCountry() {
				const res = await this.$myRequest({
					url: '/v1/region/screen',
					data: {
						token: this.$store.state.userInfo.token,
						id: uni.getStorageSync('id'),
					}
				})
				console.log(res)
				this.countryList = res.data.data.country
				this.cityList = res.data.data.city
			},

		}
	}
</script>

<style scoped>
	.allSelect {
		display: flex;
		justify-items: center;
		text-align: center;
		border-bottom: 5rpx solid #dddddd;
	}
	.content-nav{
		margin-top: 80rpx;
	}
	.select {
		width: 750rpx;
		height: 60rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		color: rgba(16, 16, 16, 100);
		font-family: PingFangSC-regular;
	}

	.select image {
		width: 26rpx;
		height: 26rpx;
		background-color: rgba(255, 255, 255, 100);
	}

	.content-xiala-title {
		width: 100%;
		height: 34rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: PingFangSC-regular;
		background-color: rgba(241, 241, 241, 100);
	}

	.text {
		margin: 0 0 10rpx 40rpx;
	}

	.center-top {
		display: flex;
		flex-direction: row;
		align-items: center;
		border-bottom: 5rpx solid #dddddd;
		height: 70rpx;
		font-size: 28rpx;
	}
	.center-top-tiaowei1{
		margin-left: 30rpx;
	}
	.center-top-tiaowei2{
		margin-left: 30rpx;
	}
	.center-top-tiaowei3{
		margin-left: 150rpx;
	}
	.center-top-right {
		margin-left: 40rpx;
	}

	.center-main {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.center-main-title {
		display: flex;
		text-align: left;
		align-items: center;
		height: 70rpx;
		font-size: 28rpx;
	}

	.center-main-title1 {
		margin-left: 20rpx;
		width: 50rpx;
	}

	.center-main-title2 {
		width: 270rpx;
		margin-left: 20rpx;
	}

	.center-main-title3 {
		width: 130rpx;
	}
	.center-main-title4{
		margin-left: 18rpx;
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
		margin-left: 30rpx;
	}
	.center-main-content-text{
		width: 130rpx;
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

	.show-title-a {
		width: 75px;
		height: 32px;
		line-height: 20px;
		border-radius: 2px;
		background-color: rgba(255, 255, 255, 100);
		color: rgba(149, 149, 149, 100);
		font-size: 14px;
		text-align: center;
		font-family: Arial;
		margin: 10rpx;
		align-items: center;
		justify-content: center;
		display: flex;
		padding: 6rpx;
	}

	.show-block {
		display: flex;
		/* justify-content: space-between; */
		flex-direction: row;

	}

	.content-xiala-leixing {
		display: flex;
		height: 120rpx;
		flex-wrap: nowrap;
		background-color: rgba(241, 241, 241, 100);
	}

	.content-xiala-main {
		margin: 30rpx 0 20rpx 40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
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
	.content-xiala-main1{
		margin: 25rpx;
		display: flex;
		align-items: center;
		justify-content: center;
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
	}
</style>
