import { Box, Typography } from '@mui/material'
import { useAuth } from 'src/contexts/AuthContext'
import { ActiveUser } from 'src/pages/interview/helpers'

interface Props {
  activeUsers: ActiveUser[]
  onJumpToUser: (user: ActiveUser) => void
}

const EditorUserLocation = ({ activeUsers, onJumpToUser }: Props) => {
  const { user } = useAuth()

  return (
    <Box className="flex items-center gap-2">
      {activeUsers.map((currentUser) => {
        const { editorHighlights, id, bgColor } = currentUser
        const lineNumber = editorHighlights.cursor.range.endLineNumber
        if (lineNumber < 1) return null
        if (user!.id === id) return null

        return (
          <button key={id} className={`w-8 h-8 rounded-full ${bgColor}`} onClick={() => onJumpToUser(currentUser)}>
            <Typography variant="body2">{lineNumber}</Typography>
          </button>
        )}
      )}
    </Box>
  )
}

export default EditorUserLocation
