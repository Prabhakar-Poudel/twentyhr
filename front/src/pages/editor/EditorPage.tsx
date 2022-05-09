import { SelectChangeEvent } from '@mui/material'
import { useEffect, useState } from 'react'
import * as monaco from 'monaco-editor'
import { loader } from '@monaco-editor/react'
import EditorHeader from 'src/components/app/editor/edotorHeader/EditorHeader'
import EditorBody from 'src/components/app/editor/editorBody/EditorBody'
import EditorFooter from 'src/components/app/editor/editorFooter/EditorFooter'
import defaultEditorOptions from './editorConfig'
import EditorDrawer from 'src/components/app/editor/editorBody/EditorDrawer'
import EditorSticky from 'src/components/app/editor/editorBody/EditorSticky'

const EditorPage = () => {
  const [fontSize, setFontSize] = useState<number>(defaultEditorOptions.fontSize)
  const [theme, setTheme] = useState<string>('vs-dark')
  const [language, setLanguage] = useState<string>('ruby')
  const [availableLanguages, setAvailableLanguages] = useState<monaco.languages.ILanguageExtensionPoint[]>([])
  const [showDrawer, setShowDrawer] = useState(false)

  const onFontSizeChange = (event: Event, value: number) => setFontSize(value)
  const onThemeChange =  (event: SelectChangeEvent) => setTheme(event.target.value)

  useEffect(() => {
    loader.config({ monaco })
  }, [])

  return (
    <div className="flex h-screen w-screen">
      <div className="flex flex-col flex-grow">
        <EditorHeader />
        <EditorBody theme={theme} defaultEditorOptions={{ ...defaultEditorOptions, fontSize }} language={language} setLanguages={setAvailableLanguages} />
        <EditorFooter fontSize={fontSize} setFontSize={onFontSizeChange} theme={theme} setTheme={onThemeChange} currentLanguage={language} availableLanguages={availableLanguages} setLanguage={setLanguage}/>
      </div>
      <div>
        <EditorSticky onClick={() => setShowDrawer(!showDrawer)}/>
        <EditorDrawer open={showDrawer} />
      </div>
    </div>
  )
}

export default EditorPage
