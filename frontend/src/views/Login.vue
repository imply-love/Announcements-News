<template>
  <div class="login-page">
    <el-card class="login-card">
      <h2 style="text-align: center; margin-bottom: 20px;">用户登录</h2>
      <el-form :model="form" label-position="top">
        <el-form-item label="用户名">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-button type="primary" @click="handleLogin" style="width: 100%; margin-top: 10px">登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/user';
import api from '@/api';
import { ElMessage } from 'element-plus';

const router = useRouter();
const userStore = useUserStore();
const form = ref({ username: '', password: '' });

const handleLogin = async () => {
  if (!form.value.username || !form.value.password) {
    ElMessage.warning('请填写用户名和密码');
    return;
  }
  try {
    const res = await api.post('/auth/login', {
      username: form.value.username,
      password: form.value.password
    });
    
    const token = res.data.access_token;
    console.log('Login response token:', token);
    localStorage.setItem('token', token);
    console.log('Token saved to localStorage');
    const userRes = await api.get('/auth/me');
    userStore.setUserInfo(userRes.data, token);
    ElMessage.success('登录成功');
    router.push('/');
  } catch (e) {
    const errorMsg = e.response?.data?.detail || '登录失败，请检查账号密码';
    ElMessage.error(errorMsg);
  }
};
</script>

<style scoped>
.login-page { display: flex; justify-content: center; align-items: center; height: 80vh; }
.login-card { width: 400px; }
</style>
