import IconButton from '@mui/material/IconButton'
import Popover from '@mui/material/Popover'
import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'
import GearIcon from '@mui/icons-material/Settings'
import { useState } from 'react'
import { Paper } from '@mui/material'

interface IdeConfigurationProps {
  fontSize: number
  setFontSize: (event: any) => void
}

const IdeConfiguration = ({ fontSize, setFontSize }: IdeConfigurationProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)
  const showConfiguration = Boolean(anchorEl)

  return (
    <div>
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
        <Paper elevation={24} sx={{ minWidth: 275, padding: 2 }}>
          <Typography id="font-size-label">Font size</Typography>
          <Slider
            aria-labelledby="font-size-label"
            size="small"
            min={6}
            max={26}
            color="secondary"
            value={fontSize}
            aria-label="Small"
            valueLabelDisplay="auto"
            onChange={setFontSize}
          />
        </Paper>
      </Popover>
    </div>
  )
}

export default IdeConfiguration
