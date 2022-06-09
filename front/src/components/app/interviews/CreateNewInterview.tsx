import EditIcon from '@mui/icons-material/Edit'
import { Fab } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { createInterview } from 'src/queries/Interviews'

function CreateNewInterview() {
  const navigate = useNavigate()
  const onCreateNewInterview = async () => {
    const interview = await createInterview()
    navigate(`/interviews/${interview.id}`)
  }

  return (
    <Fab
      color="primary"
      size="small"
      variant="extended"
      aria-label="create interview"
      className="gap-2"
      onClick={onCreateNewInterview}
    >
      <EditIcon />
      Start an interview
    </Fab>
  )
}

export default CreateNewInterview
