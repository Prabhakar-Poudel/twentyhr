import { ExcalidrawElement } from '@excalidraw/excalidraw-next/types/element/types'
import { Box, LinearProgress } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import * as monaco from 'monaco-editor'
import { loader } from '@monaco-editor/react'
import { useParams } from 'react-router'
import InterviewHeader from 'src/components/app/interview/interviewHeader/InterviewHeader'
import CodeEditor from 'src/components/app/interview/interviewBody/CodeEditor'
import InterviewFooter from 'src/components/app/interview/interviewFooter/InterviewFooter'
import { Pointer, SelectedElements } from 'src/components/shared/DrawInput'
import { useAuth } from 'src/contexts/AuthContext'
import { axios } from 'src/lib/axios/axios'
import {
  ActiveUser,
  formatActiveUsers,
  getSelectionData,
  setCursor,
  setPointer,
  setSelection, setTerminalSelection, TerminalSelection
} from 'src/pages/interview/helpers'
import { PAYLOAD_TYPES } from 'src/pages/interview/payloads'
import NotFoundPage from 'src/pages/NotFoundPage'
import { updateInterview, useInterviewShow } from 'src/queries/Interviews'
import { InterviewStatuses } from 'src/types/interview'
import { QuestionShow } from 'src/types/question'
import InterviewRightDrawer from 'src/components/app/interview/interviewBody/InterviewRightDrawer'
import RightDrawerToggle from 'src/components/app/interview/interviewBody/RightDrawerToggle'
import { connectToInterview } from 'src/websockets/channels/interviewChannel'
import { CONSUMER } from 'src/websockets/consumer'

