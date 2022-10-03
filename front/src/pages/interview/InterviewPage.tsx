import { useState } from 'react'
import { useParams } from 'react-router'
import PageLoading from 'src/components/shared/PageLoading'
import { useAuth } from 'src/contexts/AuthContext'
import EndInterview from './EndInterview'
import Interview from './Interview'
import JoinInterview from './JoinInterview'

const InterviewPage = () => {
  const { id } = useParams()
  const { user, loading } = useAuth()
  const [ended, setEnded] = useState(false)

  if (loading) return <PageLoading />

  if (!user?.id) return <JoinInterview interviewId={id!} />
  if (ended && !user.email) return <EndInterview />

  return <Interview id={id!} user={user} onEndInterview={() => setEnded(true)} />
}

export default InterviewPage
