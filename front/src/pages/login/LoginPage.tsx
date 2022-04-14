import { Button, Container, Paper, TextField, Typography, Link } from '@mui/material'
import { Box } from '@mui/system'
import developementImage from 'src/assets/svg/loginScreen.svg'

const LoginPage = () => {
  return (
    <Paper
      square
      className="h-screen w-screen flex flex-wrap md:flex-nowrap"
    >
      <Container className="!grid place-content-center">
        <Box>
          <Typography variant="h3">Login</Typography>
          <Box className="mt-2">
            <TextField fullWidth label="Email" id="email" />
            <TextField fullWidth id="password" label="Password" type="password" className="!mt-4" />
            <div className="mt-4 mb-4">
              <Link href="#">Forgot Password?</Link>
            </div>
            <Button variant="contained" disableElevation fullWidth>Login</Button>
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
