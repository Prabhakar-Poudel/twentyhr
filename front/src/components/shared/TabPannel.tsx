import { Box } from '@mui/material'
import { ReactNode } from 'react'

interface TabPanelProps {
  children: ReactNode
  tabId: string
  activeTab: string
}

const TabPanel = ({ children, activeTab, tabId }: TabPanelProps) => {
  const isActiveTab = activeTab === tabId

  return (
    <Box role="tabpanel" hidden={!isActiveTab} id={tabId} aria-labelledby={tabId} className="h-full">
      {isActiveTab && <Box className="mt-2 h-full overflow-auto">{children}</Box>}
    </Box>
  )
}

export default TabPanel
