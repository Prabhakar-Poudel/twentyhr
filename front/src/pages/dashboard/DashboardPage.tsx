import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardBody from "src/components/app/dashboard/dashboardBody/DashboardBody"
import AppHeader from "src/components/app/appHeader/AppHeader"
import { Box } from "@mui/material"

const DashboardPage = () => {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/questions')
  })

  return (
    <Box>
      <AppHeader />
      <DashboardBody />
    </Box>
  )
}

export default DashboardPage
