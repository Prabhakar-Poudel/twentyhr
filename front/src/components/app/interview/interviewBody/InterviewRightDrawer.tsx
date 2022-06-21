import { ExcalidrawElement } from '@excalidraw/excalidraw-next/types/element/types'
import { AppState } from '@excalidraw/excalidraw-next/types/types'
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen'
import OpenInFullIcon from '@mui/icons-material/OpenInFull'
import { Box, Divider, IconButton, Tab, Tabs, Tooltip } from '@mui/material'
import Drawer from '@mui/material/Drawer'
import { SyntheticEvent, useEffect, useState } from 'react'
import DrawInput, { Pointer, SelectedElements } from 'src/components/shared/DrawInput'
import RichTextView from 'src/components/shared/RichTextView'
import TabPanel from 'src/components/shared/TabPannel'
import TerminalView from 'src/components/shared/TerminalView'
import 'xterm/css/xterm.css'
import { ActiveUser, TerminalSelection } from 'src/pages/interview/helpers'

const TABS = ['terminal', 'draw', 'instruction', 'guideline']

interface Props {
  activeUsers: ActiveUser[]
  focusTerminal?: boolean
  guidelines?: string
  drawingElements?: ExcalidrawElement[]
  instructions?: string
  onDrawChange: (elements: readonly ExcalidrawElement[]) => void
  onDrawPointerChange: (pointer: Pointer, button: string, selectedElements: SelectedElements) => void
  onTerminalSelectionChange: (selection?: TerminalSelection) => void
  open: boolean
  terminalContent?: string
}

function InterviewRightDrawer({
  activeUsers,
  drawingElements,
  focusTerminal,
  guidelines = '',
  instructions = '',
  onDrawChange,
  onDrawPointerChange,
  onTerminalSelectionChange,
  open,
  terminalContent = '',
}: Props) {
  const [activeTab, setActiveTab] = useState(TABS[0])
  const [expanded, setExpanded] = useState(false)
  const [drawState, setDrawState] = useState<AppState | null>(null)

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setActiveTab(newValue)
  }

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
          <Tabs value={activeTab} onChange={handleChange} className="grow">
            <Tab value={TABS[0]} label="IO" />
            <Tab value={TABS[1]} label="Draw" />
            <Tab value={TABS[2]} label="Instructions" />
            <Tab value={TABS[3]} label="Guidelines" />
          </Tabs>
        </Box>
        <Divider />
        <Box className="grow basis-32 overflow-hidden pb-12">
          <TabPanel activeTab={activeTab} tabId={TABS[0]}>
            <TerminalView
              activeUsers={activeUsers}
              onSelect={onTerminalSelectionChange}
              value={terminalContent}
            />
          </TabPanel>
          <TabPanel activeTab={activeTab} tabId={TABS[1]}>
            <DrawInput
              appState={drawState}
              activeUsers={activeUsers}
              elements={drawingElements}
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
