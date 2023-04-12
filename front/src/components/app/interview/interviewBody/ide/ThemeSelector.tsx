import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'

interface Props {
  theme: string
  onChange: (event: SelectChangeEvent) => void
}

const ThemeSelector = ({ theme, onChange }: Props) => (
  <FormControl size="small">
    <InputLabel htmlFor="theme-selector">Theme</InputLabel>
    <Select labelId="theme-selector" id="theme-selector" value={theme} label="Theme" onChange={onChange}>
      <MenuItem value="vs">Light</MenuItem>
      <MenuItem value="vs-dark">Dark</MenuItem>
      <MenuItem value="hc-black">High contrast</MenuItem>
    </Select>
  </FormControl>
)

export default ThemeSelector
