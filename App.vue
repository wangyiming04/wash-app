
<script>
	import {
			mapMutations
		} from 'vuex'
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
					...mapMutations(['login'])
				},
				
				onLaunch: function() {
					const userInfo = uni.getStorageSync('userInfo');    //同步获取本地数据
					//判断本地缓存是否存在数据
					if (userInfo !=="") {
						//传到vuex里面储存起来,并改变登录状态
						this.login(userInfo)
					}					
				},
	}
</script>
<style lang="scss">
@import '@/common/common.scss';
</style>

