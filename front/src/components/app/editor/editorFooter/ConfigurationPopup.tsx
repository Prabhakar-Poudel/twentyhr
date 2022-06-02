import { Paper, SelectChangeEvent } from '@mui/material'
import * as monaco from 'monaco-editor'
import FontSizeSlider from 'src/components/app/editor/editorFooter/FontSizeSlider'
import LanguageSelector from 'src/components/app/editor/editorFooter/LanguageSelector'
import ThemeSelector from 'src/components/app/editor/editorFooter/ThemeSelector'

export interface IdeConfigurationProps {
  fontSize: number
  theme: string
  setTheme: (event: SelectChangeEvent) => void
  setFontSize: (event: Event, value: any) => void
  currentLanguage: string
  availableLanguages: monaco.languages.ILanguageExtensionPoint[]
  setLanguage: (language: string) => void
}

const ConfigurationPopup = ({ fontSize, setFontSize, theme, setTheme, currentLanguage, setLanguage, availableLanguages }: IdeConfigurationProps) =>
  <Paper elevation={24} sx={{ minWidth: 275, padding: 2 }}>
    <FontSizeSlider fontSize={fontSize} onChange={setFontSize} />
    <ThemeSelector theme={theme} onChange={setTheme} />
    <LanguageSelector availableLanguages={availableLanguages} currentLanguage={currentLanguage} setLanguage={setLanguage} />
  </Paper>

export default ConfigurationPopup
