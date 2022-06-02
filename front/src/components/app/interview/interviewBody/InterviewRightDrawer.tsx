import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen'
import OpenInFullIcon from '@mui/icons-material/OpenInFull'
import { Box, Divider, IconButton, Tab, Tabs } from '@mui/material'
import Drawer from '@mui/material/Drawer'
import { SyntheticEvent, useEffect, useState } from 'react'
import DrawInput from 'src/components/shared/DrawInput'
import RichTextView from 'src/components/shared/RichTextView'
import TabPanel from 'src/components/shared/TabPannel'
import TerminalView from 'src/components/shared/TerminalView'
import 'xterm/css/xterm.css'

const TABS = ['terminal', 'draw', 'instruction', 'guideline']

interface Props {
  open: boolean
  instructions?: string
  guidelines?: string
  terminalContent?: string
  focusTerminal?: boolean
}

const InterviewRightDrawer = ({ open, instructions = '', guidelines = '', terminalContent = '', focusTerminal }: Props) => {
  const [activeTab, setActiveTab] = useState(TABS[0])
  const [expanded, setExpanded] = useState(false)

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setActiveTab(newValue)
  }

  const onExpandButtonClick = () => {
    setExpanded(!expanded)
  }

  useEffect(() => {
    if(focusTerminal) setActiveTab(TABS[0])
  }, [focusTerminal])

  const size = expanded ? 'w-screen' : 'w-192'

  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={open}
    >
      <Box className={`${size} grow flex flex-col duration-300 ease-in-out`}>
        <Box className="flex">
          <IconButton aria-label="expand drawer" onClick={onExpandButtonClick}>
            {expanded ? <CloseFullscreenIcon /> : <OpenInFullIcon />}
          </IconButton>
          <Tabs value={activeTab} onChange={handleChange} className="grow">
            <Tab value={TABS[0]} label="Terminal" />
            <Tab value={TABS[1]} label="Draw" />
            <Tab value={TABS[2]} label="Instructions" />
            <Tab value={TABS[3]} label="Guidelines" />
          </Tabs>
        </Box>
        <Divider />
        <Box className="grow basis-32 overflow-hidden pb-12">
          <TabPanel activeTab={activeTab} tabId={TABS[0]}>
            <TerminalView value={terminalContent} />
          </TabPanel>
          <TabPanel activeTab={activeTab} tabId={TABS[1]}>
            <DrawInput />
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
