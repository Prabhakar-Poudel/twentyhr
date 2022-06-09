import NotesIcon from '@mui/icons-material/Notes'
import { Button, Popover, Tooltip } from '@mui/material'
import { MouseEvent, useState } from 'react'
import { RichTextInput } from 'src/components/shared/RichTextInput'

const InterviewNotes = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [notes, setNotes] = useState('')

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const showNotes = Boolean(anchorEl)

  const placeholder = 'You can add your private interview notes here. This will be visible only to you and can be accessed later in your dashboard when the interview has ended.'

  return (
    <>
      <Tooltip title="Your private interview notes">
        <Button color="secondary" variant="outlined" size="small" startIcon={<NotesIcon />} onClick={handleOpen}>Note</Button>
      </Tooltip>
      <Popover
        open={showNotes}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <RichTextInput
          label=""
          onChange={(change) => setNotes(change)}
          margin="none"
          defaultValue={notes}
          placeholder={placeholder}
        />
      </Popover>
    </>
  )
}

export default InterviewNotes
