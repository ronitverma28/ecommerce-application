import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { orderService, paymentService } from '../../services/orderService'

const initialState = {
  orders: [],
  currentOrder: null,
  payment: null,
  loading: false,
  error: null,
}

export const placeOrder = createAsyncThunk(
  'orders/placeOrder',
  async ({ shippingAddress, paymentMethod }, { rejectWithValue }) => {
    try {
      const response = await orderService.placeOrder(shippingAddress, paymentMethod)
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to place order')
    }
  }
)

export const fetchMyOrders = createAsyncThunk(
  'orders/fetchMyOrders',
  async ({ page = 0, size = 10 }, { rejectWithValue }) => {
    try {
      const response = await orderService.getMyOrders(page, size)
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch orders')
    }
  }
)

export const fetchAllOrders = createAsyncThunk(
  'orders/fetchAllOrders',
  async ({ page = 0, size = 50 }, { rejectWithValue }) => {
    try {
      const response = await orderService.getAllOrders(page, size)
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch orders')
    }
  }
)

export const fetchOrderById = createAsyncThunk(
  'orders/fetchOrderById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await orderService.getById(id)

      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch order')
    }
  }
)

export const processPayment = createAsyncThunk(
  'orders/processPayment',
  async ({ orderId, paymentMethod }, { rejectWithValue }) => {
    try {
      const response = await paymentService.processPayment(orderId, paymentMethod)
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Payment failed')
    }
  }
)

export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await orderService.updateStatus(id, status)
      return response.data.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update order status'
      )
    }
  }
)

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null
    },
  },
  extraReducers: (builder) => {
    builder

      // Place Order
      .addCase(placeOrder.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false
        state.currentOrder = action.payload
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Fetch My Orders
      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.loading = false
        state.orders = action.payload.content || action.payload
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Fetch All Orders (Admin)
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false
        state.orders = action.payload.content || action.payload
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Fetch Order By Id
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false
        state.currentOrder = action.payload
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Process Payment
      .addCase(processPayment.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(processPayment.fulfilled, (state, action) => {
        state.loading = false
        state.payment = action.payload
      })
      .addCase(processPayment.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Update Order Status
      // Update Order Status
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false

        const updatedOrder = action.payload

        const index = state.orders.findIndex(
          (order) => order.id === updatedOrder.id
        )

        if (index !== -1) {
          state.orders[index] = updatedOrder
        }

        if (
          state.currentOrder &&
          state.currentOrder.id === updatedOrder.id
        ) {
          state.currentOrder = updatedOrder
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { clearError, clearCurrentOrder } = orderSlice.actions
export default orderSlice.reducer
