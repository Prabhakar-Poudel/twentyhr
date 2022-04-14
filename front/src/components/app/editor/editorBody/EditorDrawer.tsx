import Drawer from '@mui/material/Drawer'

interface EditorDrawerProps {
  open: boolean
}

const EditorDrawer = ({ open }: EditorDrawerProps) => {
  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={open}
      sx={{
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { boxSizing: 'border-box' },
      }}
    >
      <div className="p-4 pr-8">
        This is the drawer and it belongs here
      </div>
    </Drawer>
  )
}

export default EditorDrawer
