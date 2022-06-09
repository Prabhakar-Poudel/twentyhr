import { Box, Typography } from '@mui/material'
import { GridRenderCellParams } from '@mui/x-data-grid'

export function TitleCell({ row }: GridRenderCellParams) {
  return (
    <Box className="w-full flex flex-col">
      <Typography component="div" variant="h6" className="truncate ...">
        {row.title}
      </Typography>
      <Typography paragraph className="truncate ...">
        {row.description}
      </Typography>
    </Box>
  )
}
