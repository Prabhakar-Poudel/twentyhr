import MonacoEditor, { OnMount } from '@monaco-editor/react'
import { Box, FormControl, FormHelperText, FormLabel, TextField } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import { SyntheticEvent, useState } from 'react'
import defaultEditorOptions, { SUPPORTED_LANGUAGES } from 'src/config/editorConfig'

import './code-input.css'

export interface OnChangeParams {
  currentValue: string
  language: string
}

interface Props {
  label: string
  defaultValue: string
  onChange: (data: OnChangeParams) => void
  defaultLanguage: string
  helperText?: string
}

export function CodeInput({ label, defaultValue = '', defaultLanguage, helperText, onChange }: Props) {
  const [editor, setEditor] = useState<any>(null)
  const [language, setLanguage] = useState(defaultLanguage)

  const onMount: OnMount = (editor) => {
    setEditor(editor)
  }

  const onChangeHandler = () => {
    const currentValue = editor.getValue()
    onChange({ currentValue, language })
  }

  const onLanguageChange = (event: SyntheticEvent, newValue: string) => {
    setLanguage(newValue)
    const currentValue = editor.getValue()
    onChange({ currentValue, language: newValue })
  }

  return (
    <FormControl fullWidth margin="normal">
      <FormLabel>{label}</FormLabel>
      <Box className="code-input-wrapper">
        <Box className="p-1 flex code-input-toolbar border-inherit border-b">
          <Autocomplete
            options={SUPPORTED_LANGUAGES}
            autoHighlight
            disableClearable
            value={language}
            onChange={onLanguageChange}
            className="w-36"
            size="small"
            getOptionLabel={(option) => option.toUpperCase()}
            renderOption={(props, option) => (
              <Box component="li" {...props}>
                {option.toUpperCase()}
              </Box>
            )}
            renderInput={(params) => <TextField {...params} />}
          />
        </Box>
        <MonacoEditor
          language={language}
          defaultValue={defaultValue}
          theme="vs-dark"
          options={defaultEditorOptions}
          onChange={onChangeHandler}
          onMount={onMount}
          className="h-80 border-0 code-input"
        />
      </Box>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}
