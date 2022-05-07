import {
  Button,
  Container, Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { AxiosResponse } from 'axios'
import { useState, FormEventHandler } from 'react';
import { Link as RouterLink, useNavigate, useSearchParams } from 'react-router-dom'
import loginImage from 'src/assets/svg/loginScreen.svg'
import verifyAccountImage from 'src/assets/svg/verifyAccount.svg'
import PasswordField from 'src/components/app/account/Password'
import useToast from 'src/hooks/useToast'
import { axios } from 'src/lib/axios/axios'

const ResetPasswordPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const toast = useToast()
  const token = searchParams.get('token')

  const createPassword: FormEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault()
    try {
      await axios.put('/users/password', { reset_password_token: token, password, password_confirmation: confirmPassword })
      toast({ message: 'Password has been reset successfully', type: 'success' })
      navigate('/', { replace: true })
    } catch ({ response }) {
      const { data } = response as AxiosResponse
      toast({ message: Object.entries(data)[0].join(' '), type: 'error' })
    }
  }

  return (
    <Paper square className="h-screen w-screen flex flex-wrap md:flex-nowrap">
      <Container className="!grid place-content-center">
        <Box component="section">
          <Typography variant="h3">Login</Typography>
          <Box component="form" className="mt-2" onSubmit={createPassword}>
            <PasswordField value={password} onChange={(e) => setPassword(e.target.value)}/>
            <PasswordField value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            <Button type="submit" variant="contained" fullWidth>Login</Button>
          </Box>
        </Box>
      </Container>
      <Container>
        <img src={loginImage} alt="login" className="h-full" />
      </Container>
    </Paper>
  )
}

export default ResetPasswordPage
