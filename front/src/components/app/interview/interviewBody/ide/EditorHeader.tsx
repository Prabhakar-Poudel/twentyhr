import { PlayArrow } from '@mui/icons-material'
import { Box, Button, SelectChangeEvent, Tooltip } from '@mui/material'
import { useCallback, useEffect } from 'react'
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
  const KeyPress = useCallback((event: KeyboardEvent): any => {
    if ((event.ctrlKey || event.metaKey) && event.code === 'Enter') onCodeExecute()
  }, [onCodeExecute])

  useEffect(() => {
    document.addEventListener('keydown', KeyPress, false)
    return () => {
      document.removeEventListener('keydown', KeyPress, false)
    }
  }, [KeyPress])
  
  return (
    <Box className="pl-4 flex gap-4">
      <IdeConfiguration
        fontSize={fontSize}
        setFontSize={setFontSize}
        theme={theme}
        setTheme={setTheme}
      />
      <Language availableLanguages={availableLanguages} currentLanguage={currentLanguage} setLanguage={setLanguage} />
      <Box className="flex items-center">
        <Tooltip arrow title="⌘ + Enter">
          <Button variant="contained" size="small" color="primary" onClick={onCodeExecute} startIcon={<PlayArrow />} >Run</Button>
        </Tooltip>
      </Box>
    </Box>
  )
}

export default EditorHeader
