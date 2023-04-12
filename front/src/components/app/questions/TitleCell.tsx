import { Box, Typography } from '@mui/material'
import { GridRenderCellParams } from '@mui/x-data-grid'

export const TitleCell = ({ row }: GridRenderCellParams) => (
  <Box className="w-full flex flex-col">
    <Typography component="div" variant="h6" className="truncate ...">
      {row.title}
    </Typography>
    <Typography paragraph className="truncate ...">
      {row.description}
    </Typography>
  </Box>
)
