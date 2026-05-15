<template>
	<view class="container">
		<view class="profile-card">
			<view class="avatar">U</view>
			<text class="username">{{ userInfo.username || '未登录用户' }}</text>
			<text class="role">{{ userInfo.role || '普通用户' }}</text>
		</view>
		
		<view class="menu-list">
			<view class="menu-item" @click="handleLogin">
				<text>账户设置</text>
				<text class="arrow">></text>
			</view>
			<view class="menu-item">
				<text>我的发布</text>
				<text class="arrow">></text>
			</view>
			<view class="menu-item" @click="logout">
				<text class="logout-text">退出登录</text>
				<text class="arrow">></text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			userInfo: {
				username: uni.getStorageSync('username'),
				role: uni.getStorageSync('role')
			}
		};
	},
	methods: {
		handleLogin() {
			uni.navigateTo({ url: '/pages/auth/login' });
		},
		logout() {
			uni.removeStorageSync('token');
			uni.removeStorageSync('username');
			uni.removeStorageSync('role');
			this.userInfo = {};
			uni.showToast({ title: '已退出' });
		}
	}
};
</script>

<style scoped>
.container {
	padding: 40rpx 20rpx;
	background-color: #F5F7FA;
	min-height: 100vh;
}
.profile-card {
	background-color: white;
	border-radius: 24rpx;
	padding: 60rpx 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 40rpx;
	box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05);
}
.avatar {
	width: 120rpx;
	height: 120rpx;
	background-color: #409EFF;
	color: white;
	border-radius: 60rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 48rpx;
	font-weight: bold;
	margin-bottom: 20rpx;
}
.username {
	font-size: 36rpx;
	font-weight: bold;
	color: #303133;
}
.role {
	font-size: 24rpx;
	color: #909399;
	margin-top: 8rpx;
}
.menu-list {
	background-color: white;
	border-radius: 24rpx;
	overflow: hidden;
	box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05);
}
.menu-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 30rpx;
	border-bottom: 1px solid #F2F6FC;
	font-size: 28rpx;
	color: #606266;
}
.menu-item:last-child {
	border-bottom: none;
}
.arrow {
	color: #C0C4CC;
}
.logout-text {
	color: #F56C6C;
}
</style>
