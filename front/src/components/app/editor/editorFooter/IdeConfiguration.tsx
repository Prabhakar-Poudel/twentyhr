import IconButton from '@mui/material/IconButton'
import Popover from '@mui/material/Popover'
import GearIcon from '@mui/icons-material/Settings'
import { useState, MouseEvent } from 'react'
import { Box } from '@mui/material'
import ConfigurationPopup, { IdeConfigurationProps } from 'src/components/app/editor/editorFooter/ConfigurationPopup'

const IdeConfiguration = (props: IdeConfigurationProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)
  const showConfiguration = Boolean(anchorEl)

  return (
    <Box>
      <IconButton color="primary" aria-label="configure IDE" onClick={handleOpen}>
        <GearIcon />
      </IconButton>
      <Popover
        id="ide-configuration"
        open={showConfiguration}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <ConfigurationPopup {...props} />
      </Popover>
    </Box>
  )
}

export default IdeConfiguration
