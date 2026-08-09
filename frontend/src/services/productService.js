import { api } from './api'

export const productService = {
  // GET
  getAll: (page = 0, size = 10, keyword = "", categoryId = null) =>
    api.get(
      `/products?page=${page}&size=${size}${keyword ? `&keyword=${encodeURIComponent(keyword)}` : ""
      }${categoryId ? `&categoryId=${categoryId}` : ""}`
    ),

  getById: (id) => api.get(`/products/${id}`),

  getBySlug: (slug) => api.get(`/products/slug/${slug}`),

  search: (
    keyword = "",
    categoryId = null,
    page = 0,
    size = 12
  ) =>
    api.get("/products/search", {
      params: {
        keyword,
        categoryId: categoryId || undefined,
        page,
        size,
      },
    }),

  getByCategory: (categoryId, page = 0, size = 10) =>
    api.get(`/products/category/${categoryId}?page=${page}&size=${size}`),

  getLatest: (page = 0, size = 10) =>
    api.get(`/products/latest?page=${page}&size=${size}`),

  getByPriceRange: (minPrice, maxPrice, page = 0, size = 10) =>
    api.get(
      `/products/price-range?minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}&size=${size}`
    ),

  // CREATE
  create: (product) => api.post("/products", product),

  // UPDATE
  update: (id, product) => api.put(`/products/${id}`, product),

  // DELETE
  delete: (id) => api.delete(`/products/${id}`),
};

export const categoryService = {
  getAll: () => api.get('/categories'),

  getById: (id) => api.get(`/categories/${id}`),

  getBySlug: (slug) => api.get(`/categories/slug/${slug}`),

  search: (keyword, page = 0, size = 10) =>
    api.get(`/categories/search?keyword=${encodeURIComponent(keyword)}&page=${page}&size=${size}`),
}
