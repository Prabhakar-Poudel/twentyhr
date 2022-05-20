import { FormControl, FormHelperText, FormLabel, InputBase } from '@mui/material'
import ReactQuill from 'react-quill'

import 'react-quill/dist/quill.snow.css'
import './rich-text-input.css'

interface Props {
  label: string
  helperText?: string
  error?: string
  placeholder?: string
  defaultValue?: string
  onChange: (value: string) => void
}

const quillModules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}],
    [{'indent': '-1'}, {'indent': '+1'}],
    ['link'],
    ['clean'],
  ],
}

const quillFormats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet',
  'indent',
  'link',
]

export const RichTextInput = ({ label, helperText, placeholder, onChange, defaultValue }: Props) => {
  return (
    <FormControl fullWidth margin="normal">
      <FormLabel>{label}</FormLabel>
      <ReactQuill
        theme="snow"
        placeholder={placeholder || ''}
        modules={quillModules}
        formats={quillFormats}
        onChange={onChange}
        defaultValue={defaultValue || ''}
      >
        <InputBase fullWidth readOnly className="h-80"/>
      </ReactQuill>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}
