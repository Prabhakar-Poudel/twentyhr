import { Box, Typography } from '@mui/material'
import LoginSection from 'src/components/app/settings/Account/LoginSection'

const AccountPage = () => (
  <Box>
    <Box className="mx-4 md:mx-10">
      <Box className="my-4">
        <Typography variant="h4">Account Settings</Typography>
        <Typography>Information about your account and ways you can configure them.</Typography>
      </Box>
      <LoginSection />
    </Box>
  </Box>
)

export default AccountPage
