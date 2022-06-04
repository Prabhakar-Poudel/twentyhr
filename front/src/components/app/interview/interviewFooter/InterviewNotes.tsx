import NotesIcon from '@mui/icons-material/Notes'
import { Button, Popover } from '@mui/material'
import { MouseEvent, useState } from 'react'
import { RichTextInput } from 'src/components/shared/RichTextInput'

const InterviewNotes = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [notes, setNotes] = useState('')

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const showNotes = Boolean(anchorEl)

  return (
    <>
      <Button color="secondary" variant="outlined" size="small" startIcon={<NotesIcon />} onClick={handleOpen}>Quick Notes</Button>
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
          placeholder="You can add private interview notes here..."
        />
      </Popover>
    </>
  )
}

export default InterviewNotes
