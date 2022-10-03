import { useParams } from 'react-router'
import PageLoading from 'src/components/shared/PageLoading'
import { useAuth } from 'src/contexts/AuthContext'
import Interview from './Interview'
import JoinInterview from './JoinInterview'

const InterviewPage = () => {
  const { id } = useParams()
  const { user, loading } = useAuth()

  if (loading) return <PageLoading />

  if (!user?.id) return <JoinInterview interviewId={id!} />

  return <Interview id={id!} user={user} />
}

export default InterviewPage
