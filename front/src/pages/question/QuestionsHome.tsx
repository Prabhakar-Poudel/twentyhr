import { Box } from '@mui/material'
import AppHeader from "src/components/app/appHeader/AppHeader"
import QuestionsTable from "src/components/app/questions/QuestionsTable"
import { useQuestionsIndex } from 'src/queries/Questions'

const QuestionsHome = () => {
  const { data, isLoading } = useQuestionsIndex()
  if (isLoading) return null

  return (
    <Box>
      <AppHeader />
      <Box className="mt-10">
        <QuestionsTable rows={data} />
      </Box>
    </Box>
  )
}

export default QuestionsHome
