import MonacoEditor, { Monaco, OnMount } from '@monaco-editor/react'
import { Box, SelectChangeEvent, Skeleton } from '@mui/material'
import * as monaco from 'monaco-editor'
import { useCallback, useEffect, useRef, useState } from 'react'
import EditorHeader from 'src/components/app/interview/interviewBody/ide/EditorHeader'
import defaultEditorOptions, { SUPPORTED_LANGUAGES } from 'src/config/editorConfig'
import { ActiveUser } from 'src/pages/interview/helpers'
import { InterviewStatuses } from 'src/types/interview'

interface InterviewBodyProps {
  activeUsers: ActiveUser[]
  code: string
  interviewStatus: string
  language: string
  onCodeChange: (code: string) => void
  onCodeExecute: (code: string) => void
  onCursorChange: (event: monaco.editor.ICursorPositionChangedEvent) => void
  onSelectionChange: (event: monaco.editor.ICursorSelectionChangedEvent) => void
  setLanguage: (language: string) => void
}

function LoadingEditor() {
  return <Skeleton animation="wave" width="100%" height="100%" variant="rectangular" sx={{ bgcolor: 'grey.900' }} />
}

const CodeEditor = ({
  activeUsers,
  code,
  interviewStatus,
  language,
  onCodeChange,
  onCodeExecute,
  onCursorChange,
  onSelectionChange,
  setLanguage,
}: InterviewBodyProps) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>()
  const monacoRef = useRef<Monaco>()
  const [rendered, setRendered] = useState(false)
  const [fontSize, setFontSize] = useState(defaultEditorOptions.fontSize)
  const [theme, setTheme] = useState('vs-dark')
  const [availableLanguages, setAvailableLanguages] = useState<string[]>([])
  const [decorations, setDecorations] = useState<string[]>([])

  // @ts-expect-error
  const interviewEnded = ![InterviewStatuses.created, InterviewStatuses.started].includes(interviewStatus)

  const onFontSizeChange = (event: Event, value: number) => setFontSize(value)
  const onThemeChange = (event: SelectChangeEvent) => setTheme(event.target.value)

  const resizeHandler = useCallback(() => editorRef.current!.layout({ width: 95, height: 90 }), [editorRef.current])

  const updateAvailableLanguages = (monacoLanguages: monaco.languages.ILanguageExtensionPoint[]) => {
    const languages = monacoLanguages
      .filter((language) => SUPPORTED_LANGUAGES.includes(language.id))
      .map((language) => language.id)
    setAvailableLanguages(languages)
  }

  const applyHighlight = () => {
    if (!editorRef.current) return

    const highlightsToApply = activeUsers.flatMap(({ editorHighlights }) => [
      editorHighlights.cursor,
      editorHighlights.selection,
    ])

    const newDecorations = editorRef.current.deltaDecorations(decorations, highlightsToApply)
    setDecorations(newDecorations)
  }

  useEffect(() => {
    if (!editorRef.current || rendered) return
    window.addEventListener('resize', resizeHandler)
    updateAvailableLanguages(monacoRef.current!.languages.getLanguages())
    setRendered(true)
    return () => window.removeEventListener('resize', resizeHandler)
  }, [editorRef.current, monacoRef.current, rendered, resizeHandler])

  useEffect(() => {
    if (!editorRef.current) return

    editorRef.current.setValue(code)
    applyHighlight()
  }, [code, editorRef.current])

  useEffect(() => {
    applyHighlight()
  }, [editorRef.current, activeUsers])

  const onMount: OnMount = (editor, monaco) => {
    editor.focus()
    editor.onDidChangeCursorPosition((event) => {
      if (event.reason === 1) return // setValue was called
      onCursorChange(event)
    })
    editor.onDidChangeCursorSelection((event) => {
      if (event.reason === 1) return // setValue was called
      onSelectionChange(event)
    })
    editor.onDidAttemptReadOnlyEdit(() => {
      const messageContribution = editor.getContribution('editor.contrib.messageController')
      // @ts-expect-error
      messageContribution.showMessage('This interview has ended', editor.getPosition())
    })
    editorRef.current = editor
    monacoRef.current = monaco
  }

  // @ts-expect-error
  const onChange = (value?: string, event: monaco.editor.IModelContentChangedEvent) => {
    if (event.isFlush) return
    onCodeChange(value || '')
  }

  const jumpToUser = (user: ActiveUser) => {
    const lineNumber = user.editorHighlights.cursor.range.endLineNumber
    editorRef.current!.revealLineInCenter(lineNumber)
  }

  const executeCode = () => {
    if (editorRef.current) onCodeExecute(editorRef.current.getValue())
  }

  return (
    <Box className="grow flex flex-col">
      <EditorHeader
        activeUsers={activeUsers}
        availableLanguages={availableLanguages}
        currentLanguage={language}
        fontSize={fontSize}
        interviewStatus={interviewStatus}
        onCodeExecute={executeCode}
        onJumpToUser={jumpToUser}
        setFontSize={onFontSizeChange}
        setLanguage={setLanguage}
        setTheme={onThemeChange}
        theme={theme}
      />
      <MonacoEditor
        language={language}
        loading={<LoadingEditor />}
        onChange={onChange}
        onMount={onMount}
        options={{ ...defaultEditorOptions, fontSize, readOnly: interviewEnded }}
        theme={theme}
      />
    </Box>
  )
}

export default CodeEditor
