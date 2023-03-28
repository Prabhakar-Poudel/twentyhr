import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types'
import { Box, LinearProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import * as monaco from 'monaco-editor'
import { loader } from '@monaco-editor/react'
import InterviewHeader from 'src/components/app/interview/interviewHeader/InterviewHeader'
import CodeEditor from 'src/components/app/interview/interviewBody/CodeEditor'
import InterviewFooter from 'src/components/app/interview/interviewFooter/InterviewFooter'
import { Pointer, SelectedElements } from 'src/components/shared/DrawInput'
import { axios } from 'src/lib/axios/axios'
import NotFoundPage from 'src/pages/NotFoundPage'
import { updateInterview, useInterviewShow } from 'src/queries/Interviews'
import { InterviewStatuses } from 'src/types/interview'
import { QuestionShow } from 'src/types/question'
import InterviewRightDrawer from 'src/components/app/interview/interviewBody/rightDrawer/InterviewRightDrawer'
import RightDrawerToggle from 'src/components/app/interview/interviewBody/rightDrawer/RightDrawerToggle'
import { connectToInterview } from 'src/websockets/channels/interviewChannel'
import { CONSUMER } from 'src/websockets/consumer'
import { IBufferRange } from 'xterm'
import { User } from 'src/types/user'
import { runCode } from './codeRunner'
import {
  ActiveUser,
  formatActiveUsers,
  getSelectionData,
  setCursor,
  setPointer,
  setSelection,
  setTerminalSelection,
} from './helpers'
import { PAYLOAD_TYPES } from './payloads'

interface Params {
  id: string
  user: User
  onEndInterview(): void
}

const Interview = ({ id, user, onEndInterview }: Params) => {
  const { data: interview, isLoading, invalidateInterview, refetch } = useInterviewShow(id)
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
  const [terminalContent, setTerminalContent] = useState('\x1b[1;33m Your program output will appear here.\x1b[0m\n')
  const isOwner = !!user.email

  const closeSocket = () => {
    subscription?.unsubscribe()
    CONSUMER.disconnect()
  }

  const beginInterview = () => {
    if (interview.status !== InterviewStatuses.started) return

    CONSUMER.connect()
    setSubscription(connectToInterview(interview.id, onChannelData))
  }

  const onBeginInterview = async () => {
    await updateInterview(id, { status: InterviewStatuses.started })
    await refetch()
  }

  useEffect(() => {
    loader.config({ monaco })
  }, [])

  useEffect(() => {
    if (!interview) return

    beginInterview()
    setTitle(interview.title)
    setStatus(interview.status)
    setLanguage(interview.language ?? interview.question?.language ?? '')
    setQuestion(interview.question)
    setCode(interview.code)
    setDrawingElements(interview.drawing ?? [])

    return closeSocket
  }, [interview])

  const onTitleChanged = (title: string) => {
    setTitle(title)
    if (status === InterviewStatuses.started) {
      subscription?.send({ type: PAYLOAD_TYPES.TITLE_CHANGED, data: { title, user: user.id } })
    } else {
      updateInterview(id, { title })
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
    subscription?.send({ type: PAYLOAD_TYPES.QUESTION_CHANGED, data: { question: questionId, user: user.id } })
  }

  const onLanguageChange = (language: string) => {
    setLanguage(language)
    subscription?.send({ type: PAYLOAD_TYPES.LANGUAGE_CHANGED, data: { language, user: user.id } })
  }

  const onCursorChange = (event: monaco.editor.ICursorPositionChangedEvent) => {
    subscription?.send({
      type: PAYLOAD_TYPES.CURSOR_CHANGED,
      data: { position: event.position, user: user.id },
    })
  }

  const onSelectionChange = (event: monaco.editor.ICursorSelectionChangedEvent) => {
    subscription?.send({ type: PAYLOAD_TYPES.SELECTION_CHANGED, data: getSelectionData(event.selection, user) })
  }

  const onCodeChange = (newCode: string) => {
    subscription?.send({ type: PAYLOAD_TYPES.CODE_UPDATED, data: { code: newCode, user: user.id } })
  }

  const onTerminalSelectionChange = (selection?: IBufferRange) => {
    subscription?.send({ type: PAYLOAD_TYPES.TERMINAL_SELECTION_CHANGED, data: { selection, user: user.id } })
  }

  const onDrawPointerChange = (pointer: Pointer, button: string, selectedElementIds: SelectedElements) => {
    subscription?.send({
      type: PAYLOAD_TYPES.DRAW_POINTER_CHANGED,
      data: { pointer, button, selectedElementIds, user: user.id },
    })
  }

  const onDrawingElementsChange = (elements: readonly ExcalidrawElement[]) => {
    subscription?.send({ type: PAYLOAD_TYPES.DRAW_UPDATED, data: { elements, user: user.id } })
  }

  const sendTerminalUpdate = (message: string) => {
    setTerminalContent(message)
    subscription?.send({ type: PAYLOAD_TYPES.TERMINAL_UPDATE, data: { message, user: user.id } })
  }

  const handleEndInterview = () => {
    closeSocket()
    invalidateInterview()
    setStatus(InterviewStatuses.ended)
    onEndInterview()
  }

  const endInterview = () => {
    subscription?.send({ type: PAYLOAD_TYPES.INTERVIEW_ENDED, data: { user: user.id } })
  }

  const onChannelData = (payload: any) => {
    if (payload.type === PAYLOAD_TYPES.INTERVIEW_ENDED) {
      handleEndInterview()
      return
    }

    const senderIsRecipient = user.id === payload.data?.user
    if (senderIsRecipient) return

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
      case PAYLOAD_TYPES.TERMINAL_UPDATE: {
        setTerminalContent(payload.data.message)
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
    }
  }

  const onDrawerToggle = () => setShowDrawer(!showDrawer)

  const reFocusTerminal = () => {
    setShowDrawer(true)
    setFocusTerminal(true)
    setTimeout(() => setFocusTerminal(false), 1000)
  }

  const executeCodeAndSetResult = async (codeToRun: string) => {
    const lines = codeToRun.split(/\r\n|\r|\n/).length
    sendTerminalUpdate(`\x1b[1;32m${user.name} executed ${lines} lines of ${language} code\x1b[0m\n`)
    sendTerminalUpdate(await runCode(codeToRun, language))
  }

  const onCodeExecute = (codeToRun: string) => {
    reFocusTerminal()
    executeCodeAndSetResult(codeToRun)
  }

  if (!isLoading && !interview) return <NotFoundPage />
  if (isLoading || (!subscription && interview.status === InterviewStatuses.started)) return <LinearProgress />

  return (
    <Box className="h-screen w-screen">
      <Box className="h-full flex flex-col">
        {isOwner && (
          <InterviewHeader
            currentQuestion={question}
            interviewStatus={status}
            onBeginInterview={onBeginInterview}
            onQuestionChanged={onQuestionChanged}
            onTitleChanged={onTitleChanged}
            title={title}
          />
        )}
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
        <InterviewFooter
          activeUsers={activeUsers}
          interview={id}
          interviewStatus={status}
          canEdit={isOwner}
          onEndInterview={endInterview}
        />
      </Box>
      <RightDrawerToggle open={showDrawer} onClick={onDrawerToggle} />
      <InterviewRightDrawer
        activeUsers={activeUsers}
        focusTerminal={focusTerminal}
        guidelines={question?.guidelines}
        drawingElements={drawingElements}
        instructions={isOwner ? question?.instruction : ''}
        interviewStatus={status}
        onDrawChange={onDrawingElementsChange}
        onDrawPointerChange={onDrawPointerChange}
        onTerminalSelectionChange={onTerminalSelectionChange}
        open={showDrawer}
        terminalContent={terminalContent}
      />
    </Box>
  )
}

export default Interview
