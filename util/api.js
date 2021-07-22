const BASE_URL = 'https://hydro.jihepingfang.com'
import store from '../store/index.js' //vuex

// const userInfo = uni.getStorageSync('token');   
// const token = userInfo.token

export const myRequest = (options) => {
	// console.log({url: BASE_URL + options.url,
	// 		method: options.method,
	// 		data:{
	// 			token: uni.getStorageSync('token')
	// 		}})	
		
	return new Promise((resolve, reject) => {
		var data = options.data ? options.data  : {};
		//var method = options.method ? options.method : "Post";	
		uni.request({
			url: BASE_URL + options.url,
			method : "Post",
			data: data,
			// data:{
			// 	token: uni.getStorageSync('token'),
			// },
			success: (res) => {
				if (res == '') {
					return uni.showToast({
						icon: 'loading',
						title: '获取数据失败'
					})
				}
				resolve(res)
			},
			fail: (err) => {
				return uni.showToast({
					icon: 'loading',
					title: '请求失败'
				})
				reject(err)
			}
		})
	})
}
			// //post请求
			// myRequest(url, params) {
			// 	return new Promise((resolve, reject) => {
			// 		uni.request({
			// 			header: {
			// 				'Content-Type': 'application/x-www-form-urlencoded'
			// 			},
			// 			url:BASE_URL + options.url,
			// 			method: 'POST',
			// 			data: params,
			// 			success: (res) => {
			// 				// if (res == '') {
			// 				// 	return uni.showToast({
			// 				// 		icon: 'loading',
			// 				// 		title: '获取数据失败'
			// 				// 	})
			// 				// }
			// 				resolve(res)
			// 			},
			// 			fail: (err) => {
			// 				// return uni.showToast({
			// 				// 	icon: 'loading',
			// 				// 	title: '请求失败'
			// 				// })
			// 				reject(err)
			// 			}
			// 		});
			// 	})
			// },
		
		// var url = BASE_URL + options.url;
		// var method = options.method ? options.method : "Post";
		
		// var data = options.data ? options.data  : {};
		// data.token = data.token ? data.token    : uni.getStorageSync('token');
		// data.sn = data.sn 		? data.sn       : uni.getStorageSync('sn');

// myRequest({
// 	api:'/v1/user/login'
//  method:"post"
// })
