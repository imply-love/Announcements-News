<template>
	<view class="container">
		<view class="header">
			<text class="title">校园墙</text>
			<button class="fab-btn" @click="showPostModal = true">+</button>
		</view>
		<scroll-view scroll-y class="post-list">
			<view v-for="post in posts" :key="post.id" class="post-card">
				<view class="post-header">
					<text class="username">{{ post.is_anonymous ? '匿名' : post.username }}</text>
					<text class="time">{{ post.created_at }}</text>
				</view>
				<view class="post-content">{{ post.content }}</view>
			</view>
		</scroll-view>
		
		<view v-if="showPostModal" class="modal-mask">
			<view class="modal-content">
				<text class="modal-title">发布动态</text>
				<textarea v-model="newPostContent" placeholder="分享你的校园生活..." class="post-input" />
				<view class="options">
					<label class="switch-label">
						<text>匿名发布</text>
						<switch :checked="isAnonymous" @change="isAnonymous = !isAnonymous" />
					</label>
				</view>
				<view class="btn-group">
					<button class="btn-cancel" @click="showPostModal = false">取消</button>
					<button class="btn-confirm" @click="submitPost">发布</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import api from '@/common/api/user.js';

export default {
	data() {
		return {
			posts: [],
			showPostModal: false,
			newPostContent: '',
			isAnonymous: false
		};
	},
	async onLoad() {
		await this.fetchPosts();
	},
	methods: {
		async fetchPosts() {
			try {
				console.log('当前token:', uni.getStorageSync('token'));
				const res = await api.getPosts('wall');
				this.posts = res;
			} catch (e) {
				uni.showToast({ title: '加载失败', icon: 'none' });
			}
		},
		async submitPost() {
			if (!this.newPostContent) return uni.showToast({ title: '内容不能为空', icon: 'none' });
			console.log('发帖时token:', uni.getStorageSync('token'));
			console.log('发帖数据:', { content: this.newPostContent, type: 'wall', is_anonymous: this.isAnonymous });
			try {
				await api.createPost({
					content: this.newPostContent,
					type: 'wall',
					is_anonymous: this.isAnonymous
				});
				this.newPostContent = '';
				this.showPostModal = false;
				await this.fetchPosts();
				uni.showToast({ title: '发布成功' });
			} catch (e) {
				uni.showToast({ title: '请先登录', icon: 'none' });
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
.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 30rpx;
}
.title {
	font-size: 40rpx;
	font-weight: bold;
	color: #303133;
}
.fab-btn {
	width: 80rpx;
	height: 80rpx;
	border-radius: 40rpx;
	background-color: #409EFF;
	color: white;
	font-size: 40rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	border: none;
	padding: 0;
}
.post-list {
	height: calc(100vh - 200rpx);
}
.post-card {
	background-color: #FFFFFF;
	border-radius: 16rpx;
	padding: 30rpx;
	margin-bottom: 24rpx;
}
.post-header {
	display: flex;
	justify-content: space-between;
	margin-bottom: 16rpx;
}
.username {
	font-weight: bold;
	font-size: 28rpx;
}
.time {
	font-size: 24rpx;
	color: #909399;
}
.post-content {
	font-size: 28rpx;
	color: #606266;
}
.modal-mask {
	position: fixed;
	top: 0; left: 0; right: 0; bottom: 0;
	background-color: rgba(0,0,0,0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 999;
}
.modal-content {
	background-color: white;
	width: 80%;
	border-radius: 24rpx;
	padding: 40rpx;
}
.modal-title {
	font-size: 36rpx;
	font-weight: bold;
	display: block;
	margin-bottom: 30rpx;
	text-align: center;
}
.post-input {
	width: 100%;
	height: 300rpx;
	border: 1px solid #DCDFE6;
	border-radius: 12rpx;
	padding: 20rpx;
	box-sizing: border-box;
	margin-bottom: 30rpx;
}
.options {
	margin-bottom: 40rpx;
}
.switch-label {
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 28rpx;
}
.btn-group {
	display: flex;
	gap: 20rpx;
}
.btn-group button {
	flex: 1;
	padding: 20rpx;
	border-radius: 12rpx;
	font-size: 28rpx;
}
.btn-cancel {
	background-color: #DCDFE6;
}
.btn-confirm {
	background-color: #409EFF;
	color: white;
}
</style>
