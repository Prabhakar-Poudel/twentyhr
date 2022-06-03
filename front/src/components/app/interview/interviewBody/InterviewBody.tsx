import  MonacoEditor, { OnMount } from '@monaco-editor/react'
import { Box, SelectChangeEvent, Skeleton } from '@mui/material'
import * as monaco from 'monaco-editor'
import { useEffect, useState } from 'react'
import EditorHeader from 'src/components/app/interview/interviewBody/ide/EditorHeader'
import defaultEditorOptions, { SUPPORTED_LANGUAGES } from 'src/config/editorConfig'

interface InterviewBodyProps {
  defaultValue?: string
  language: string
  setLanguage: (language: string) => void
  onCodeExecute: () => void
}

const LoadingEditor = () => (
  <Skeleton
    animation="wave"
    width="100%"
    height="100%"
    variant="rectangular"
    sx={{ bgcolor: 'grey.900' }}
  />
)

const InterviewBody = ({ language, setLanguage, defaultValue = '', onCodeExecute }: InterviewBodyProps) => {
  const [editor, setEditor] = useState<any>(null)
  const [monaco, setMonaco] = useState<any>(null)
  const [rendered, setRendered] = useState(false)
  const [fontSize, setFontSize] = useState<number>(defaultEditorOptions.fontSize)
  const [theme, setTheme] = useState<string>('vs-dark')
  const [availableLanguages, setAvailableLanguages] = useState<string[]>([])

  const onFontSizeChange = (event: Event, value: number) => setFontSize(value)
  const onThemeChange =  (event: SelectChangeEvent) => setTheme(event.target.value)

  const resizeHandler = () => editor.layout({ width: '95%', height: '90%' })

  const updateAvailableLanguages = (monacoLanguages: monaco.languages.ILanguageExtensionPoint[]) => {
    const languages = monacoLanguages
      .filter((language) => SUPPORTED_LANGUAGES.includes(language.id))
      .map((language) => language.id)
    setAvailableLanguages(languages)
  }

  useEffect(() => {
    if (!editor || rendered) return
    window.addEventListener('resize', resizeHandler)
    updateAvailableLanguages(monaco.languages.getLanguages())
    editor.getModel().onDidChangeLanguage((e: any) => console.log(e))
    setRendered(true)
    return () => window.removeEventListener('resize', resizeHandler)
  }, [editor])

  useEffect(() => {
    if(editor) editor.setValue(defaultValue)
  }, [defaultValue])

  const onMount: OnMount = (editor, monaco) => {
    editor.focus()
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
          onChange={(newValue) => console.log(newValue)}
          onMount={onMount}
        />
      </Box>
    </Box>
  )
}

export default InterviewBody