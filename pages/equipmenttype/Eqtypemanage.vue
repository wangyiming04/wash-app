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
					<view>设备类型管理</view>
				</template>
			</nav-bar>
		</view>
		<view class="content-center">
			<!-- 选择栏 -->
			<view class="allSelect">
				<!-- 选择1 -->
				<view class="select" @click="toShowa">设备种类
					<image src="../../static/img/down.png" v-show="imgDowna"></image>
					<image src="../../static/img/up.png" v-show="!imgDowna"></image>
				</view>
				<!-- 选择2 -->
				<view class="select" @click="toShowb">设备名称
					<image src="../../static/img/down.png" v-show="imgDownb"></image>
					<image src="../../static/img/up.png" v-show="!imgDownb"></image>
				</view>
				<!-- 选择3 -->
				<view class="select" @click="toShowc">设备型号
					<image src="../../static/img/down.png" v-show="imgDownc"></image>
					<image src="../../static/img/up.png" v-show="!imgDownc"></image>
				</view>
			</view>
			<!-- 内容栏 -->
			<view class="allShow">
				<!-- 内容一 -->
				<view class="show" v-show="isShowa">
					<template>
						<view class="content-xiala-leixing">
							<view class="content-xiala-main" @click="allType" :class="isActivee ? 'content-xiala-main' : 'active'">
								全部
							</view>
							<view class="content-xiala-main" v-for="(item1,index1) in eqListType" :key="index1"
								@click="changeType(item1,index1)" :class="{active: index1 === currentIndex}"> {{item1.name}}
							</view>
						</view>
					</template>
				</view>
				<!-- 内容二 -->
				<view class="show" v-show="isShowb">
					<template>
						<view class="content-xiala-leixing">
							<view class="content-xiala-main" v-for="(item2,index2) in eqListName" :key="index2"
								@click="changeName(item2,index2)" :class="{active: index2 === currentIndex}"> {{item2.name}}</view>
						</view>
					</template>
				</view>
				<!-- 内容三-->
				<view class="show" v-show="isShowc">
					<template>
						<view class="content-xiala-leixing">
							<view class="content-xiala-main" v-for="(item3,index3) in eqListModel" :key="index3"
								@click="changeModel(item3,index3)" :class="{active: index3 === currentIndex}"> {{item3.name}}</view>
						</view>
					</template>
				</view>
			</view>
		</view>
		<view class="center-top">
			<view class="">设备种类</view>
			<view class="">设备名称</view>
			<view class="">设备型号</view>
		</view>
		<view class="center-block">
			<view style="display:flex;flex-direction: column;width: 100%;" class="center">
				<view style="display:flex;width: 100%;" v-for="(item,index) in typeList" :key="index">
					<view
						style="border:1px solid #000;width: 30%;border-left:none; box-shadow: 1px 1px 0px 0px rgba(187, 187, 187, 100)">
						{{item.name}}
					</view>
					<view style="width: 70%;">
						<view style="display:flex" v-for="(item2,index2) in item.second" :key="index2">
							<view style="border:1px solid #000;width: 50%;">{{item2.name}}</view>
							<view style="width: 50%;display:flex;flex-direction:column;">
								<view style="display:flex;flex-direction:column;height: 100%;"
									v-for="(item3,index3) in item2.third" :key="index3">
									<view style="border:1px solid #000;height: 100%;border-right: none;">{{item3.name}}
									</view>
								</view>
							</view>

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
				isActivee :false,
				currentIndex :-1,
				typeList: [],
				isShowa: false,
				isShowb: false,
				isShowc: false,
				imgDowna: true,
				imgDownb: true,
				imgDownc: true,
				eqListType: [],
				eqListName: [],
				eqListModel: []
			}
		},
		components: {
			NavBar
		},
		onLoad() {
			uni.removeStorageSync('id_1');
			uni.removeStorageSync('id_2');
			uni.removeStorageSync('id_3');
			this.gettyqe()
			this.getEqType()
			this.getEqName()
			this.getEqModel()
		},
		methods: {
			async gettyqe() {
				const res = await this.$myRequest({
					url: '/v1/device-type/show',
					data: {
						token: this.$store.state.userInfo.token,
						id_1: uni.getStorageSync('id_1'),
						id_2: uni.getStorageSync('id_2'),
						id_3: uni.getStorageSync('id_3'),
					}
				})
				console.log(res)
				this.typeList = res.data.data.info
				console.log(this.typeList)
			},
			async getEqType() {
				const res = await this.$myRequest({
					url: '/v1/device-type/list',
					data: {
						token: this.$store.state.userInfo.token,
						type: "1"
					},
				})
				console.log(res)
				this.eqListType = res.data.data
			},
			async getEqName() {
				const res = await this.$myRequest({
					url: '/v1/device-type/list',
					data: {
						token: this.$store.state.userInfo.token,
						type: "2"
					},
				})
				console.log(res)
				this.eqListName = res.data.data
			},
			async getEqModel() {
				const res = await this.$myRequest({
					url: '/v1/device-type/list',
					data: {
						token: this.$store.state.userInfo.token,
						type: "3"
					},
				})
				console.log(res)
				this.eqListModel = res.data.data
			},
			allType(){
				this.currentIndex = -1
				this.isActivee = false
				uni.removeStorageSync('id_1');
				uni.removeStorageSync('id_2');
				uni.removeStorageSync('id_3');
				this.gettyqe()
				//uni.setStorageSync("id_1", null)
			},
			changeType(item1,index1) {
				this.isActivee = true
				this.currentIndex = index1
				console.log(item1)
				uni.removeStorageSync('id_2');
				uni.removeStorageSync('id_3');
				uni.setStorageSync("id_1", item1.id)
				this.gettyqe()
			},
			changeName(item2,index2) {
				this.currentIndex = index2
				console.log(item2)
				uni.removeStorageSync('id_1');
				uni.removeStorageSync('id_3');
				uni.setStorageSync("id_2", item2.id)
				this.gettyqe()
			},
			changeModel(item3,index3) {
				this.currentIndex = index3
				console.log(item3)
				uni.removeStorageSync('id_1');
				uni.removeStorageSync('id_2');
				uni.setStorageSync("id_3", item3.id)
				this.gettyqe()
			},
			back() {
				uni.navigateBack({
					url: "/pages/home/Home",
				})
			},
			toShowa(){
				this.isShowa = !this.isShowa
				this.isShowb = false
				this.isShowc = false
				this.imgDowna = !this.imgDowna
				this.imgDownb = true
				this.imgDownc = true
			},
			toShowb(){
				this.isShowb = !this.isShowb
				this.isShowa = false
				this.isShowc = false
				this.imgDownb = !this.imgDownb
				this.imgDownc = true
				this.imgDowna = true
			},
			toShowc(){
				this.isShowc = !this.isShowc
				this.isShowb = false
				this.isShowa = false
				this.imgDownc = !this.imgDownc
				this.imgDownb = true
				this.imgDowna = true
			},
		},

	}
