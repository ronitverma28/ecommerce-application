import { api } from './api'

export const authService = {
  getCurrentUser: () => api.get('/users/me'),

  changePassword: (oldPassword, newPassword) =>
    api.put('/auth/change-password', { oldPassword, newPassword }),
}
