import { AutocompleteRenderInputParams, Box, TextField } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import * as monaco from 'monaco-editor'
import { HTMLAttributes, SyntheticEvent } from 'react'

const InputField = (params: AutocompleteRenderInputParams) =>
  <TextField {...params} margin="normal" size="small" label="Language" />

const OptionItem = (props: HTMLAttributes<HTMLLIElement>, option: monaco.languages.ILanguageExtensionPoint) =>
  <Box component="li" {...props}>{option.id.toUpperCase()}</Box>

interface Props {
  availableLanguages: monaco.languages.ILanguageExtensionPoint[]
  currentLanguage: string
  setLanguage: (language: string) => void
}

const LanguageSelector = ({ availableLanguages, currentLanguage, setLanguage }: Props) => {
  const selectedLanguage = availableLanguages.find(({ id }) => id === currentLanguage) || null
  const onLanguageChange = (event: SyntheticEvent, newValue: monaco.languages.ILanguageExtensionPoint) => setLanguage(newValue?.id || currentLanguage)

  return (
    <Autocomplete
      autoHighlight
      className="w-48"
      disableClearable
      getOptionLabel={(option) => option.id.toUpperCase()}
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
