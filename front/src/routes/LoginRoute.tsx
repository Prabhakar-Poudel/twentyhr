import { ReactNode } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from 'src/contexts/AuthContext'

interface PublicRouteProps {
  children: ReactNode
}

const PublicRoute = () => {
  const auth = useAuth()
  const location = useLocation()

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace/>
  }
  return <Outlet />
}

export default PublicRoute
