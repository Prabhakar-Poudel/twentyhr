import { Container, Typography } from '@mui/material'
import { Outlet } from 'react-router-dom'
import AppHeader from 'src/components/app/appHeader/AppHeader'
import InterviewsTable from 'src/components/app/interviews/InterviewsTable'
import { useInterviewsIndex } from 'src/queries/Interviews'

function InterviewsHome() {
  const { data, isLoading } = useInterviewsIndex()

  if (isLoading) return null

  return (
    <>
      <AppHeader />
      <Container>
        <Typography component="h1" variant="h2">
          Interviews
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Here you can manage and view interviews
        </Typography>
        <InterviewsTable rows={data} />
        <Outlet />
      </Container>
    </>
  )
}

export default InterviewsHome
