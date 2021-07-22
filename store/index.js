import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userInfo: {},
		currentPage:'',
		code:'',
	},
	mutations: {
		// 登录
		login(state, user) {
			//登录状态为已登录
			state.hasLogin = true
			state.userInfo = user
			console.log(state.hasLogin, state.userInfo)
			//储存用户数据到本地
			uni.setStorage({
				key: 'userInfo',
				data: user,
			});
			console.log('登陆成功')
			
		},

		// 退出登录
		logout(state, user) {
			//登录状态为未登录
			state.hasLogin = false
			state.userInfo = {}
			//删除本地储存
			uni.removeSavedFile({
				key: 'userInfo',
			})
			console.log('退出登录')
			console.log(state.hasLogin, state.userInfo)
		}
	},
	actions: {}


})
export default store
