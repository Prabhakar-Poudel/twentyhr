import { Button, Container, Paper, TextField, Typography, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { Box } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import loginImage from 'src/assets/svg/loginScreen.svg'
import LoginPassword from 'src/components/app/login/Password'

const LoginPage = () => {
	const navigate = useNavigate()
	const onLogin = () => {
		navigate('/questions')
	}

	return (
		<Paper square className="h-screen w-screen flex flex-wrap md:flex-nowrap">
			<Container className="!grid place-content-center">
				<Box>
					<Typography variant="h3">Login</Typography>
					<Box component="form" className="mt-2">
						<TextField fullWidth label="Email" id="email" type="email" />
						<LoginPassword />
						<div className="mt-4 mb-4 flex justify-between">
							<Link
								component={RouterLink}
								to="/forgot-password"
								color="secondary"
							>
								Forgot Password?
							</Link>
							<Link component={RouterLink} to="/signup" color="secondary">
								Need an account?
							</Link>
						</div>
						<Button variant="contained" fullWidth onClick={onLogin}>
							Login
						</Button>
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
