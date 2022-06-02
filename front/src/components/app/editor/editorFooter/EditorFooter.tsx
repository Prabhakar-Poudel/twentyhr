import { AppBar, SelectChangeEvent } from '@mui/material'
import * as monaco from 'monaco-editor'
import IdeConfiguration from './IdeConfiguration'

interface EditorFooterProps {
  fontSize: number
  theme: string
  setTheme: (event: SelectChangeEvent) => void
  setFontSize: (event: Event, value: number) => void
  currentLanguage: string
  availableLanguages: monaco.languages.ILanguageExtensionPoint[]
  setLanguage: (language: string) => void
}

const EditorFooter = ({ fontSize, setFontSize, theme, setTheme, currentLanguage, setLanguage, availableLanguages }: EditorFooterProps) => {
  return (
    <AppBar position="relative" component="footer">
      <IdeConfiguration
        fontSize={fontSize}
        setFontSize={setFontSize}
        theme={theme}
        setTheme={setTheme}
        currentLanguage={currentLanguage}
        availableLanguages={availableLanguages}
        setLanguage={setLanguage}
      />
    </AppBar>
  )
}

export default EditorFooter