</script>

<style scoped>
	.container {
		height: 100rpx;
	}
	.container-top{
		margin-top: 100rpx;
	}
	.container-top image {
		width: 65rpx;
		height: 65rpx;
		margin-top: 18rpx;
	}

	.allSelect {
		display: flex;
		justify-content: center;
		border-bottom: 5rpx solid #dddddd;
	}

	.select image {
		width: 26rpx;
		height: 26rpx;
		background-color: rgba(255, 255, 255, 100);
	}

	.select {
		width: 750rpx;
		height: 60rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		color: rgba(16, 16, 16, 100);
		font-family: PingFangSC-regular;
		margin-left: 55rpx;
	}

	.show {
		height: 200rpx;
		background-color: rgb(130, 130, 130);
	}

	.center {
		margin-top: 10rpx;
		width: 125px;
		height: 200rpx;
		line-height: 40rpx;
		background-color: rgba(255, 255, 255, 100);
		color: rgba(16, 16, 16, 100);
		font-size: 14px;
		text-align: center;
		font-family: Arial;
		align-items: center;
		justify-content: center;
	}

	.center-top {
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 69rpx;
		font-size: 28rpx;
	}

	.center-block {
		text-align: center;
		align-items: center;
		justify-content: center;
	}
	.content-xiala-leixing {
		display: flex;
		height: 215rpx;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		background-color: rgba(241, 241, 241, 100);
	}
	.content-xiala-main {
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: Arial;
		text-align: center;
		height: 64rpx;
		line-height: 40rpx;
		margin:10rpx;
		border: 2rpx solid white;
		background-color: rgba(255, 255, 255, 100);
		color: rgba(149, 149, 149, 100);
		border-radius: 2px;
		padding: 6rpx;
	}
	.active{
		background-color: rgba(0, 128, 193, 100);
		color: rgba(255, 255, 255, 100);
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: Arial;
		text-align: center;
		height: 64rpx;
		line-height: 40rpx;
		margin:10rpx;
		border: 2rpx solid white;
		border-radius: 2px;
		padding: 6rpx;
	}
</style>
