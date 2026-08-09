import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { login, clearError } from '../../store/slices/authSlice'
import LoginForm from '../../components/auth/LoginForm'

export default function Login() {
  const { loading, error } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    return () => dispatch(clearError())
  }, [dispatch])

  const onSubmit = async (data) => {
    try {
      await dispatch(login(data)).unwrap()
      toast.success('Login successful')
      navigate('/')
    } catch (err) {
      toast.error(err || 'Login failed')
    }
  }

  return <LoginForm onSubmit={onSubmit} loading={loading} error={error} />
}
