import { TextField } from '@mui/material'

interface Props {
  value: string
  onChange: (title: string) => void
}

const InterviewTitle = ({ value, onChange }: Props) =>
  <TextField
    size="small"
    label="Title"
    value={value}
    variant="filled"
    onChange={(e) => onChange(e.target.value)}
  />

export default InterviewTitle
