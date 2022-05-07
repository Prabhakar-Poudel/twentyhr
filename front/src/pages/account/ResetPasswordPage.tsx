import {
  Button,
  Container,
  Paper,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { AxiosResponse } from 'axios'
import { useState, FormEventHandler } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom'
import forgotPasswordImage from 'src/assets/svg/forgotPassword.svg'
import PasswordField from 'src/components/app/account/Password'
import useToast from 'src/hooks/useToast'
import { axios } from 'src/lib/axios/axios'

const ResetPasswordPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const toast = useToast()
  const token = searchParams.get('token') || ''

  const createPassword: FormEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault()
    try {
      await axios.put('/users/password', { user: {reset_password_token: token, password, password_confirmation: confirmPassword }})
      toast({ message: 'Password has been reset successfully', type: 'success' })
      navigate('/', { replace: true })
    } catch ({ response }) {
      const { data } = response as AxiosResponse
      toast({ message: Object.entries(data.errors)[0].join(' '), type: 'error' })
    }
  }

  return (
    <Paper square className="h-screen w-screen flex flex-wrap md:flex-nowrap">
      <Container className="!grid place-content-center">
        <Box component="section">
          <Typography variant="h3">Create new password</Typography>
          <Box component="form" onSubmit={createPassword}>
            <PasswordField autocomplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <PasswordField autocomplete="new-password" label="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            <Button type="submit" variant="contained" fullWidth>Confirm Reset</Button>
          </Box>
        </Box>
      </Container>
      <Container>
        <img
          src={forgotPasswordImage}
          alt="forgot password"
          className="h-full"
        />
      </Container>
    </Paper>
  )
}

export default ResetPasswordPage
