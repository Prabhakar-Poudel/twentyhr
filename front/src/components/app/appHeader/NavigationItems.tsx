import { Box, Button } from '@mui/material'
import { Link } from 'react-router-dom'

const NavigationItems = () => {
  return (
    <Box className="grow">
      <Link to="/questions">
        <Button color="inherit">Questions</Button>
      </Link>
      <Link to="/interviews">
        <Button color="inherit">Interviews</Button>
      </Link>
      <Link to="/account">
        <Button color="inherit">Settings</Button>
      </Link>
    </Box>
  )
}

export default NavigationItems
