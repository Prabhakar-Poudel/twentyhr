import { PlayArrow } from '@mui/icons-material'
import { Box, Button, SelectChangeEvent, Tooltip, Typography } from '@mui/material'
import { useCallback, useEffect } from 'react'
import EditorUserLocation from 'src/components/app/interview/interviewBody/ide/EditorUserLocation'
import IdeConfiguration from 'src/components/app/interview/interviewBody/ide/IdeConfiguration'
import Language from 'src/components/app/interview/interviewBody/ide/Language'
import { ActiveUser } from 'src/pages/interview/helpers'

interface InterviewFooterProps {
  activeUsers: ActiveUser[]
  availableLanguages: string[]
  currentLanguage: string
  fontSize: number
  onCodeExecute: () => void
  onJumpToUser: (user: ActiveUser) => void
  setFontSize: (event: Event, value: number) => void
  setLanguage: (language: string) => void
  setTheme: (event: SelectChangeEvent) => void
  theme: string
}

function EditorHeader({
  activeUsers,
  availableLanguages,
  currentLanguage,
  fontSize,
  onCodeExecute,
  onJumpToUser,
  setFontSize,
  setLanguage,
  setTheme,
  theme,
}: InterviewFooterProps) {
  const KeyPress = useCallback(
    (event: KeyboardEvent): any => {
      if ((event.ctrlKey || event.metaKey) && event.code === 'Enter') onCodeExecute()
    },
    [onCodeExecute]
  )

  useEffect(() => {
    document.addEventListener('keydown', KeyPress, false)
    return () => {
      document.removeEventListener('keydown', KeyPress, false)
    }
  }, [KeyPress])

  return (
    <Box className="pl-4 flex gap-4">
      <IdeConfiguration fontSize={fontSize} setFontSize={setFontSize} theme={theme} setTheme={setTheme} />
      <Language availableLanguages={availableLanguages} currentLanguage={currentLanguage} setLanguage={setLanguage} />
      <Box className="flex items-center">
        <Tooltip arrow title="⌘ + Enter">
          <Button variant="contained" size="small" color="primary" onClick={onCodeExecute} startIcon={<PlayArrow />}>
            Run
          </Button>
        </Tooltip>
      </Box>
      <EditorUserLocation activeUsers={activeUsers} onJumpToUser={onJumpToUser} />
    </Box>
  )
}

export default EditorHeader
