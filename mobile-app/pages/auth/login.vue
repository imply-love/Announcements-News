<template>
	<view class="container">
		<view class="auth-box">
			<text class="title">欢迎回来</text>
			<text class="subtitle">登录以参与校园讨论</text>
			
			<view class="form">
				<input class="input" v-model="form.username" placeholder="用户名" />
				<input class="input" v-model="form.password" password placeholder="密码" />
				<button class="login-btn" @click="doLogin">登 录</button>
			</view>
		</view>
	</view>
</template>

<script>
import api from '@/common/api/user.js';

export default {
	data() {
		return {
			form: {
				username: '',
				password: ''
			}
		};
	},
	methods: {
		async doLogin() {
			if (!this.form.username || !this.form.password) {
				return uni.showToast({ title: '请填写完整', icon: 'none' });
			}
			try {
				const res = await api.login(this.form);
				uni.setStorageSync('token', res.access_token);
				uni.setStorageSync('username', res.username);
				uni.setStorageSync('role', res.role);
				uni.showToast({ title: '登录成功' });
				setTimeout(() => uni.reLaunch({ url: '/pages/index/index' }), 1500);
			} catch (e) {
				uni.showToast({ title: '账号或密码错误', icon: 'none' });
			}
		}
	}
};
</script>

<style scoped>
.container {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
	background-color: #FFFFFF;
}
.auth-box {
	width: 80%;
	text-align: center;
}
.title {
	font-size: 48rpx;
	font-weight: bold;
	color: #303133;
	display: block;
}
.subtitle {
	font-size: 28rpx;
	color: #909399;
	display: block;
	margin-bottom: 60rpx;
}
.form {
	display: flex;
	flex-direction: column;
	gap: 30rpx;
}
.input {
	height: 100rpx;
	background-color: #F5F7FA;
	border-radius: 16rpx;
	padding: 0 30rpx;
	font-size: 28rpx;
	box-sizing: border-box;
}
.login-btn {
	height: 100rpx;
	background-color: #409EFF;
	color: white;
	border-radius: 16rpx;
	font-size: 32rpx;
	font-weight: bold;
	margin-top: 40rpx;
	border: none;
}
</style>
