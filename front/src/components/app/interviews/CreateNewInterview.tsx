import EditIcon from '@mui/icons-material/Edit'
import { Button } from '@mui/material'
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
    <Button
      variant="contained"
      className="!rounded-full"
      startIcon={<EditIcon />}
      onClick={onCreateNewInterview}
    >
      Start an interview
    </Button>
  )
}

export default CreateNewInterview
