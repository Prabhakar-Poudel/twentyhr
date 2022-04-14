import { Paper } from '@mui/material'
import Button from '@mui/material/Button'

interface EditorStickyProps {
  onClick: (event: any) => void
}

const EditorSticky = ({ onClick }: EditorStickyProps) => {
  return (
    <Paper square elevation={4} className="w-6 h-screen py-10 z-[1300] relative">
      <Button variant="text" size="small" aria-label="open drawer" onClick={onClick} className="p-0 rotate-90 -translate-x-5" color="secondary" disableRipple disableElevation>Open</Button>
    </Paper>
  )
}

export default EditorSticky
