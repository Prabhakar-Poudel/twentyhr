import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { AxiosResponse } from 'axios'
import { useState, FormEventHandler } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import verifyAccountImage from 'src/assets/svg/verifyAccount.svg'
import useToast from 'src/hooks/useToast'
import { axios } from 'src/lib/axios/axios'

const VerifyAccountPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const tokenParam = searchParams.get('token') || ''
  const [token, setToken] = useState(tokenParam)
  const toast = useToast()

  const verifyToken: FormEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault()
    try {
      await axios.get(`users/confirmation?confirmation_token=${token}`)
      toast({ message: 'Account verified successfully', type: 'success' })
      navigate('/', { replace: true })
    } catch ({ response }) {
      const { data } = response as AxiosResponse
      toast({ message: Object.entries(data)[0].join(' ') || 'Invalid token', type: 'error' })
    }
  }

  return (
    <Paper square className="h-screen w-screen flex flex-wrap md:flex-nowrap">
      <Container className="!grid place-content-center">
        <Box component="section">
          <Typography variant="h3">Verify account</Typography>
          <Box component="form" onSubmit={verifyToken}>
            <TextField fullWidth required autoComplete="one-time-code" label="Verification Code" id="verification-code" margin="dense" value={token} onChange={(event) => setToken(event.target.value)} />
            <Box className="mt-2">
              <Button fullWidth type="submit" variant="contained">Verify</Button>
            </Box>
          </Box>
        </Box>
      </Container>
      <Container>
        <img src={verifyAccountImage} alt="join thr" className="h-full" />
      </Container>
    </Paper>
  )
}

export default VerifyAccountPage
