import { Button, Container, Paper, TextField, Typography, Link } from '@mui/material'
import { AxiosResponse } from 'axios'
import { FormEventHandler, useState } from 'react'
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom'
import { Box } from '@mui/system'
import loginImage from 'src/assets/svg/loginScreen.svg'
import PasswordField from 'src/components/shared/Password'
import { useAuth } from 'src/contexts/AuthContext'
import useToast from 'src/hooks/useToast'

const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { logIn } = useAuth()
  const toast = useToast()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const redirectTo = location.state?.from?.pathname || '/'

  const onLogin: FormEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault()
    try {
      await logIn({ email, password })
      navigate(redirectTo, { replace: true })
    } catch ({ response }) {
      const { data } = response as AxiosResponse
      toast({ message: data.error, type: 'error' })
    }
  }

  return (
    <Paper square className="h-screen w-screen flex flex-wrap md:flex-nowrap">
      <Container className="!grid place-content-center">
        <Box component="section">
          <Typography variant="h3">Login</Typography>
          <Box component="form" onSubmit={onLogin}>
            <TextField
              fullWidth
              required
              label="Email"
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              margin="dense"
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordField value={password} onChange={(e) => setPassword(e.target.value)} />
            <Box className="flex justify-between">
              <Link component={RouterLink} to="/forgot-password" color="secondary">
                Forgot Password?
              </Link>
              <Link component={RouterLink} to="/signup" color="secondary">
                Need an account?
              </Link>
            </Box>
            <Box className="mt-2">
              <Button type="submit" variant="contained" fullWidth>
                Login
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
      <Container>
        <img src={loginImage} alt="login" className="h-full" />
      </Container>
    </Paper>
  )
}

export default LoginPage
