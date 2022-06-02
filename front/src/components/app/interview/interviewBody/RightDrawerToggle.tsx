import { Box, IconButton } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

interface Props {
  onClick: (event: any) => void
  open: boolean
}

const RightDrawerToggle = ({ onClick, open }: Props) => {
  return (
    <Box className="mt-2 z-[1300] absolute right-0">
      <IconButton
        aria-label="toggle right panel"
        color="secondary"
        disableRipple
        onClick={onClick}
        size="small"
      >
        {open ? <ArrowForwardIosIcon /> : <ArrowBackIosIcon />}
      </IconButton>
    </Box>

  )
}

export default RightDrawerToggle
