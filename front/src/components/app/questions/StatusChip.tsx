import { Chip } from '@mui/material'
import { GridRenderCellParams } from '@mui/x-data-grid'


export const StatusChip = (params: GridRenderCellParams) => {
  const { value } = params
  const color = value === 'published' ? 'secondary' : 'warning'

  return (
    <Chip
      label={value}
      color={color}
      variant="outlined"
      size="medium"
      className="w-32 uppercase"
    />
  )
}
