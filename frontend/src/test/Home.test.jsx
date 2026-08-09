import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../store/slices/authSlice'
import productReducer from '../store/slices/productSlice'
import Home from '../pages/home/Home'

const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      auth: authReducer,
      products: productReducer,
    },
    preloadedState,
  })
}

const renderWithProviders = (ui, { preloadedState = {}, store = createTestStore(preloadedState) } = {}) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        {ui}
      </BrowserRouter>
    </Provider>
  )
}

describe('Home', () => {
  it('renders welcome heading', () => {
    renderWithProviders(<Home />)
    expect(screen.getByText('Welcome to E-Commerce')).toBeInTheDocument()
  })

  it('renders shop now button', () => {
    renderWithProviders(<Home />)
    expect(screen.getByText('Shop Now')).toBeInTheDocument()
  })
})
