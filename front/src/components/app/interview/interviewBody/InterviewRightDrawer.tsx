import { ExcalidrawElement } from '@excalidraw/excalidraw-next/types/element/types'
import { AppState } from '@excalidraw/excalidraw-next/types/types'
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen'
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects'
import OpenInFullIcon from '@mui/icons-material/OpenInFull'
import PolylineIcon from '@mui/icons-material/Polyline'
import QuizIcon from '@mui/icons-material/Quiz'
import TerminalIcon from '@mui/icons-material/Terminal'
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
  drawingElements?: ExcalidrawElement[]
  focusTerminal?: boolean
  guidelines?: string
  instructions?: string
  interviewStatus: string
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
  interviewStatus,
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
  const className = 'hover:text-white !font-bold !min-h-fit hover:scale-110'

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
            <Tab disableRipple wrapped value={TABS[0]} label="IO" icon={<TerminalIcon />} iconPosition="start" className={className} />
            <Tab disableRipple wrapped value={TABS[1]} label="Draw" icon={<PolylineIcon />} iconPosition="start" className={className} />
            <Tab disableRipple wrapped value={TABS[2]} label="What" icon={<QuizIcon />} iconPosition="start" className={className} />
            <Tab disableRipple wrapped value={TABS[3]} label="How" icon={<EmojiObjectsIcon />} iconPosition="start" className={className} />
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
