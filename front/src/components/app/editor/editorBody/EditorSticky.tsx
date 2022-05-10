import { Paper } from '@mui/material'
import Button from '@mui/material/Button'

interface EditorStickyProps {
  onClick: (event: any) => void
}

const EditorSticky = ({ onClick }: EditorStickyProps) => {
  return (
    <Paper square elevation={4} className="w-8 h-screen p-0 pt-20 z-[1300] relative">
      <Button variant="text" size="small" aria-label="open drawer" onClick={onClick} className="!p-0 rotate-90 -translate-x-5" color="secondary" disableRipple disableElevation>Terminal</Button>
    </Paper>
  )
}

export default EditorSticky
