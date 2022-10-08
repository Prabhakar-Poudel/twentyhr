import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects'
import PolylineIcon from '@mui/icons-material/Polyline'
import QuizIcon from '@mui/icons-material/Quiz'
import TerminalIcon from '@mui/icons-material/Terminal'
import { Tab, Tabs } from '@mui/material'
import { Dispatch, SetStateAction, SyntheticEvent } from 'react'

export const TABS = ['terminal', 'draw', 'instruction', 'guideline']

interface Props {
  activeTab: string
  setActiveTab: Dispatch<SetStateAction<string>>
}

const DrawerTabs = ({ activeTab, setActiveTab }: Props) => {
  const className = 'hover:text-white !font-bold !min-h-fit hover:scale-110'

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setActiveTab(newValue)
  }

  return (
    <Tabs value={activeTab} onChange={handleChange} className="grow">
      <Tab
        disableRipple
        wrapped
        value={TABS[0]}
        label="IO"
        icon={<TerminalIcon />}
        iconPosition="start"
        className={className}
      />
      <Tab
        disableRipple
        wrapped
        value={TABS[1]}
        label="Draw"
        icon={<PolylineIcon />}
        iconPosition="start"
        className={className}
      />
      <Tab
        disableRipple
        wrapped
        value={TABS[2]}
        label="What"
        icon={<QuizIcon />}
        iconPosition="start"
        className={className}
      />
      <Tab
        disableRipple
        wrapped
        value={TABS[3]}
        label="How"
        icon={<EmojiObjectsIcon />}
        iconPosition="start"
        className={className}
      />
    </Tabs>
  )
}

export default DrawerTabs
