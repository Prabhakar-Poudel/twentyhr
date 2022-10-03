import { Box, Paper, Typography } from '@mui/material'
import HomeLogo from 'src/components/app/appHeader/HomeLogo'

const EndInterview = () => (
  <Paper square className="h-screen w-screen flex flex-wrap md:flex-nowrap">
    <Box className="m-auto flex flex-col w-96 gap-8">
      <HomeLogo withText />
      <Typography variant="h5">The interview has now ended</Typography>
      <Box>
        <Typography>Thank you for taking your time out to interview with us today</Typography>
      </Box>
    </Box>
  </Paper>
)

export default EndInterview
