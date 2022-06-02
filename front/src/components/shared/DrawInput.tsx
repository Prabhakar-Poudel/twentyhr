import { Excalidraw, THEME } from '@excalidraw/excalidraw-next'
import { ExcalidrawImperativeAPI } from '@excalidraw/excalidraw-next/types/types'
import { Box } from '@mui/material'
import { useRef } from 'react'
import './draw.css'

const DrawInput = ({ initialData = { }}) => {
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
