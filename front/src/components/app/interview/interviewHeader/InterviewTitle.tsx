import { TextField } from '@mui/material'

interface Props {
  onChange: (title: string) => void
  value: string
}

const InterviewTitle = ({ onChange, value }: Props) =>
  <TextField
    label="Title"
    onChange={(e) => onChange(e.target.value)}
    size="small"
    value={value}
    variant="filled"
  />

export default InterviewTitle
