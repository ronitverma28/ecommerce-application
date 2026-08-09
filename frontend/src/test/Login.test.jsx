import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../store/slices/authSlice'
import Login from '../pages/auth/Login'

const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      auth: authReducer,
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

describe('Login', () => {
  it('renders login form', () => {
    renderWithProviders(<Login />)
    expect(screen.getByText('Sign in to your account')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
  })

  it('renders register link', () => {
    renderWithProviders(<Login />)
    expect(screen.getByText('Register here')).toBeInTheDocument()
  })
})
