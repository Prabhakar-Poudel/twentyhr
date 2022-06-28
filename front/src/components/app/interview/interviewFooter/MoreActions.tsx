import { MoreVert } from '@mui/icons-material'
import { IconButton, Menu, Tooltip } from '@mui/material'
import { MouseEvent, useState } from 'react'
import MoreActionMenu from 'src/components/app/interview/interviewFooter/MoreActionMenu'

const MoreActions = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)
  const openMoreActions = Boolean(anchorEl)

  return (
    <>
      <Tooltip arrow title="Options">
        <IconButton aria-label="Options" onClick={handleOpen}>
          <MoreVert />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        id="interview-options"
        onClose={handleClose}
        open={openMoreActions}
      >
        <MoreActionMenu />
      </Menu>
    </>
  )
}

export default MoreActions
