// 简单的 store 模拟实现，防止 main.js 引入失败
const store = {
  state: {
    token: uni.getStorageSync('token') || '',
    user: uni.getStorageSync('user') || null
  },
  commit(mutation) {
    console.log('Store mutation:', mutation);
  },
  dispatch(action) {
    console.log('Store action:', action);
  }
};

export default store;
