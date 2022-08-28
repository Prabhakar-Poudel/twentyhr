import { Box, Button, LinearProgress, Link, Paper, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import HomeLogo from 'src/components/app/appHeader/HomeLogo'
import { usePingInterview } from 'src/queries/Interviews'
import { InterviewStatuses } from 'src/types/interview'
import { LocationState } from 'src/types/routerLocation'

const JoinInterview = () => {
  const { state } = useLocation()
  const locationState = state as LocationState
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const redirectTo = locationState?.from

  const interviewId = redirectTo?.pathname?.replace('/interviews/', '')
  const { data: interview, isLoading } = usePingInterview(interviewId)

  const redirectToLogin = () => navigate('/login', { replace: true, state: { from: redirectTo } })
  const redirectToInterview = () => navigate(redirectTo!, { replace: true })

  const guestLogin = () => {
    if (!name.trim()) return
    redirectToInterview()
  }

  useEffect(() => {
    if (!redirectTo) redirectToLogin()
  }, [])

  if (isLoading) return <LinearProgress />

  if (!(interview?.status === InterviewStatuses.started || interview?.status === InterviewStatuses.created)) {
    setTimeout(() => navigate('/not-found', { replace: true }), 1000)
    return null
  }

  return (
    <Paper square className="h-screen w-screen flex flex-wrap md:flex-nowrap">
      <Box className="m-auto flex flex-col w-96 gap-8">
        <HomeLogo withText />
        <Typography variant="h5">Welcome to the interview</Typography>
        <Box>
          <Typography>To get started, please enter your full name which will be visible to the interviewers</Typography>
          <Box className="flex my-4">
            <TextField
              fullWidth
              required
              label="Full Name"
              id="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button variant="contained" size="large" className="h-14" onClick={guestLogin}>
              Start
            </Button>
          </Box>
        </Box>
        <Typography>
          If you are an interviewer{' '}
          <Box onClick={redirectToLogin} component={Link} className="cursor-pointer">
            Login here
          </Box>
        </Typography>
      </Box>
    </Paper>
  )
}

export default JoinInterview
