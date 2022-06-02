import  MonacoEditor, { OnMount } from '@monaco-editor/react'
import { Skeleton } from '@mui/material'
import * as monaco from 'monaco-editor'
import { useEffect, useState } from 'react'
import { MonacoEditorOptions } from 'src/types/editorConfig'

interface EditorBodyProps {
  defaultEditorOptions: MonacoEditorOptions
  theme: string
  language: string
  defaultValue?: string
  setLanguages: (languages: monaco.languages.ILanguageExtensionPoint[]) => void
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

const EditorBody = ({ defaultEditorOptions, theme, language, setLanguages, defaultValue = '' }: EditorBodyProps) => {
  const [editor, setEditor] = useState<any>(null)
  const [monaco, setMonaco] = useState<any>(null)
  const [rendered, setRendered] = useState(false)

  const resizeHandler = () => editor.layout({ width: '90%', height: '90%' })

  useEffect(() => {
    if (!editor || rendered) return
    window.addEventListener('resize', resizeHandler)
    setLanguages(monaco.languages.getLanguages())
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
    <div className="grow flex">
      <MonacoEditor
        language={language}
        theme={theme}
        options={defaultEditorOptions}
        loading={<LoadingEditor />}
        onChange={(newValue, event) => console.log(event, newValue)}
        onMount={onMount}
      />
    </div>
  )
}

export default EditorBody
