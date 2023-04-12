import { Box, LinearProgress, Paper } from '@mui/material'

const PageLoading = () => (
  <Paper square className="h-screen w-screen flex flex-wrap md:flex-nowrap">
    <Box className="w-full">
      <LinearProgress />
    </Box>
  </Paper>
)

export default PageLoading
