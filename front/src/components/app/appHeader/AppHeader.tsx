import { AppBar, Toolbar } from '@mui/material'
import HomeLogo from 'src/components/app/appHeader/HomeLogo'
import NavigationItems from 'src/components/app/appHeader/NavigationItems'
import AccountMenu from './AccountMenu'

const AppHeader = () => {
  return (
    <AppBar position="relative">
      <Toolbar variant="dense" className="gap-4">
        <HomeLogo />
        <NavigationItems />
        <AccountMenu />
      </Toolbar>
    </AppBar>
  )
}

export default AppHeader
