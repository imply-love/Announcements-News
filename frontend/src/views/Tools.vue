<template>
  <div class="page">
    <div class="header">
      <h1>工具软件栏</h1>
      <el-button v-if="userStore.isAdmin" type="primary" @click="showToolDialog = true">发布工具</el-button>
    </div>

    <el-table :data="tools" style="width: 100%" stripe>
      <el-table-column prop="name" label="工具名称" min-width="150"></el-table-column>
      <el-table-column prop="description" label="描述" min-width="300"></el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button type="primary" size="small" @click="downloadTool(scope.row.download_url)">下载</el-button>
          <el-button v-if="userStore.isAdmin" type="danger" size="small" @click="deleteTool(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="showToolDialog" title="发布新工具" width="50%">
      <el-form :model="toolForm" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="toolForm.name"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="toolForm.description" type="textarea" rows="3"></el-input>
        </el-form-item>
        <el-form-item label="链接">
          <el-input v-model="toolForm.download_url" placeholder="http://..."></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showToolDialog = false">取消</el-button>
        <el-button type="primary" @click="submitTool">确定</el-button>
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
const tools = ref([]);
const showToolDialog = ref(false);
const toolForm = ref({ name: '', description: '', download_url: '' });

const fetchTools = async () => {
  try {
    const res = await api.get('/tools');
    tools.value = res.data;
  } catch (e) {
    ElMessage.error('加载工具失败');
  }
};

const submitTool = async () => {
  if (!toolForm.value.name || !toolForm.value.download_url) {
    return ElMessage.warning('请填写必填项');
  }
  try {
    await api.post('/tools', toolForm.value);
    ElMessage.success('发布成功');
    showToolDialog.value = false;
    toolForm.value = { name: '', description: '', download_url: '' };
    fetchTools();
  } catch (e) {
    ElMessage.error('发布失败');
  }
};

const deleteTool = async (id) => {
  try {
    await api.delete(`/tools/${id}`);
    ElMessage.success('删除成功');
    fetchTools();
  } catch (e) {
    ElMessage.error('删除失败');
  }
};

const downloadTool = (url) => {
  window.open(url, '_blank');
};

onMounted(fetchTools);
</script>

<style scoped>
.page { padding: 20px; }
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
</style>
