import http from '@/common/api/index.js';

export default {
	async login(data) {
		return http.post('/auth/login/', data);
	},
	async register(data) {
		return http.post('/auth/register/', data);
	},
	async getPosts(type = 'announcement', page = 1) {
		return http.get(`/posts/?type=${type}&page=${page}`);
	},
	async createPost(data) {
		return http.post('/posts/', data);
	},
	async getComments(postId) {
		return http.get(`/posts/${postId}/comments/`);
	},
	async createComment(data) {
		return http.post('/comments/', data);
	},
	async getTools() {
		return http.get('/tools/');
	},
	async uploadTool(data) {
		return http.post('/tools/', data);
	}
};
