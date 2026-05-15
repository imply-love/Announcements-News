const BASE_URL = 'http://localhost:8000';

const request = (options) => {
	const token = uni.getStorageSync('token');
	console.log('请求URL:', BASE_URL + options.url);
	console.log('请求方法:', options.method);
	console.log('请求头token:', token ? token.substring(0, 20) + '...' : '空');
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			header: {
				'Authorization': `Bearer ${token || ''}`,
				...options.header
			},
			success: (res) => {
				if (res.statusCode >= 200 && res.statusCode < 300) {
					resolve(res.data);
				} else {
					reject(res);
				}
			},
			fail: (err) => {
				reject(err);
			}
		});
	});
};

export default {
	get: (url, data) => request({ url, method: 'GET', data }),
	post: (url, data) => request({ url, method: 'POST', data }),
	put: (url, data) => request({ url, method: 'PUT', data }),
	delete: (url, data) => request({ url, method: 'DELETE', data }),
};
