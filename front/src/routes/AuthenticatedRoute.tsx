import { Navigate, Outlet, useLocation } from 'react-router-dom'
import PageLoading from 'src/components/shared/PageLoading'
import { useAuth } from 'src/contexts/AuthContext'

function AuthenticatedRoute() {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <PageLoading />
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />
  return <Outlet />
}

export default AuthenticatedRoute
