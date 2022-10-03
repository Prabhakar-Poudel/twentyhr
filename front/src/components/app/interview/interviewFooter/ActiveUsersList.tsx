import { Box } from '@mui/material'
import ActiveUserIndicator from 'src/components/app/interview/interviewFooter/ActiveUserIndicator'

export interface ActiveUser {
  id: string
  name: string
}

interface Props {
  activeUsers: ActiveUser[]
}

const ActiveUsersList = ({ activeUsers }: Props) => (
  <Box className="flex gap-4 py-2">
    {activeUsers.map((user, index) => (
      <ActiveUserIndicator userName={user.name} index={index} key={user.id} />
    ))}
  </Box>
)

export default ActiveUsersList
