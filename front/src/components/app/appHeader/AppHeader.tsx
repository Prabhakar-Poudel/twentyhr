import { AppBar, Box, Toolbar } from '@mui/material'
import { Link } from 'react-router-dom'
import logo from 'src/assets/logos/logo192.png'
import AccountMenu from './AccountMenu'

const AppHeader = () => {
	return (
		<AppBar position="relative">
			<Toolbar variant="dense">
				<Link to="/">
					<img src={logo} alt="logo" className="w-7 h-7" />
				</Link>
				<Box sx={{ flexGrow: 1 }} />
				<AccountMenu />
			</Toolbar>
		</AppBar>
	)
}

export default AppHeader
