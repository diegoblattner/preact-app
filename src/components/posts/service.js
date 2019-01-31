import { fetchApi } from '../../lib/fetch-api';

const listPosts = async () => fetchApi('/posts', []);

const getPostById = async postId => fetchApi(`/posts/${postId}`, null);

const getPostComments = async postId =>
  fetchApi(`/posts/${postId}/comments`, []);

export { listPosts, getPostById, getPostComments };
