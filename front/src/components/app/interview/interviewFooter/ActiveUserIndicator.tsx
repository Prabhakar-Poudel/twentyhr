import { Box } from '@mui/material'
import { BG_COLORS } from 'src/constants/colors'

interface Props {
  userName: string
  index: number
}

const ActiveUserIndicator = ({ userName, index }: Props) => (
  <Box className="flex items-center gap-1">
    <Box className={`h-2 w-2 rounded-full ${BG_COLORS[index]}`} />
    {userName}
  </Box>
)

export default ActiveUserIndicator
