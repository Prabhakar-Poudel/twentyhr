import DashboardBody from "src/components/app/dashboard/dashboardBody/DashboardBody"
import AppHeader from "src/components/app/appHeader/AppHeader"
import { Box } from "@mui/material"

const DashboardPage = () => {
  return (
    <Box>
      <AppHeader />
      <DashboardBody />
    </Box>
  )
}

export default DashboardPage
