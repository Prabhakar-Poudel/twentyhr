import { LinearScale } from '@mui/icons-material'
import { Box } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import * as monaco from 'monaco-editor'
import { loader } from '@monaco-editor/react'
import { useParams } from 'react-router'
import InterviewHeader from 'src/components/app/interview/interviewHeader/InterviewHeader'
import InterviewBody from 'src/components/app/interview/interviewBody/InterviewBody'
import InterviewFooter from 'src/components/app/interview/interviewFooter/InterviewFooter'
import { useAuth } from 'src/contexts/AuthContext'
import { axios } from 'src/lib/axios/axios'
import { ActiveUser, formatActiveUsers, getSelectionData, setCursor, setSelection } from 'src/pages/interview/helpers'
import { PAYLOAD_TYPES } from 'src/pages/interview/payloads'
import NotFoundPage from 'src/pages/NotFoundPage'
import { useInterviewShow } from 'src/queries/Interviews'
import { QuestionShow } from 'src/types/question'
import InterviewRightDrawer from 'src/components/app/interview/interviewBody/InterviewRightDrawer'
import RightDrawerToggle from 'src/components/app/interview/interviewBody/RightDrawerToggle'
import { connectToInterview } from 'src/websockets/channels/interviewChannel'
import { CONSUMER } from 'src/websockets/consumer'

function InterviewPage() {
  const { id } = useParams()
  const { data: interview, isLoading } = useInterviewShow(id!)
  const [language, setLanguage] = useState('')
  const [code, setCode] = useState('')
  const [question, setQuestion] = useState<QuestionShow>()
  const [showDrawer, setShowDrawer] = useState(true)
  const [focusTerminal, setFocusTerminal] = useState(false)
  const [activeUsers, setActiveUsers] = useState<ActiveUser[]>([])
  const [subscription, setSubscription] = useState<ActionCable.Channel>()
  const { user } = useAuth()

  useEffect(() => {
    loader.config({ monaco })
  }, [])

  useEffect(() => {
    if (interview) {
      setSubscription(connectToInterview(interview.id, onChannelData))
      if (interview.question) changeQuestion(interview.question.id)

      return () => {
        subscription?.unsubscribe()
        CONSUMER.disconnect()
      }
    }
  }, [interview])

  const changeQuestion = async (questionId: string) => {
    const question = await axios.get<QuestionShow>(`/questions/${questionId}`).then(({ data }) => data)
    setQuestion(question)
    setLanguage(question.language!)
    setCode(question.initial_code ?? '')
  }

  const onCursorChange = (event: monaco.editor.ICursorPositionChangedEvent) => {
    subscription?.send({ type: PAYLOAD_TYPES.CURSOR_CHANGED,  data: {  position: event.position, user: user!.id }  })
  }

  const onSelectionChange = (event: monaco.editor.ICursorSelectionChangedEvent) => {
    subscription?.send({ type: PAYLOAD_TYPES.SELECTION_CHANGED, data: getSelectionData(event.selection, user!) })
  }

  const onChannelData = (payload: any) => {
    switch (payload.type) {
      case PAYLOAD_TYPES.CURSOR_CHANGED: {
        if(user?.id !== payload.data.user) {
          setActiveUsers((activeUsers) => setCursor(activeUsers, payload.data))
        }
        break
      }
      case PAYLOAD_TYPES.SELECTION_CHANGED: {
        if(user?.id !== payload.data.user) {
          setActiveUsers((activeUsers) => setSelection(activeUsers, payload.data))
        }
        break
      }
      case PAYLOAD_TYPES.ACTIVE_USERS: {
        setActiveUsers((activeUsers) => formatActiveUsers(activeUsers, payload.data))
        break
      }
      case PAYLOAD_TYPES.INTERVIEW_ENDED: {
        console.log(PAYLOAD_TYPES.INTERVIEW_ENDED, payload)
        break
      }
      default: {
        console.log('Received: ', payload)
      }
    }
  }

  const onDrawerToggle = () => setShowDrawer(!showDrawer)
  const terminalContent = 'Hello from \x1B[1;3;31mxterm.js\x1B[0m $ '

  const onCodeExecute = useCallback(() => {
    setShowDrawer(true)
    setFocusTerminal(true)
    setTimeout(() => setFocusTerminal(false), 1000)
  }, [])

  if (isLoading || !subscription) return <LinearScale />
  if (!isLoading && !interview) return <NotFoundPage />

  return (
    <Box className="flex flex-col h-screen w-screen">
      <Box className="flex flex-col grow">
        <InterviewHeader interview={interview} currentQuestion={question} onChangeQuestion={changeQuestion} />
        <InterviewBody
          defaultValue={code}
          language={language}
          setLanguage={setLanguage}
          onCodeExecute={onCodeExecute}
          onCursorChange={onCursorChange}
          onSelectionChange={onSelectionChange}
          activeUsers={activeUsers}
        />
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
      <InterviewFooter activeUsers={activeUsers} />
    </Box>
  )
}

export default InterviewPage
