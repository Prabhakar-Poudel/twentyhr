import { Box, Typography } from '@mui/material'
import { GridRenderCellParams } from '@mui/x-data-grid'
import dayjs from 'dayjs'

export const CreatorCell = ({ value, row }: GridRenderCellParams) => {
  const time = dayjs(row.created_at).fromNow()

  return (
    <Box className="w-full flex flex-col">
      <Typography>{value}</Typography>
      <Typography variant="subtitle2">{time}</Typography>
    </Box>
  )
}
