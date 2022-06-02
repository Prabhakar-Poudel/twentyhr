import EditIcon from '@mui/icons-material/Edit'
import { Fab } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { interviewTransform } from 'src/dataTransforms/interview'
import { axios } from 'src/lib/axios/axios'
import { InterviewShow } from 'src/types/interview'

const createInterview = () =>  axios
  .post<InterviewShow>('/interviews/', { interview: { status: 'created' } })
  .then((res) => interviewTransform(res.data))

const CreateNewInterview = () => {
  const navigate = useNavigate()
  const onCreateNewInterview = async () => {
    const interview = await createInterview()
    navigate(`/interviews/${interview.id}`)
  }

  return (
    <Fab color="primary" size="small" variant="extended" aria-label="create interview" className="gap-2" onClick={onCreateNewInterview}>
      <EditIcon />
      Start an interview
    </Fab>
  )
}

export default CreateNewInterview
