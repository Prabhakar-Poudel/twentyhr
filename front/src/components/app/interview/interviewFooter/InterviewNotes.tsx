import NotesIcon from '@mui/icons-material/Notes'
import { Button, Popover, Tooltip } from '@mui/material'
import { MouseEvent, useEffect, useState } from 'react'
import { RichTextInput } from 'src/components/shared/RichTextInput'
import { noteForInterview } from 'src/queries/Interviews'
import { createNote, updateNote } from 'src/queries/Notes'
import { Note } from 'src/types/note'

interface Props {
  interview: string
}

const InterviewNotes = ({ interview }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [note, setNote] = useState<Note | null>(null)

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)
  const handleClose = () => {
    setAnchorEl(null)
    if (note) updateNote(note.id, note.content)
  }

  const showNotes = Boolean(anchorEl)

  const placeholder =
    'You can add your private interview notes here. This will be visible only to you and can be accessed later in your dashboard when the interview has ended.'

  useEffect(() => {
    noteForInterview(interview).then(setNote)
  }, [])

  const onNoteChanged = (content: string) => {
    if (note) {
      setNote({ ...note, content })
    } else {
      const newNote = { content, interview_id: interview }
      createNote(newNote).then(setNote)
    }
  }

  return (
    <>
      <Tooltip title="Your private interview notes">
        <Button color="secondary" variant="outlined" size="small" startIcon={<NotesIcon />} onClick={handleOpen}>
          Note
        </Button>
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
          onChange={onNoteChanged}
          margin="none"
          defaultValue={note?.content || ''}
          placeholder={placeholder}
        />
      </Popover>
    </>
  )
}

export default InterviewNotes
