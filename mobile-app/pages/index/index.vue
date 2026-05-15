<template>
	<view class="container">
		<scroll-view scroll-y class="post-list">
			<view v-for="post in posts" :key="post.id" class="post-card">
				<view class="post-header">
					<text class="username">{{ post.is_anonymous ? '匿名用户' : post.username }}</text>
					<text class="time">{{ post.created_at }}</text>
				</view>
				<view class="post-content">{{ post.content }}</view>
				<view class="post-footer">
					<text class="comment-count">💬 {{ post.comments_count || 0 }}</text>
				</view>
			</view>
			<view v-if="posts.length === 0" class="empty-state">暂无公告内容</view>
		</scroll-view>
	</view>
</template>

<script>
import api from '@/common/api/user.js';

export default {
	data() {
		return {
			posts: []
		};
	},
	async onLoad() {
		await this.fetchPosts();
	},
	methods: {
		async fetchPosts() {
			try {
				const res = await api.getPosts('announcement');
				this.posts = res;
			} catch (e) {
				uni.showToast({ title: '加载失败', icon: 'none' });
			}
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
.post-list {
	height: calc(100vh - 100rpx);
}
.post-card {
	background-color: #FFFFFF;
	border-radius: 16rpx;
	padding: 30rpx;
	margin-bottom: 24rpx;
	box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}
.post-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20rpx;
}
.username {
	font-weight: bold;
	font-size: 32rpx;
	color: #303133;
}
.time {
	font-size: 24rpx;
	color: #909399;
}
.post-content {
	font-size: 28rpx;
	color: #606266;
	line-height: 1.6;
	margin-bottom: 20rpx;
}
.post-footer {
	display: flex;
	justify-content: flex-end;
}
.comment-count {
	font-size: 24rpx;
	color: #909399;
}
.empty-state {
	text-align: center;
	color: #C0C4CC;
	margin-top: 100rpx;
}
</style>
