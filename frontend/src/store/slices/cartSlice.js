import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../services/api";
import { cartService } from "../../services/cartService";

const initialState = {
  cart: null,
  loading: false,
  error: null,
};

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/cart");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to fetch cart"
      );
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await api.post("/cart/items", {
        productId,
        quantity,
      });

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to add to cart"
      );
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async (
    { cartItemId, quantity },
    { rejectWithValue }
  ) => {
    try {
      const response =
        await cartService.updateCartItem(
          cartItemId,
          quantity
        );

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to update cart item"
      );
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (cartItemId, { rejectWithValue }) => {
    try {
      await api.delete(`/cart/items/${cartItemId}`);

      return cartItemId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to remove from cart"
      );
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      await api.delete("/cart");

      return null;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to clear cart"
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    clearError: (state) => {
      state.error = null;
    },

    optimisticUpdateQuantity: (
      state,
      action
    ) => {
      const {
        cartItemId,
        quantity,
      } = action.payload;

      const item = state.cart?.items?.find(
        (item) => item.id === cartItemId
      );

      if (!item) {
        return;
      }

      item.quantity = quantity;

      item.totalPrice =
        Number(item.priceAtAdd) * quantity;

      state.cart.totalItems =
        state.cart.items.reduce(
          (total, item) =>
            total + item.quantity,
          0
        );

      state.cart.totalPrice =
        state.cart.items.reduce(
          (total, item) =>
            total + Number(item.totalPrice),
          0
        );
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(
        fetchCart.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchCart.fulfilled,
        (state, action) => {
          state.loading = false;
          state.cart = action.payload;
        }
      )

      .addCase(
        fetchCart.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      .addCase(
        addToCart.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        addToCart.fulfilled,
        (state, action) => {
          state.loading = false;

          state.cart =
            action.payload.cart ||
            action.payload;
        }
      )

      .addCase(
        addToCart.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      .addCase(
        updateCartItem.pending,
        (state) => {
          state.error = null;
        }
      )

      .addCase(
        updateCartItem.fulfilled,
        (state, action) => {
          const updatedItem =
            action.payload;

          if (!state.cart?.items) {
            return;
          }

          const index =
            state.cart.items.findIndex(
              (item) =>
                item.id === updatedItem.id
            );

          if (index !== -1) {
            state.cart.items[index] =
              updatedItem;
          }

          state.cart.totalItems =
            state.cart.items.reduce(
              (total, item) =>
                total + item.quantity,
              0
            );

          state.cart.totalPrice =
            state.cart.items.reduce(
              (total, item) =>
                total +
                Number(item.totalPrice),
              0
            );
        }
      )

      .addCase(
        updateCartItem.rejected,
        (state, action) => {
          state.error = action.payload;
        }
      )

      .addCase(
        removeFromCart.fulfilled,
        (state, action) => {
          if (!state.cart?.items) {
            return;
          }

          state.cart.items =
            state.cart.items.filter(
              (item) =>
                item.id !== action.payload
            );

          state.cart.totalItems =
            state.cart.items.reduce(
              (total, item) =>
                total + item.quantity,
              0
            );

          state.cart.totalPrice =
            state.cart.items.reduce(
              (total, item) =>
                total +
                Number(item.totalPrice),
              0
            );
        }
      )

      .addCase(
        removeFromCart.rejected,
        (state, action) => {
          state.error = action.payload;
        }
      )

      .addCase(
        clearCart.fulfilled,
        (state) => {
          state.cart = null;
        }
      )

      .addCase(
        clearCart.rejected,
        (state, action) => {
          state.error = action.payload;
        }
      );
  },
});

export const {
  clearError,
  optimisticUpdateQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;