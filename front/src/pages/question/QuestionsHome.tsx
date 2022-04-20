import { Box } from "@mui/material"
import AppHeader from "src/components/app/appHeader/AppHeader"
import QuestionsTable from "src/components/app/questions/QuestionsTable"

const QuestionsHome = () => {
  return (
    <Box>
      <AppHeader />
      <QuestionsTable />
    </Box>
  )
}

export default QuestionsHome