function InterviewPage() {
  const { id } = useParams()
  const { data: interview, isLoading, invalidateInterview } = useInterviewShow(id!)
  const [language, setLanguage] = useState('')
  const [code, setCode] = useState('')
  const [drawingElements, setDrawingElements] = useState<ExcalidrawElement[]>([])
  const [question, setQuestion] = useState<QuestionShow>()
  const [showDrawer, setShowDrawer] = useState(true)
  const [focusTerminal, setFocusTerminal] = useState(false)
  const [activeUsers, setActiveUsers] = useState<ActiveUser[]>([])
  const [subscription, setSubscription] = useState<ActionCable.Channel>()
  const [title, setTitle] = useState('')
  const [status, setStatus] = useState('')
  const { user } = useAuth()

  const closeSocket = () => {
    subscription?.unsubscribe()
    CONSUMER.disconnect()
  }

  const beginInterview = () => {
    if (interview.status !== InterviewStatuses.started) return

    CONSUMER.connect()
    setSubscription(connectToInterview(interview.id, onChannelData))
  }

  const onBeginInterview = () => {
    updateInterview(id!, { status: InterviewStatuses.started })
  }

  useEffect(() => {
    loader.config({ monaco })
  }, [])

  useEffect(() => {
    if (!interview) return

    beginInterview()
    setTitle(interview.title)
    setStatus(interview.status)

    if (interview.question) changeQuestion(interview.question.id, interview.code, interview.drawing)

    return closeSocket
  }, [interview])

  const onTitleChanged = (title: string) => {
    setTitle(title)
    if (status === InterviewStatuses.started) {
      subscription?.send({ type: PAYLOAD_TYPES.TITLE_CHANGED,  data: {  title, user: user!.id }  })
    } else {
      updateInterview(id!, { title })
    }
  }

  const changeQuestion = async (questionId: string, initialCode?: string, drawing?: ExcalidrawElement[]) => {
    const question = await axios.get<QuestionShow>(`/questions/${questionId}`).then(({ data }) => data)
    setQuestion(question)
    setLanguage(question.language!)
    setCode(initialCode ?? question.initial_code ?? '')
    if (drawing) setDrawingElements(drawing)
  }

  const onQuestionChanged = async (questionId: string) => {
    await changeQuestion(questionId)
    subscription?.send({ type: PAYLOAD_TYPES.QUESTION_CHANGED,  data: {  question: questionId, user: user!.id }  })
  }

  const onLanguageChange = (language: string) => {
    setLanguage(language)
    subscription?.send({ type: PAYLOAD_TYPES.LANGUAGE_CHANGED,  data: {  language, user: user!.id }  })
  }

  const onCursorChange = (event: monaco.editor.ICursorPositionChangedEvent) => {
    subscription?.send({ type: PAYLOAD_TYPES.CURSOR_CHANGED,  data: {  position: event.position, user: user!.id }  })
  }

  const onSelectionChange = (event: monaco.editor.ICursorSelectionChangedEvent) => {
    subscription?.send({ type: PAYLOAD_TYPES.SELECTION_CHANGED, data: getSelectionData(event.selection, user!) })
  }

  const onCodeChange = (newCode: string) => {
    subscription?.send({ type: PAYLOAD_TYPES.CODE_UPDATED, data: { code: newCode, user: user!.id } })
  }

  const onTerminalSelectionChange = (selection?: TerminalSelection) => {
    subscription?.send({ type: PAYLOAD_TYPES.TERMINAL_SELECTION_CHANGED, data: { selection, user: user!.id } })
  }

  const onDrawPointerChange = (pointer: Pointer, button: string, selectedElementIds: SelectedElements) => {
    subscription?.send({ type: PAYLOAD_TYPES.DRAW_POINTER_CHANGED, data: { pointer, button, selectedElementIds, user: user!.id } })
  }

  const onDrawingElementsChange = (elements: readonly ExcalidrawElement[]) => {
    subscription?.send({ type: PAYLOAD_TYPES.DRAW_UPDATED, data: { elements, user: user!.id } })
  }

  const onEndInterview = () => {
    subscription?.send({ type: PAYLOAD_TYPES.INTERVIEW_ENDED, data: { user: user!.id } })
  }

  const onChannelData = (payload: any) => {
    if (user?.id === payload.data?.user && ![PAYLOAD_TYPES.DRAW_UPDATED, PAYLOAD_TYPES.INTERVIEW_ENDED].includes(payload.type)) return

    switch (payload.type) {
      case PAYLOAD_TYPES.CURSOR_CHANGED: {
        setActiveUsers((activeUsers) => setCursor(activeUsers, payload.data))
        break
      }
      case PAYLOAD_TYPES.CODE_UPDATED: {
        setCode(payload.data.code)
        break
      }
      case PAYLOAD_TYPES.SELECTION_CHANGED: {
        setActiveUsers((activeUsers) => setSelection(activeUsers, payload.data))
        break
      }
      case PAYLOAD_TYPES.DRAW_POINTER_CHANGED: {
        setActiveUsers((activeUsers) => setPointer(activeUsers, payload.data))
        break
      }
      case PAYLOAD_TYPES.DRAW_UPDATED: {
        setDrawingElements(payload.data.elements)
        break
      }
      case PAYLOAD_TYPES.TERMINAL_SELECTION_CHANGED: {
        setActiveUsers((activeUsers) => setTerminalSelection(activeUsers, payload.data))
        break
      }
      case PAYLOAD_TYPES.ACTIVE_USERS: {
        setActiveUsers((activeUsers) => formatActiveUsers(activeUsers, payload.data))
        break
      }
      case PAYLOAD_TYPES.TITLE_CHANGED: {
        setTitle(payload.data.title)
        break
      }
      case PAYLOAD_TYPES.QUESTION_CHANGED: {
        changeQuestion(payload.data.question)
        break
      }
      case PAYLOAD_TYPES.LANGUAGE_CHANGED: {
        setLanguage(payload.data.language)
        break
      }
      case PAYLOAD_TYPES.INTERVIEW_ENDED: {
        closeSocket()
        invalidateInterview()
        setStatus(InterviewStatuses.ended)
        break
      }
    }
  }

  const onDrawerToggle = () => setShowDrawer(!showDrawer)
  const terminalContent = 'www.google.com'.repeat(100)

  const onCodeExecute = useCallback(() => {
    setShowDrawer(true)
    setFocusTerminal(true)
    setTimeout(() => setFocusTerminal(false), 1000)
  }, [])

  if (isLoading || (!subscription && interview.status === InterviewStatuses.started)) return <LinearProgress />
  if (!isLoading && !interview) return <NotFoundPage />

  return (
    <Box className="flex flex-col h-screen w-screen">
      <Box className="flex flex-col grow">
        <InterviewHeader
          currentQuestion={question}
          interviewStatus={status}
          onBeginInterview={onBeginInterview}
          onQuestionChanged={onQuestionChanged}
          onTitleChanged={onTitleChanged}
          title={title}
        />
        <CodeEditor
          activeUsers={activeUsers}
          code={code}
          interviewStatus={status}
          language={language}
          onCodeChange={onCodeChange}
          onCodeExecute={onCodeExecute}
          onCursorChange={onCursorChange}
          onSelectionChange={onSelectionChange}
          setLanguage={onLanguageChange}
        />
      </Box>
      <RightDrawerToggle open={showDrawer} onClick={onDrawerToggle} />
      <InterviewRightDrawer
        activeUsers={activeUsers}
        focusTerminal={focusTerminal}
        guidelines={question?.guidelines}
        drawingElements={drawingElements}
        instructions={question?.instruction}
        interviewStatus={status}
        onDrawChange={onDrawingElementsChange}
        onDrawPointerChange={onDrawPointerChange}
        onTerminalSelectionChange={onTerminalSelectionChange}
        open={showDrawer}
        terminalContent={terminalContent}
      />
      <InterviewFooter
        activeUsers={activeUsers}
        interview={id!}
        interviewStatus={status}
        onEndInterview={onEndInterview}
      />
    </Box>
  )
}

export default InterviewPage
