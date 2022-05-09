import Autocomplete from '@mui/material/Autocomplete'
import IconButton from '@mui/material/IconButton'
import Popover from '@mui/material/Popover'
import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'
import GearIcon from '@mui/icons-material/Settings'
import * as monaco from 'monaco-editor'
import { useState, MouseEvent, SyntheticEvent } from 'react'
import { Box, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, TextField } from '@mui/material'

interface IdeConfigurationProps {
  fontSize: number
  theme: string
  setTheme: (event: SelectChangeEvent) => void
  setFontSize: (event: Event, value: any) => void
  currentLanguage: string
  availableLanguages: monaco.languages.ILanguageExtensionPoint[]
  setLanguage: (language: string) => void
}

const IdeConfiguration = ({ fontSize, setFontSize, theme, setTheme, currentLanguage, setLanguage, availableLanguages }: IdeConfigurationProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)
  const showConfiguration = Boolean(anchorEl)

  return (
    <div>
      <IconButton color="primary" aria-label="configure IDE" onClick={handleOpen}>
        <GearIcon />
      </IconButton>
      <Popover
        id="ide-configuration"
        open={showConfiguration}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Paper elevation={24} sx={{ minWidth: 275, padding: 2 }}>
          <Typography id="font-size-label">Font size</Typography>
          <Slider
            aria-labelledby="font-size-label"
            size="small"
            min={10}
            max={30}
            color="secondary"
            value={fontSize}
            aria-label="Small"
            valueLabelDisplay="auto"
            onChange={setFontSize}
          />
          <FormControl size="small">
            <InputLabel htmlFor="theme-selector" color="secondary">Theme</InputLabel>
            <Select
              labelId="theme-selector"
              id="theme-selector"
              value={theme}
              label="Theme"
              color="secondary"
              onChange={setTheme}
            >
              <MenuItem value="vs">Light</MenuItem>
              <MenuItem value="vs-dark">Dark</MenuItem>
              <MenuItem value="hc-black">High contrast</MenuItem>
            </Select>
          </FormControl>
          <Autocomplete
            id="language-select"
            options={availableLanguages}
            autoHighlight
            disableClearable
            value={availableLanguages.find(({ id }) => id === currentLanguage)}
            onChange={(event: SyntheticEvent, newValue: monaco.languages.ILanguageExtensionPoint | null) => {
              setLanguage(newValue?.id || currentLanguage)
            }}
            className="w-48"
            getOptionLabel={(option) => option.id.toUpperCase()}
            renderOption={(props, option) => <Box component="li" {...props}>{option.id.toUpperCase()}</Box>}
            renderInput={(params) => <TextField {...params} color="secondary" margin="normal" size="small" label="Language" />}
          />
        </Paper>
      </Popover>
    </div>
  )
}

export default IdeConfiguration
