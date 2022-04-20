import { AppBar, Toolbar } from "@mui/material"
import { Link } from "react-router-dom"
import logo from "src/assets/logos/logo192.png"

const AppHeader = () => {
  return (
    <AppBar position="relative">
      <Toolbar variant="dense">
        <Link to="/">
          <img src={logo} alt="logo" className="w-7 h-7" />
        </Link>
      </Toolbar>
    </AppBar>
  )
}

export default AppHeader
