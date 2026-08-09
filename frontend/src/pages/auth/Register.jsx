import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { register, clearError } from '../../store/slices/authSlice'
import RegisterForm from '../../components/auth/RegisterForm'

export default function Register() {
  const { loading, error } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    return () => dispatch(clearError())
  }, [dispatch])

  const onSubmit = async (data) => {
    try {
      await dispatch(register(data)).unwrap()
      toast.success('Registration successful')
      navigate('/')
    } catch (err) {
      toast.error(err || 'Registration failed')
    }
  }

  return <RegisterForm onSubmit={onSubmit} loading={loading} error={error} />
}
