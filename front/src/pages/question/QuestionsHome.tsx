import { Container, Typography } from '@mui/material'
import { Outlet } from 'react-router-dom'
import AppHeader from 'src/components/app/appHeader/AppHeader'
import QuestionsTable from "src/components/app/questions/QuestionsTable"
import { useQuestionsIndex } from 'src/queries/Questions'

const QuestionsHome = () => {
  const { data, isLoading } = useQuestionsIndex()

  if (isLoading) return null

  return (
    <>
      <AppHeader />
      <Container >
        <Typography component="h1" variant="h2">Questions</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Here you can manage and view questions
        </Typography>
        <QuestionsTable rows={data} />
        <Outlet />
      </Container>
    </>
  )
}

export default QuestionsHome
