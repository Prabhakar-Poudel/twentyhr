import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import IconButton from '@mui/material/IconButton'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import { MouseEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AccountMenu() {
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
	const open = Boolean(anchorEl)

	const handleClick = (event: MouseEvent<HTMLElement>) =>
		setAnchorEl(event.currentTarget)
	const handleClose = () => setAnchorEl(null)

	const navigate = useNavigate()
	const onLogout = () => {
		navigate('/login')
	}

	return (
		<>
			<IconButton onClick={handleClick}>
				<Avatar sx={{ width: 32, height: 32 }} />
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
				<MenuItem>
					<ListItemIcon>
						<Settings fontSize="small" />
					</ListItemIcon>
					Settings
				</MenuItem>
				<MenuItem onClick={onLogout}>
					<ListItemIcon>
						<Logout fontSize="small" />
					</ListItemIcon>
					Logout
				</MenuItem>
			</Menu>
		</>
	)
}
