import { Button, Container, Paper, TextField, Typography, Link } from '@mui/material'
import { Box } from '@mui/system'
import { AxiosResponse } from 'axios'
import { useState, FormEventHandler } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import signUpImage from 'src/assets/svg/signUp.svg'
import PasswordField from 'src/components/shared/Password'
import useToast from 'src/hooks/useToast'
import { axios } from 'src/lib/axios/axios'

function SignUpPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const toast = useToast()

  const onSignUp: FormEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/users', { user: { email, password } })
      toast({ message: 'Account created. Please check your email.', type: 'success' })
      navigate('/verify-account')
    } catch ({ response }) {
      const { data } = response as AxiosResponse
      toast({
        message: Object.entries(data.errors)[0].join(' ') || 'Something went wrong, please try again',
        type: 'error',
      })
    }
  }

  return (
    <Paper square className="h-screen w-screen flex flex-wrap md:flex-nowrap">
      <Container className="!grid place-content-center">
        <Box component="section">
          <Typography variant="h3">Sign Up</Typography>
          <Box component="form" className="mt-2" onSubmit={onSignUp}>
            <TextField
              fullWidth
              required
              label="Company email"
              helperText="We'll send an email to set up your company account"
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordField autocomplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <div className="mb-4 flex justify-between">
              <Link component={RouterLink} to="/login" color="secondary">
                Already have an account?
              </Link>
            </div>
            <Button type="submit" variant="contained" fullWidth>
              Sign me up
            </Button>
          </Box>
        </Box>
      </Container>
      <Container>
        <img src={signUpImage} alt="login" className="h-full" />
      </Container>
    </Paper>
  )
}

export default SignUpPage
