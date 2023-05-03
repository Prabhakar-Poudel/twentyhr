import { Box } from '@mui/material'
import { Outlet, useLocation } from 'react-router-dom'
import AppHeader from 'src/components/app/appHeader/AppHeader'
import LeftDrawer from 'src/components/app/settings/LeftDrawer'
import { LeftDrawerItemLabelType } from 'src/constants/leftDrawerItems'

const SettingsLayout = () => {
  const location = useLocation()
  const currentTabFromUrl = location.pathname.split('/').at(-1) as LeftDrawerItemLabelType

  console.log()

  return (
    <Box className="flex flex-col h-screen">
      <AppHeader />
      <Box className="flex h-full">
        <LeftDrawer selected={currentTabFromUrl} />
        <Outlet />
      </Box>
    </Box>
  )
}

export default SettingsLayout
