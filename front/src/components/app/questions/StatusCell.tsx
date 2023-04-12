import { Typography } from '@mui/material'
import { GridRenderCellParams } from '@mui/x-data-grid'

const colorMap: Record<string, string> = {
  published: 'secondary.main',
  draft: 'warning.main',
  archived: 'grey.600',
}

export const StatusCell = ({ value }: GridRenderCellParams) => {
  const color = colorMap[value]

  return (
    <Typography color={color} className="uppercase">
      {value}
    </Typography>
  )
}
