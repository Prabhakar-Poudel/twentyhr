import { PlayArrow } from '@mui/icons-material'
import { Box, IconButton, SelectChangeEvent, Tooltip } from '@mui/material'
import IdeConfiguration from 'src/components/app/interview/interviewBody/ide/IdeConfiguration'
import Language from 'src/components/app/interview/interviewBody/ide/Language'

interface InterviewFooterProps {
  fontSize: number
  theme: string
  setTheme: (event: SelectChangeEvent) => void
  setFontSize: (event: Event, value: number) => void
  currentLanguage: string
  availableLanguages: string[]
  setLanguage: (language: string) => void
  onCodeExecute: () => void
}

const EditorHeader = ({ fontSize, setFontSize, theme, setTheme, currentLanguage, setLanguage, availableLanguages, onCodeExecute }: InterviewFooterProps) => {
  return (
    <Box className="pl-7 flex gap-4">
      <Tooltip arrow title="Execute code (ctrl+r)">
        <IconButton size="small" color="primary" onClick={onCodeExecute}>
          <PlayArrow />
        </IconButton>
      </Tooltip>
      <IdeConfiguration
        fontSize={fontSize}
        setFontSize={setFontSize}
        theme={theme}
        setTheme={setTheme}
      />
      <Language availableLanguages={availableLanguages} currentLanguage={currentLanguage} setLanguage={setLanguage} />
    </Box>
  )
}

export default EditorHeader
