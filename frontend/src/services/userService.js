import { api } from './api'

export const userService = {
  getProfile: () => api.get('/users/me'),

  updateProfile: (userData) => api.put('/users/me', userData),

  getAllUsers: (page = 0, size = 10) => api.get(`/users?page=${page}&size=${size}`),

  getUserById: (id) => api.get(`/users/${id}`),

  deleteUser: (id) => api.delete(`/users/${id}`),
}
