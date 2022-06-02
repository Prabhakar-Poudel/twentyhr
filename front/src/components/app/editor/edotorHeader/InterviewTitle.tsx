import { TextField } from '@mui/material'

interface Props {
  defaultValue: string
  onChange: (title: string) => void
}

const InterviewTitle = ({ defaultValue, onChange}: Props) =>
  <TextField
    size="small"
    label="Title"
    defaultValue={defaultValue}
    onChange={(e) => onChange(e.target.value)}
  />

export default InterviewTitle
