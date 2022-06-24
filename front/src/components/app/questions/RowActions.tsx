import ArchiveIcon from '@mui/icons-material/Archive'
import EditIcon from '@mui/icons-material/Edit'
import { Box, IconButton, Tooltip } from '@mui/material'
import { GridRenderCellParams } from '@mui/x-data-grid'
import { MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  row: {
    id: string
  }
}

export const RowActions = ({ row }: Props | GridRenderCellParams) => {
  const navigate = useNavigate()

  const editQuestion = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    navigate(`/questions/${row.id}/edit`)
  }

  return (
    <Box className="shrink-0">
      <Tooltip key="Edit" title="Edit question">
        <IconButton disableRipple color="secondary" aria-label="edit" className="hover:scale-125" onClick={editQuestion}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <IconButton disabled color="warning" aria-label="archive" className="hover:scale-125">
        <ArchiveIcon />
      </IconButton>
    </Box>
  )
}
