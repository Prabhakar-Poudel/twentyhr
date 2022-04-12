import Button from '@mui/material/Button'

interface EditorStickyProps {
  onClick: (event: any) => void
}

const EditorSticky = ({ onClick }: EditorStickyProps) => {
  return (
    <div className="bg-stone-800 w-6 py-10 z-1200">
      <Button variant="text" aria-label="open drawer" onClick={onClick} className="rotate-90 -translate-x-5" color="secondary" disableRipple disableElevation>Open</Button>
    </div>
  )
}

export default EditorSticky
