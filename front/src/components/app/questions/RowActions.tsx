import ArchiveIcon from '@mui/icons-material/Archive'
import EditIcon from '@mui/icons-material/Edit'
import { Box, IconButton, Tooltip } from '@mui/material'
import { GridRenderCellParams } from '@mui/x-data-grid'
import { Link } from 'react-router-dom'

interface Props {
  id: string
}

export function RowActions({ id }: Props | GridRenderCellParams) {
  return (
    <Box className="shrink-0">
      <Link to={`/questions/${id}/edit`}>
        <Tooltip key="Edit" title="Edit question">
          <IconButton disableRipple color="secondary" aria-label="edit" className="hover:scale-125">
            <EditIcon />
          </IconButton>
        </Tooltip>
      </Link>
      <Tooltip key="Archive" title="Archive question">
        <IconButton disableRipple color="warning" aria-label="archive" className="hover:scale-125">
          <ArchiveIcon />
        </IconButton>
      </Tooltip>
    </Box>
  )
}
