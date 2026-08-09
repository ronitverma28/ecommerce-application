import { api } from './api'

export const categoryService = {
  getAll: () => api.get('/categories'),

  getById: (id) => api.get(`/categories/${id}`),

  getBySlug: (slug) => api.get(`/categories/slug/${slug}`),

  search: (keyword, page = 0, size = 10) =>
    api.get(`/categories/search?keyword=${encodeURIComponent(keyword)}&page=${page}&size=${size}`),

  create: (data) => api.post('/categories', data),

  update: (id, data) => api.put(`/categories/${id}`, data),

  delete: (id) => api.delete(`/categories/${id}`),
}
