import { Link } from 'react-router-dom'
import logo from 'src/assets/logos/logo192.png'

const HomeLogo = () =>
  <Link to="/">
    <img src={logo} alt="logo" className="w-7 h-7" />
  </Link>

export default HomeLogo
