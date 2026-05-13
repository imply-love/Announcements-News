<template>
  <div class="page">
    <div class="header">
      <h1>公告栏</h1>
      <el-button v-if="userStore.isAdmin" type="primary" @click="showPostDialog = true">发布通知</el-button>
    </div>

    <div class="post-list">
      <el-card v-for="post in posts" :key="post.id" class="post-card">
        <div class="post-header">
          <span class="content">{{ post.is_pinned ? '📌 ' : '' }}{{ post.content }}</span>
          <el-button v-if="userStore.isAdmin || post.user_id === userStore.user?.id" type="danger" size="small" @click="deletePost(post.id)">删除</el-button>
        </div>
        
        <div class="comment-section">
          <el-alert v-if="!userStore.isLoggedIn" title="请登录后查看和回复评论" type="info" show-icon :closable="false" />
          <div v-else>
            <div v-for="comment in post.comments" :key="comment.id" class="comment-item">
              <span class="comment-user">{{ comment.is_anonymous ? '匿名用户' : '用户' }}:</span>
              <span class="comment-text">{{ comment.content }}</span>
            </div>
            <div class="reply-box">
              <el-input v-model="newComment" placeholder="写回复..." @keyup.enter="submitComment(post.id)"></el-input>
              <el-button size="small" type="primary" @click="submitComment(post.id)">回复</el-button>
            </div>
          </div>
        </div>
      </el-card>
    </div>

    <el-dialog v-model="showPostDialog" title="发布公告" width="50%">
      <el-input v-model="postContent" type="textarea" rows="4" placeholder="请输入通知内容..."></el-input>
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
const newComment = ref('');

const fetchPosts = async () => {
  try {
    const res = await api.get('/posts?type=announcement');
    // 后端返回的数据包含 comments 关系，需要手动处理
    posts.value = res.data.map(post => ({
      ...post,
      comments: []  // 暂时不加载评论，或后续添加评论 API
    }));
  } catch (e) {
    ElMessage.error('加载公告失败');
  }
};

const submitPost = async () => {
  if (!postContent.value) return;
  try {
    await api.post('/posts', { content: postContent.value, type: 'announcement', is_anonymous: false });
    ElMessage.success('公告发布成功');
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
    await api.post('/comments', { content: newComment.value, post_id: postId, is_anonymous: false });
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
.post-header { display: flex; justify-content: space-between; align-items: center; font-size: 1.1rem; font-weight: bold; }
.comment-section { margin-top: 15px; padding-top: 10px; border-top: 1px solid #eee; }
.comment-item { margin-bottom: 8px; font-size: 0.9rem; }
.comment-user { font-weight: bold; margin-right: 5px; }
.reply-box { display: flex; gap: 10px; margin-top: 10px; }
</style>
