import { RadioButtonChecked } from '@mui/icons-material'
import { ListItemIcon, ListItemText, MenuItem, MenuList, Paper } from '@mui/material'

const MoreActionMenu = () => {
  return (
    <Paper elevation={24} sx={{ minWidth: 275 }}>
      <MenuList>
        <MenuItem className="gap-5">
          <ListItemIcon>
            <RadioButtonChecked />
          </ListItemIcon>
          <ListItemText>Record interview</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  )
}

export default MoreActionMenu
