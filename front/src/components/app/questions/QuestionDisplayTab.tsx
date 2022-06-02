import MonacoEditor from '@monaco-editor/react'
import { Box, Divider, Tab, Tabs } from '@mui/material'
import { useState, SyntheticEvent, ReactNode } from 'react'
import RichTextView from 'src/components/shared/RichTextView'
import TabPanel from 'src/components/shared/TabPannel'
import { readonlyEditorOptions } from 'src/pages/editor/editorConfig'
import { QuestionShow } from 'src/types/question'

const TABS = ['instruction', 'guideline', 'code']

const QuestionDisplayTab = ({ question }: { question: QuestionShow }) => {
  const [activeTab, setActiveTab] = useState(TABS[0])
  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setActiveTab(newValue)
  }

  return (
    <Box className="grow flex flex-col">
      <Tabs value={activeTab} onChange={handleChange}>
        <Tab value={TABS[0]} label="Instructions" />
        <Tab value={TABS[1]} label="Guidelines" />
        <Tab value={TABS[2]} label="Starter code" />
      </Tabs>
      <Divider />
      <Box className="grow basis-32 overflow-hidden">
        <TabPanel activeTab={activeTab} tabId={TABS[0]}>
          <RichTextView value={question.instruction} placeholder="No instruction added" />
        </TabPanel>
        <TabPanel activeTab={activeTab} tabId={TABS[1]}>
          <RichTextView value={question.guidelines} placeholder="No guidelines added" />
        </TabPanel>
        <TabPanel activeTab={activeTab} tabId={TABS[2]}>
          <MonacoEditor
            language={question.language}
            defaultValue={question.initial_code}
            theme="vs-dark"
            options={readonlyEditorOptions}
            className="border-0 code-input"
          />
        </TabPanel>
      </Box>
    </Box>
  )
}

export default QuestionDisplayTab
