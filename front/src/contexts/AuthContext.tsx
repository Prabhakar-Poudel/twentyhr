import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import { axios } from 'src/lib/axios/axios'
import { User } from 'src/types/user'

interface UserLoginProps {
  email: string
  password: string
}

interface AuthContextType {
  loading: boolean
  user: User | null
  logIn: (user: UserLoginProps) => void
  logOut: () => void
  fetchCurrentUser: () => void
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContextType>(null!)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const queryClient = useQueryClient()

  const fetchCurrentUser = () => {
    return axios.get('/profile')
      .then(response => setUser(response.data))
      .catch(() => setUser(null))
  }

  const fetchProfile = useCallback(() => {
    fetchCurrentUser().finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  const logIn = (newUser: UserLoginProps) => {
    const { email, password } = newUser
    if(!(email && password)) return
    return axios.post('/users/sign_in', { user: { email, password }})
      .then(response => setUser(response.data))
      .finally(() => setLoading(false))
  }

  const logOut = async () => {
    await queryClient.invalidateQueries()
    return axios.delete('/users/sign_out')
      .finally(() => setUser(null))
  }

  const value = { loading, user, fetchCurrentUser, logIn, logOut }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext)
