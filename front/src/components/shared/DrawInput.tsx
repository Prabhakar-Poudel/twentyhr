import Excalidraw, { THEME, getSceneVersion } from '@excalidraw/excalidraw-next'
import { ExcalidrawElement } from '@excalidraw/excalidraw-next/types/element/types'
import { AppState, ExcalidrawImperativeAPI, Gesture } from '@excalidraw/excalidraw-next/types/types'
import { Box } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { debounce, isEqual, isEqualWith } from 'lodash'
import './draw.css'
import { uiOptions } from 'src/config/excalidrawConfig'
import { COLOR_VALUE } from 'src/constants/colors'
import { ActiveUser } from 'src/pages/interview/helpers'

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
  elements?: ExcalidrawElement[]
  onChange: (elements: readonly ExcalidrawElement[]) => void
  onPointerUpdate?: (pointer: Pointer, button: string, selectedElements: SelectedElements) => void
}

function DrawInput({ activeUsers, elements = [], onChange, onPointerUpdate }: Props) {
  const excalidrawRef = useRef<ExcalidrawImperativeAPI>(null)
  const [sceneVersion, setSceneVersion] = useState(0)
  const [appState, setAppState] = useState<AppState | null>(null)
  const collaborators = new Map()

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
        initialData={{ elements, scrollToContent: true }}
        isCollaborating={true}
        onChange={onChangeHandler}
        onPointerUpdate={onMouseMove}
        ref={excalidrawRef}
        theme={THEME.DARK}
        UIOptions={uiOptions}
      />
    </Box>
  )
}

export default DrawInput
