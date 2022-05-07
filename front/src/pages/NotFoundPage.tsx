import {  Container, Paper, Typography } from '@mui/material'
import pageNotFoundImage from 'src/assets/svg/pageNotFound.svg'

const NotFoundPage = () => {
  return (
    <Paper square className="h-screen w-screen flex flex-wrap md:flex-nowrap">
      <Container className="!grid place-content-center">
        <img src={pageNotFoundImage} alt="login" className="h-full" />
        <Typography variant="h5" align="center">The page you are looking for does not exist</Typography>
      </Container>
    </Paper>
  )
}

export default NotFoundPage
