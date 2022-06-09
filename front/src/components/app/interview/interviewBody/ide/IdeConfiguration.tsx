import { Tooltip } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Popover from '@mui/material/Popover'
import GearIcon from '@mui/icons-material/Settings'
import { useState, MouseEvent } from 'react'
import ConfigurationPopup, {
  IdeConfigurationProps,
} from 'src/components/app/interview/interviewBody/ide/ConfigurationPopup'

function IdeConfiguration(props: IdeConfigurationProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)
  const showConfiguration = Boolean(anchorEl)

  return (
    <>
      <Tooltip arrow title="Configure Editor">
        <IconButton aria-label="configure IDE" onClick={handleOpen}>
          <GearIcon />
        </IconButton>
      </Tooltip>
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        id="ide-configuration"
        onClose={handleClose}
        open={showConfiguration}
      >
        <ConfigurationPopup {...props} />
      </Popover>
    </>
  )
}

export default IdeConfiguration
