import Drawer from '@mui/material/Drawer'

interface EditorDrawerProps {
  open: boolean
}

const EditorDrawer = ({ open }: EditorDrawerProps) => {
  return (
    <>
      <Drawer
        variant="persistent"
        anchor="right"
        open={open}
        sx={{
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { boxSizing: 'border-box' },
        }}
      >
        This is the drawer and it belongs here
      </Drawer>
    </>
  )
}

export default EditorDrawer
