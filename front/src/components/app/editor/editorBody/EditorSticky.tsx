import { IconButton, Paper } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

interface EditorStickyProps {
  onClick: (event: any) => void
  open: boolean
}

const EditorSticky = ({ onClick, open }: EditorStickyProps) => {
  return (
    <Paper square elevation={4} className="w-6 h-screen p-0 pt-10 z-[1300] relative">
      <IconButton aria-label="open drawer" color="secondary" onClick={onClick} disableRipple className="!p-0">
        {open ? <ArrowForwardIosIcon /> : <ArrowBackIosIcon />}
      </IconButton>
    </Paper>
  )
}

export default EditorSticky
