import {  Container, Paper, Typography } from '@mui/material'
import pageNotFoundImage from 'src/assets/svg/pageNotFound.svg'

interface Props {
  title?: string
}

const NotFoundPage = ({ title }: Props) => {
  const note = title || "The page you are looking for does not exist"

  return (
    <Paper square className="h-screen w-screen flex flex-wrap md:flex-nowrap">
      <Container className="!grid place-content-center">
        <img src={pageNotFoundImage} alt="login" className="h-full" />
        <Typography variant="h5" align="center">{note}</Typography>
      </Container>
    </Paper>
  )
}

export default NotFoundPage
