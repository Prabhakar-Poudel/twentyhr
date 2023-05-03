import { Box, IconButton, Tooltip } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

interface Props {
  onClick: (event: any) => void
  open: boolean
}

const RightDrawerToggle = ({ onClick, open }: Props) => {
  const tooltip = open ? 'Close right panel' : 'Open right panel'
  const bgColor = open ? 'bg-zinc-800' : 'bg-zinc-900'

  return (
    <Box className={`mt-2 z-[1300] fixed top-0 right-0 rounded-l-3xl ${bgColor}`}>
      <Tooltip arrow title={tooltip}>
        <IconButton
          aria-label="toggle right panel"
          color="secondary"
          disableRipple
          onClick={onClick}
          size="small"
          sx={{ paddingLeft: '0.5rem' }}
        >
          {open ? <ArrowForwardIosIcon /> : <ArrowBackIosIcon />}
        </IconButton>
      </Tooltip>
    </Box>
  )
}

export default RightDrawerToggle
