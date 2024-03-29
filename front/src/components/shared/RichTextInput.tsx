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
  margin?: 'none' | 'dense' | 'normal'
}

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ color: [] }, { background: [] }],
    ['link'],
  ],
}

const quillFormats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'background',
  'color',
  'indent',
  'link',
]

export const RichTextInput = ({
  label,
  helperText,
  placeholder = '',
  onChange,
  defaultValue = '',
  margin = 'normal',
}: Props) => (
  <FormControl fullWidth margin={margin}>
    <FormLabel>{label}</FormLabel>
    <ReactQuill
      className="rich-text-input"
      theme="snow"
      placeholder={placeholder}
      modules={quillModules}
      formats={quillFormats}
      onChange={onChange}
      defaultValue={defaultValue}
    />
    {helperText && <FormHelperText>{helperText}</FormHelperText>}
  </FormControl>
)
