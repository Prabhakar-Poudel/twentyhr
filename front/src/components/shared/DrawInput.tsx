import Excalidraw, { THEME, getSceneVersion } from '@excalidraw/excalidraw-next'
import { ExcalidrawElement } from '@excalidraw/excalidraw-next/types/element/types'
import { AppState, ExcalidrawImperativeAPI, Gesture } from '@excalidraw/excalidraw-next/types/types'
import { Box } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { debounce } from 'lodash'
import './draw.css'
import { uiOptions } from 'src/config/excalidrawConfig'
import { COLOR_VALUE } from 'src/constants/colors'
import { ActiveUser } from 'src/pages/interview/helpers'
import { InterviewStatuses } from 'src/types/interview'

export type Pointer = {
  x: number
  y: number
}

export type SelectedElements = {
  [id: string]: boolean
}

type PointerUpdatePayload = {
  pointer: Pointer
  button: 'down' | 'up'
  pointersMap: Gesture['pointers']
}

interface Props {
  activeUsers: ActiveUser[]
  appState: AppState | null
  elements?: ExcalidrawElement[]
  interviewStatus: string
  onChange: (elements: readonly ExcalidrawElement[]) => void
  onPointerUpdate?: (pointer: Pointer, button: string, selectedElements: SelectedElements) => void
  setAppState: (state: AppState) => void
}

function DrawInput({ activeUsers, appState, elements = [], interviewStatus, onChange, onPointerUpdate, setAppState }: Props) {
  const excalidrawRef = useRef<ExcalidrawImperativeAPI>(null)
  const [sceneVersion, setSceneVersion] = useState(0)
  const collaborators = new Map()

  // @ts-expect-error
  const interviewEnded = ![InterviewStatuses.created, InterviewStatuses.started].includes(interviewStatus)

  useEffect(() => {
    if (!excalidrawRef.current) return

    activeUsers.forEach(user => {
        if (!user.drawing?.pointer) return

        const color = COLOR_VALUE[user.bgColor]
        collaborators.set(user.id, { ...user.drawing, username: user.name, color: { background: color, stroke: color }})
      })
      excalidrawRef.current.updateScene({ collaborators })
  }, [activeUsers])

  useEffect(() => {
    if(!excalidrawRef.current) return

    const currentScene = getSceneVersion(elements)
    if(sceneVersion >= currentScene) return
    setSceneVersion(currentScene)

    excalidrawRef.current.updateScene({ elements, commitToHistory: false })
  }, [elements])

  const onMouseMove = debounce((payload: PointerUpdatePayload) => {
    const selectedElements = excalidrawRef.current?.getAppState().selectedElementIds
    onPointerUpdate?.(payload.pointer, payload.button, selectedElements!)
  }, 10)

  const onChangeHandler = debounce((changedElements: readonly ExcalidrawElement[], state: AppState) => {
    setAppState(state)
    const currentScene = getSceneVersion(changedElements)
    if(currentScene <= sceneVersion) return

    onChange(changedElements)
    setSceneVersion(currentScene)
  }, 50)

  return (
    <Box className="draw-input h-full w-full">
      <Excalidraw
        autoFocus
        initialData={{ appState, elements, scrollToContent: true }}
        isCollaborating={true}
        onChange={onChangeHandler}
        onPointerUpdate={onMouseMove}
        ref={excalidrawRef}
        theme={THEME.DARK}
        UIOptions={uiOptions}
        viewModeEnabled={interviewEnded}
      />
    </Box>
  )
}

export default DrawInput
