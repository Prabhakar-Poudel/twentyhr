import { Box } from '@mui/material'
import { ReactNode } from 'react'

interface TabPanelProps {
  children: ReactNode
  tabId: string
  activeTab: string
}

const TabPanel = (props: TabPanelProps) => {
  const { children, activeTab, tabId } = props

  return (
    <Box
      role="tabpanel"
      hidden={activeTab !== tabId}
      id={tabId}
      aria-labelledby={tabId}
      className="h-full"
    >
      {activeTab === tabId && (
        <Box className="mt-2 h-full overflow-auto">
          {children}
        </Box>
      )}
    </Box>
  )
}

export default TabPanel
