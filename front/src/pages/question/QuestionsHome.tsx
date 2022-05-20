import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import AppHeader from 'src/components/app/appHeader/AppHeader'
import QuestionsTable from "src/components/app/questions/QuestionsTable"
import { useQuestionsIndex } from 'src/queries/Questions'

const QuestionsHome = () => {
  const { data, isLoading } = useQuestionsIndex()
  const navigate = useNavigate()

  if (isLoading) return null

  const onRowClick = (rowId: string) => {
    navigate(`/questions/${rowId}/edit`)
  }

  return (
    <>
      <AppHeader />
      <Box className="mt-10">
        <QuestionsTable rows={data} onRowClick={onRowClick} />
      </Box>
    </>
  )
}

export default QuestionsHome
