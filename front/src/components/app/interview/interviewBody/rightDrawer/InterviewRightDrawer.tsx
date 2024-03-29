import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types'
import { AppState } from '@excalidraw/excalidraw/types/types'
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen'
import OpenInFullIcon from '@mui/icons-material/OpenInFull'
import { Box, Divider, IconButton, Tooltip } from '@mui/material'
import Drawer from '@mui/material/Drawer'
import { useEffect, useState } from 'react'
import DrawInput, { Pointer, SelectedElements } from 'src/components/shared/DrawInput'
import RichTextView from 'src/components/shared/RichTextView'
import TabPanel from 'src/components/shared/TabPannel'
import TerminalView from 'src/components/shared/TerminalView'
import { ActiveUser } from 'src/pages/interview/helpers'
import { IBufferRange } from 'xterm'
import DrawerTabs, { TABS } from './DrawerTabs'

interface Props {
  activeUsers: ActiveUser[]
  drawingElements?: ExcalidrawElement[]
  focusTerminal?: boolean
  guidelines?: string
  instructions?: string
  interviewStatus: string
  onDrawChange: (elements: readonly ExcalidrawElement[]) => void
  onDrawPointerChange: (pointer: Pointer, button: string, selectedElements: SelectedElements) => void
  onTerminalSelectionChange: (selection?: IBufferRange) => void
  open: boolean
  terminalContent?: string
}

const InterviewRightDrawer = ({
  activeUsers,
  drawingElements,
  focusTerminal,
  guidelines = '',
  instructions = '',
  interviewStatus,
  onDrawChange,
  onDrawPointerChange,
  onTerminalSelectionChange,
  open,
  terminalContent = '',
}: Props) => {
  const [activeTab, setActiveTab] = useState(TABS[0])
  const [expanded, setExpanded] = useState(false)
  const [drawState, setDrawState] = useState<AppState | null>(null)

  const onExpandButtonClick = () => {
    setExpanded(!expanded)
  }

  useEffect(() => {
    if (focusTerminal) setActiveTab(TABS[0])
  }, [focusTerminal])

  const size = expanded ? 'w-screen' : 'w-192'
  const tooltip = expanded ? 'Close fullscreen' : 'Open fullscreen'

  return (
    <Drawer variant="persistent" anchor="right" open={open}>
      <Box className={`${size} grow flex flex-col duration-300 ease-in-out`}>
        <Box className="flex">
          <Tooltip arrow title={tooltip}>
            <IconButton aria-label="expand drawer" onClick={onExpandButtonClick}>
              {expanded ? <CloseFullscreenIcon /> : <OpenInFullIcon />}
            </IconButton>
          </Tooltip>
          <DrawerTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </Box>
        <Divider />
        <Box className="grow basis-32 overflow-hidden pb-12">
          <TabPanel activeTab={activeTab} tabId={TABS[0]}>
            <TerminalView activeUsers={activeUsers} onSelect={onTerminalSelectionChange} value={terminalContent} />
          </TabPanel>
          <TabPanel activeTab={activeTab} tabId={TABS[1]}>
            <DrawInput
              activeUsers={activeUsers}
              appState={drawState}
              elements={drawingElements}
              interviewStatus={interviewStatus}
              onChange={onDrawChange}
              onPointerUpdate={onDrawPointerChange}
              setAppState={setDrawState}
            />
          </TabPanel>
          <TabPanel activeTab={activeTab} tabId={TABS[2]}>
            <RichTextView value={instructions} placeholder="No instruction added" />
          </TabPanel>
          <TabPanel activeTab={activeTab} tabId={TABS[3]}>
            <RichTextView value={guidelines} placeholder="No guidelines added" />
          </TabPanel>
        </Box>
      </Box>
    </Drawer>
  )
}

export default InterviewRightDrawer
