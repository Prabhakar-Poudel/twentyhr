import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { LeftDrawerItemLabelType, leftDraweritems } from 'src/constants/leftDrawerItems'
import { Link } from 'react-router-dom'

interface LeftDrawerProps {
  selected: LeftDrawerItemLabelType
}

const LeftDrawer = ({ selected }: LeftDrawerProps) => {
  return (
    <Drawer
      className="w-60"
      PaperProps={{ style: { position: 'relative' }, elevation: 3, square: true }}
      variant="permanent"
    >
      <List>
        {leftDraweritems.map(({ label, Icon, path }) => (
          <ListItem key={label} disablePadding>
            <Link to={path} className="w-full">
              <ListItemButton selected={label === selected}>
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={label} className="capitalize" />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}

export default LeftDrawer
