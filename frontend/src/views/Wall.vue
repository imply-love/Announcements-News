<template>
  <div class="page">
    <div class="header">
      <h1>校园墙</h1>
      <el-button v-if="userStore.isLoggedIn" type="primary" @click="showPostDialog = true">发布动态</el-button>
    </div>

    <div class="post-list">
      <el-card v-for="post in posts" :key="post.id" class="post-card">
        <div class="post-header">
          <span class="author">{{ post.is_anonymous ? '匿名用户' : '用户' }}</span>
          <el-button v-if="userStore.isAdmin || post.user_id === userStore.user?.id" type="danger" size="small" @click="deletePost(post.id)">删除</el-button>
        </div>
        <div class="post-content">{{ post.content }}</div>
        
        <div class="comment-section">
          <el-alert v-if="!userStore.isLoggedIn" title="请登录后查看和回复评论" type="info" show-icon :closable="false" />
          <div v-else>
            <div v-for="comment in post.comments" :key="comment.id" class="comment-item">
              <span class="comment-user">{{ comment.is_anonymous ? '匿名用户' : '用户' }}:</span>
              <span class="comment-text">{{ comment.content }}</span>
            </div>
            <div class="reply-box">
              <el-switch v-model="isAnonComment" active-text="匿名" style="margin-right: 10px"></el-switch>
              <el-input v-model="newComment" placeholder="分享你的想法..." @keyup.enter="submitComment(post.id)"></el-input>
              <el-button size="small" type="primary" @click="submitComment(post.id)">回复</el-button>
            </div>
          </div>
        </div>
      </el-card>
    </div>

    <el-dialog v-model="showPostDialog" title="发布到校园墙" width="50%">
      <el-alert title="提醒：请遵守校园管理规定，不可发布违规内容！" type="warning" show-icon :closable="false" style="margin-bottom: 15px"></el-alert>
      <div style="margin-bottom: 15px">
        <el-switch v-model="isAnonPost" active-text="匿名发布"></el-switch>
      </div>
      <el-input v-model="postContent" type="textarea" rows="4" placeholder="这里可以畅所欲言..."></el-input>
      <template #footer>
        <el-button @click="showPostDialog = false">取消</el-button>
        <el-button type="primary" @click="submitPost">发布</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/store/user';
import api from '@/api';
import { ElMessage } from 'element-plus';

const userStore = useUserStore();
const posts = ref([]);
const showPostDialog = ref(false);
const postContent = ref('');
const isAnonPost = ref(false);
const isAnonComment = ref(false);
const newComment = ref('');

const fetchPosts = async () => {
  try {
    const res = await api.get('/posts?type=wall');
    posts.value = res.data.map(post => ({
      ...post,
      comments: []
    }));
  } catch (e) {
    ElMessage.error('加载校园墙失败');
  }
};

const submitPost = async () => {
  if (!postContent.value) return;
  try {
    await api.post('/posts', { content: postContent.value, type: 'wall', is_anonymous: isAnonPost.value });
    ElMessage.success('发布成功');
    showPostDialog.value = false;
    postContent.value = '';
    fetchPosts();
  } catch (e) {
    ElMessage.error('发布失败');
  }
};

const submitComment = async (postId) => {
  if (!newComment.value) return;
  try {
    await api.post('/comments', { content: newComment.value, post_id: postId, is_anonymous: isAnonComment.value });
    ElMessage.success('回复成功');
    newComment.value = '';
    fetchPosts();
  } catch (e) {
    ElMessage.error('回复失败');
  }
};

const deletePost = async (id) => {
  try {
    await api.delete(`/posts/${id}`);
    ElMessage.success('删除成功');
    fetchPosts();
  } catch (e) {
    ElMessage.error('删除失败');
  }
};

onMounted(fetchPosts);
</script>

<style scoped>
.page { padding: 20px; }
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.post-card { margin-bottom: 20px; }
.post-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
.author { font-weight: bold; color: #666; }
.post-content { font-size: 1.1rem; margin-bottom: 15px; line-height: 1.5; }
.comment-section { margin-top: 15px; padding-top: 10px; border-top: 1px solid #eee; }
.comment-item { margin-bottom: 8px; font-size: 0.9rem; }
.comment-user { font-weight: bold; margin-right: 5px; }
.reply-box { display: flex; align-items: center; gap: 10px; margin-top: 10px; }
</style>
