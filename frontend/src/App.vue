<template>
  <div class="app-container">
    <header class="nav-bar">
      <div class="logo">校园公告系统</div>
      <nav>
        <router-link to="/">公告栏</router-link>
        <router-link to="/wall">校园墙</router-link>
        <router-link to="/tools">工具栏</router-link>
      </nav>
      <div class="user-info">
        <span v-if="userStore.isLoggedIn && userStore.user">你好, {{ userStore.user.username }}</span>
        <router-link v-else to="/login">登录</router-link>
        <el-button v-if="userStore.isLoggedIn" size="small" @click="handleLogout">退出</el-button>
      </div>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/user';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const handleLogout = () => {
  userStore.logout();
  router.push('/login');
};
</script>

<style scoped>
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  height: 60px;
  background: #409eff;
  color: white;
}
nav a {
  color: white;
  margin: 0 15px;
  text-decoration: none;
  font-weight: bold;
}
.user-info {
  display: flex;
  gap: 15px;
  align-items: center;
}
main {
  padding: 20px;
}
</style>
