import { Box } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import IconButton from '@mui/material/IconButton'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import { MouseEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from 'src/contexts/AuthContext'

export default function AccountMenu() {
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
	const open = Boolean(anchorEl)
	const { logOut } = useAuth()

	const handleClick = (event: MouseEvent<HTMLElement>) =>
		setAnchorEl(event.currentTarget)
	const handleClose = () => setAnchorEl(null)

	const onLogout = () => logOut()

	return (
		<Box>
			<IconButton onClick={handleClick}>
				<Avatar sx={{ width: 24, height: 24 }} />
			</IconButton>
			<Menu
				anchorEl={anchorEl}
				id="account-menu"
				open={open}
				onClose={handleClose}
				PaperProps={{
					elevation: 24,
					className: 'drop-shadow-2xl',
				}}
			>
				<Link to="/account">
					<MenuItem>
						<ListItemIcon>
							<Settings fontSize="small" />
						</ListItemIcon>
						Settings
					</MenuItem>
				</Link>
				<Link to="/login">
					<MenuItem onClick={onLogout}>
						<ListItemIcon>
							<Logout fontSize="small" />
						</ListItemIcon>
						Logout
					</MenuItem>
				</Link>
			</Menu>
		</Box>
	)
}
