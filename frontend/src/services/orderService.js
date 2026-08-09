import { api } from './api'

export const orderService = {
  placeOrder: (shippingAddress, paymentMethod) =>
    api.post('/orders', { shippingAddress, paymentMethod }),

  getMyOrders: (page = 0, size = 10) =>
    api.get(`/orders/me?page=${page}&size=${size}`),

  getAllOrders: (page = 0, size = 50) =>
    api.get(`/orders?page=${page}&size=${size}`),

  getById: (id) => api.get(`/orders/${id}`),

  updateStatus: (id, status) =>
    api.put(`/orders/${id}/status`, null, {
      params: { status },
    }),
}

export const paymentService = {
  processPayment: (orderId, paymentMethod) =>
    api.post(`/payments/process/${orderId}?paymentMethod=${encodeURIComponent(paymentMethod)}`),

  getByOrderId: (orderId) => api.get(`/payments/order/${orderId}`),

  getById: (id) => api.get(`/payments/${id}`),

  refund: (orderId) => api.post(`/payments/refund/${orderId}`),
}
