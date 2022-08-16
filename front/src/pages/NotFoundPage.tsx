import { Box, Paper, Typography } from '@mui/material'
import pageNotFoundImage from 'src/assets/svg/pageNotFound.svg'
import HomeLogo from 'src/components/app/appHeader/HomeLogo'

interface Props {
  title?: string
}

const NotFoundPage = ({ title }: Props) => {
  const note = title || 'The page you are looking for does not exist'

  return (
    <Paper square className="h-screen w-screen flex flex-wrap md:flex-nowrap">
      <Box className="m-auto grid place-content-center">
        <HomeLogo withText />
        <img src={pageNotFoundImage} alt="login" className="h-full" />
        <Typography variant="h5" align="center">
          {note}
        </Typography>
      </Box>
    </Paper>
  )
}

export default NotFoundPage
