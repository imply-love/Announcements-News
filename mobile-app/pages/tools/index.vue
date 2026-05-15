<template>
	<view class="container">
		<view class="header">
			<text class="title">工具箱</text>
		</view>
		<scroll-view scroll-y class="tool-list">
			<view v-for="tool in tools" :key="tool.id" class="tool-card">
				<view class="tool-info">
					<text class="tool-name">{{ tool.name }}</text>
					<text class="tool-desc">{{ tool.description }}</text>
				</view>
				<button class="download-btn" @click="downloadTool(tool.download_url)">下载</button>
			</view>
			<view v-if="tools.length === 0" class="empty-state">暂无可用工具</view>
		</scroll-view>
	</view>
</template>

<script>
import api from '@/common/api/user.js';

export default {
	data() {
		return {
			tools: []
		};
	},
	async onLoad() {
		await this.fetchTools();
	},
	methods: {
		async fetchTools() {
			try {
				const res = await api.getTools();
				this.tools = res;
			} catch (e) {
				uni.showToast({ title: '加载失败', icon: 'none' });
			}
		},
		downloadTool(url) {
			uni.setClipboardData({
				data: url,
				success: () => uni.showToast({ title: '链接已复制' })
			});
		}
	}
};
</script>

<style scoped>
.container {
	padding: 20rpx;
	background-color: #F5F7FA;
	min-height: 100vh;
}
.header {
	margin-bottom: 30rpx;
}
.title {
	font-size: 40rpx;
	font-weight: bold;
	color: #303133;
}
.tool-list {
	height: calc(100vh - 150rpx);
}
.tool-card {
	background-color: #FFFFFF;
	border-radius: 16rpx;
	padding: 30rpx;
	margin-bottom: 20rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.03);
}
.tool-info {
	flex: 1;
	margin-right: 20rpx;
}
.tool-name {
	display: block;
	font-weight: bold;
	font-size: 30rpx;
	color: #303133;
	margin-bottom: 8rpx;
}
.tool-desc {
	font-size: 24rpx;
	color: #909399;
}
.download-btn {
	background-color: #ECF5FF;
	color: #409EFF;
	font-size: 24rpx;
	border: none;
	padding: 0 30rpx;
	height: 60rpx;
	line-height: 60rpx;
	border-radius: 30rpx;
}
.empty-state {
	text-align: center;
	color: #C0C4CC;
	margin-top: 100rpx;
}
</style>
