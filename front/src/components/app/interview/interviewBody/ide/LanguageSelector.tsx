import { AutocompleteRenderInputParams, Box, TextField } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import { HTMLAttributes, SyntheticEvent } from 'react'

const optionFormatter = (option: string) => option.toUpperCase()

const InputField = (params: AutocompleteRenderInputParams) =>
  <TextField {...params} margin="normal" size="small" variant="standard" />

const OptionItem = (props: HTMLAttributes<HTMLLIElement>, option: string) =>
  <Box component="li" {...props}>{optionFormatter(option)}</Box>

export interface LanguageSelectorProps {
  availableLanguages: string[]
  currentLanguage: string
  setLanguage: (language: string) => void
}

const LanguageSelector = ({ availableLanguages, currentLanguage, setLanguage }: LanguageSelectorProps) => {
  const selectedLanguage = availableLanguages.find((id) => id === currentLanguage) || null
  const onLanguageChange = (event: SyntheticEvent, newValue: string) => setLanguage(newValue || currentLanguage)

  return (
    <Autocomplete
      autoHighlight
      className="w-48"
      disableClearable
      getOptionLabel={optionFormatter}
      id="language-select"
      onChange={onLanguageChange}
      options={availableLanguages}
      renderInput={InputField}
      renderOption={OptionItem}
      // @ts-ignore
      value={selectedLanguage}
    />
  )
}

export default LanguageSelector
