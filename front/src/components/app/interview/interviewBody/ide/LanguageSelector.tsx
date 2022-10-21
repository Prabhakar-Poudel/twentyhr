import { AutocompleteRenderInputParams, Box, TextField } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import { HTMLAttributes, SyntheticEvent } from 'react'

const optionFormatter = (option: string) => option.toUpperCase()

function InputField(params: AutocompleteRenderInputParams) {
  return <TextField {...params} margin="normal" size="small" variant="standard" />
}

function OptionItem(props: HTMLAttributes<HTMLLIElement>, option: string) {
  return (
    <Box component="li" {...props}>
      {optionFormatter(option)}
    </Box>
  )
}

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
      // @ts-expect-error
      value={selectedLanguage}
    />
  )
}

export default LanguageSelector
