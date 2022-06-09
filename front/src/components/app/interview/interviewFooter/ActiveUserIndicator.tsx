import { Box } from '@mui/material'
import { COLORS } from 'src/constants/colors'

interface Props {
  userName: string
  index: number
}

function ActiveUserIndicator({ userName, index }: Props) {
  return (
    <Box className="flex items-center gap-1">
      <Box className="h-2 w-2 rounded-full" sx={{ backgroundColor: COLORS[index] }} />
      {userName}
    </Box>
  )
}

export default ActiveUserIndicator
