import { Button, Container, Paper, TextField, Typography, Link } from '@mui/material'
import { Box } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import developementImage from 'src/assets/svg/loginScreen.svg'
import LoginPassword from 'src/components/app/login/Password'

const LoginPage = () => {
  const navigate = useNavigate()
  const onLogin = () => {
    navigate("/questions")
  }

  return (
    <Paper
      square
      className="h-screen w-screen flex flex-wrap md:flex-nowrap"
    >
      <Container className="!grid place-content-center">
        <Box>
          <Typography variant="h3">Login</Typography>
          <Box className="mt-2">
            <TextField fullWidth label="Email" id="email" type="email" />
            <LoginPassword />
            <div className="mt-4 mb-4 flex justify-between">
              <Link href="#" color="secondary">Forgot Password?</Link>
              <Link href="#" color="secondary">Need an account?</Link>
            </div>
            <Button variant="contained" fullWidth onClick={onLogin}>Login</Button>
          </Box>
        </Box>
      </Container>
      <Container>
        <img src={developementImage} alt="collaboration" className="h-full" />
      </Container>
    </Paper>
  )
}

export default LoginPage
