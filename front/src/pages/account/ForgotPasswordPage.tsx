import {
	Box,
	Container,
	Button,
	Paper,
	FormControl,
	TextField,
	Typography,
	FormHelperText,
} from '@mui/material'
import { AxiosResponse } from 'axios'
import { FormEventHandler, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import forgotPasswordImage from 'src/assets/svg/forgotPassword.svg'
import useToast from 'src/hooks/useToast'
import { axios } from 'src/lib/axios/axios'

const ForgotPasswordPage = () => {
	const navigate = useNavigate()
	const toast = useToast()
	const [email, setEmail] = useState('')

	const resetPassword: FormEventHandler<HTMLDivElement> = async (e) => {
		e.preventDefault()
		try {
			await axios.post('/users/password', { user: { email }})
			toast({ message: 'Reset instructions sent successfully', type: 'success' })
			navigate('/login', { replace: true })
		} catch ({ response }) {
			const { data } = response as AxiosResponse
			toast({ message: Object.entries(data.errors)[0].join(' ') || 'Invalid token', type: 'error' })
		}
	}

	return (
		<Paper square className="h-screen w-screen flex flex-wrap md:flex-nowrap">
			<Container className="!grid place-content-center">
				<Box component="section">
					<Typography variant="h3">Forgot Password</Typography>
					<Box component="form" className="mt-2" onSubmit={resetPassword}>
						<TextField
							fullWidth
							required
							label="Email"
							id="email"
							type="email"
							autoComplete="email"
							value={email}
							helperText="We'll send an email to reset your password"
							onChange={(e) => setEmail(e.target.value)}
						/>
						<Box className="mt-2">
							<Button type="submit" variant="contained">Send Reset Email</Button>
						</Box>
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

export default ForgotPasswordPage
