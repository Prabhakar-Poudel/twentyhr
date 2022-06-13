import MonacoEditor, { Monaco, OnMount } from '@monaco-editor/react'
import { Box, SelectChangeEvent, Skeleton } from '@mui/material'
import * as monaco from 'monaco-editor'
import { useCallback, useEffect, useState } from 'react'
import EditorHeader from 'src/components/app/interview/interviewBody/ide/EditorHeader'
import defaultEditorOptions, { SUPPORTED_LANGUAGES } from 'src/config/editorConfig'
import { ActiveUser } from 'src/pages/interview/helpers'

interface InterviewBodyProps {
  defaultValue: string
  language: string
  setLanguage: (language: string) => void
  onCodeExecute: () => void
  onCursorChange: (event: monaco.editor.ICursorPositionChangedEvent) => void
  onSelectionChange: (event: monaco.editor.ICursorSelectionChangedEvent) => void
  activeUsers: ActiveUser[]
}

function LoadingEditor() {
  return <Skeleton animation="wave" width="100%" height="100%" variant="rectangular" sx={{ bgcolor: 'grey.900' }} />
}

function InterviewBody({ language, setLanguage, defaultValue, onCodeExecute, onCursorChange, onSelectionChange, activeUsers }: InterviewBodyProps) {
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null)
  const [monaco, setMonaco] = useState<Monaco | null>(null)
  const [rendered, setRendered] = useState(false)
  const [fontSize, setFontSize] = useState(defaultEditorOptions.fontSize)
  const [theme, setTheme] = useState('vs-dark')
  const [availableLanguages, setAvailableLanguages] = useState<string[]>([])
  const [decorations, setDecorations] = useState<string[]>([])

  const onFontSizeChange = (event: Event, value: number) => setFontSize(value)
  const onThemeChange = (event: SelectChangeEvent) => setTheme(event.target.value)

  const resizeHandler = useCallback(() => editor!.layout({ width: 95, height: 90 }), [editor])

  const updateAvailableLanguages = (monacoLanguages: monaco.languages.ILanguageExtensionPoint[]) => {
    const languages = monacoLanguages
      .filter((language) => SUPPORTED_LANGUAGES.includes(language.id))
      .map((language) => language.id)
    setAvailableLanguages(languages)
  }

  useEffect(() => {
    if (!editor || rendered) return
    window.addEventListener('resize', resizeHandler)
    updateAvailableLanguages(monaco!.languages.getLanguages())
    setRendered(true)
    return () => window.removeEventListener('resize', resizeHandler)
  }, [editor, monaco, rendered, resizeHandler])

  useEffect(() => {
    if (editor) editor.setValue(defaultValue)
  }, [defaultValue, editor])


  useEffect(() => {
    if (editor) {
      console.log(activeUsers, 'active users')
      const highlightsToApply = activeUsers.flatMap(({ editorHighlights }) => [editorHighlights.cursor, editorHighlights.selection])

      const newDecorations = editor.deltaDecorations(decorations, highlightsToApply)
      setDecorations(newDecorations)
    }
  }, [editor, activeUsers])


  const onMount: OnMount = (editor, monaco) => {
    editor.focus()
    editor.onDidChangeCursorPosition(onCursorChange)
    editor.onDidChangeCursorSelection(onSelectionChange)
    setEditor(editor)
    setMonaco(monaco)
  }

  return (
    <Box className="grow flex flex-col">
      <EditorHeader
        fontSize={fontSize}
        setFontSize={onFontSizeChange}
        theme={theme}
        setTheme={onThemeChange}
        currentLanguage={language}
        availableLanguages={availableLanguages}
        setLanguage={setLanguage}
        onCodeExecute={onCodeExecute}
      />
      <Box className="grow">
        <MonacoEditor
          language={language}
          theme={theme}
          options={{ ...defaultEditorOptions, fontSize }}
          loading={<LoadingEditor />}
          onMount={onMount}
        />
      </Box>
    </Box>
  )
}

export default InterviewBody
