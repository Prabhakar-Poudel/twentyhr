import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import logo from 'src/assets/logos/logo192.png'

interface Props {
  size?: number
  withText?: boolean
}

function HomeLogo({ withText = false }: Props) {
  return (
    <Link to="/" className="bg-transparent	text-primary-color-main flex">
      <img src={logo} alt="twentyhr logo" className="h-7" />
      {withText && (
        <Typography component="span" className="pl-2">
          twentyhr.com
        </Typography>
      )}
    </Link>
  )
}

export default HomeLogo
