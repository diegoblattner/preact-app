import { fetchApi } from '../../lib/fetch-api';

const getUserById = async userId => fetchApi(`/users/${userId}`, null);

export { getUserById };
