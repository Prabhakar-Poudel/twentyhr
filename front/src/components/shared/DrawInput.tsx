import { Excalidraw, THEME } from '@excalidraw/excalidraw-next'
import { ExcalidrawElement } from '@excalidraw/excalidraw-next/types/element/types'
import { AppState, ExcalidrawImperativeAPI } from '@excalidraw/excalidraw-next/types/types'
import { Box } from '@mui/material'
import { useRef } from 'react'
import './draw.css'

interface Props {
  initialData?: {
    elements?: ExcalidrawElement[]
    appState?: AppState
  }
}

const DrawInput = ({ initialData = { }}: Props) => {
  const excalidrawRef = useRef<ExcalidrawImperativeAPI>(null)

  return (
    <Box className="draw-input h-full w-full">
      <Excalidraw
        autoFocus
        initialData={initialData}
        ref={excalidrawRef}
        theme={THEME.DARK}
      />
    </Box>
  )
}

export default DrawInput
