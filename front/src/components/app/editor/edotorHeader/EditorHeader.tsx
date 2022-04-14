import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { Link } from 'react-router-dom'
import logo from 'src/assets/logos/logo192.png'

const EditorHeader = () => {
  return (
    <AppBar position="relative">
      <Toolbar variant="dense">
        <Link to="/landing">
          <img src={logo} alt="logo" className="w-7 h-7" />
        </Link>
      </Toolbar>
    </AppBar>
  )
}

export default EditorHeader
