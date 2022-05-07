import { Navigate, Outlet } from 'react-router-dom'
import PageLoading from 'src/components/shared/PageLoading'
import { useAuth } from 'src/contexts/AuthContext'

const LoginRoute = () => {
  const { user, loading } = useAuth()

  if (loading) return <PageLoading />
  if (user) return <Navigate to="/" replace />
  return <Outlet />
}

export default LoginRoute
