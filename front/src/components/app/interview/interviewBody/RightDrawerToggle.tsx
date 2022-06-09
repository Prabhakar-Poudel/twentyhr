import { Box, IconButton, Tooltip } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

interface Props {
  onClick: (event: any) => void
  open: boolean
}

function RightDrawerToggle({ onClick, open }: Props) {
  const tooltip = open ? 'Close right panel' : 'Open right panel'
  return (
    <Box className="mt-2 z-[1300] absolute right-0">
      <Tooltip arrow title={tooltip}>
        <IconButton aria-label="toggle right panel" color="secondary" disableRipple onClick={onClick} size="small">
          {open ? <ArrowForwardIosIcon /> : <ArrowBackIosIcon />}
        </IconButton>
      </Tooltip>
    </Box>
  )
}

export default RightDrawerToggle
