import { Paper, SelectChangeEvent } from '@mui/material'
import FontSizeSlider from 'src/components/app/interview/interviewBody/ide/FontSizeSlider'
import ThemeSelector from 'src/components/app/interview/interviewBody/ide/ThemeSelector'

export interface IdeConfigurationProps {
  fontSize: number
  theme: string
  setTheme: (event: SelectChangeEvent) => void
  setFontSize: (event: Event, value: any) => void
}

const ConfigurationPopup = ({ fontSize, setFontSize, theme, setTheme }: IdeConfigurationProps) => {
  return (
    <Paper elevation={24} sx={{ minWidth: 275, padding: 2 }}>
      <FontSizeSlider fontSize={fontSize} onChange={setFontSize} />
      <ThemeSelector theme={theme} onChange={setTheme} />
    </Paper>
  )
}

export default ConfigurationPopup
