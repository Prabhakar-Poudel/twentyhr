import { LinearScale } from '@mui/icons-material'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import * as monaco from 'monaco-editor'
import { loader } from '@monaco-editor/react'
import { useParams } from 'react-router'
import InterviewHeader from 'src/components/app/interview/interviewHeader/InterviewHeader'
import InterviewBody from 'src/components/app/interview/interviewBody/InterviewBody'
import InterviewFooter from 'src/components/app/interview/interviewFooter/InterviewFooter'
import { axios } from 'src/lib/axios/axios'
import { useInterviewShow } from 'src/queries/Interviews'
import { QuestionShow } from 'src/types/question'
import InterviewRightDrawer from 'src/components/app/interview/interviewBody/InterviewRightDrawer'
import RightDrawerToggle from 'src/components/app/interview/interviewBody/RightDrawerToggle'

const InterviewPage = () => {
  const { id } = useParams()
  const { data: interview, isLoading  } = useInterviewShow(id!)
  const [language, setLanguage] = useState<string>('')
  const [code, setCode] = useState<string>()
  const [question, setQuestion] = useState<QuestionShow>()
  const [showDrawer, setShowDrawer] = useState(true)
  const [focusTerminal, setFocusTerminal] = useState(false)

  useEffect(() => {
    loader.config({ monaco })
  }, [])

  useEffect(() => {
    if (interview?.question) changeQuestion(interview.question.id)
  }, [interview])

  const changeQuestion = async (questionId: string) => {
    const question = await axios.get<QuestionShow>(`/questions/${questionId}`).then(({ data }) => data)
    console.log(question)
    setQuestion(question)
    setLanguage(question.language!)
    setCode(question.initial_code)
  }

  const onDrawerToggle = () => setShowDrawer(!showDrawer)
  const terminalContent = 'Hello from \x1B[1;3;31mxterm.js\x1B[0m $ '

  const onCodeExecute = () => {
    setShowDrawer(true)
    setFocusTerminal(true)
    setTimeout(() => setFocusTerminal(false), 1000)
  }

  if(isLoading) return <LinearScale />
  if(!isLoading && !interview) return <div>Interview not found</div>

  return (
    <Box className="flex flex-col h-screen w-screen">
      <Box className="flex flex-col grow">
        <InterviewHeader interview={interview} currentQuestion={question} onChangeQuestion={changeQuestion} />
        <InterviewBody defaultValue={code} language={language} setLanguage={setLanguage} onCodeExecute={onCodeExecute} />
      </Box>
      <RightDrawerToggle open={showDrawer} onClick={onDrawerToggle} />
      {question && (
        <InterviewRightDrawer
          open={showDrawer}
          instructions={question.instruction}
          guidelines={question.guidelines}
          terminalContent={terminalContent}
          focusTerminal={focusTerminal}
        />
      )}
      <InterviewFooter />
    </Box>
  )
}

export default InterviewPage
