import ArchiveIcon from '@mui/icons-material/Archive'
import EditIcon from '@mui/icons-material/Edit'
import { Box, IconButton, Tooltip } from '@mui/material'
import { GridRenderCellParams } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'

type Color =  "secondary" | "default" | "success" | "inherit" | "warning" | "error" | "primary" | "info"

interface Props {
  id: string
}

export const RowActions = ({ id }: Props | GridRenderCellParams) => {
  const navigate = useNavigate()

  const onEdit = (event: any) => {
    event.stopPropagation()
    navigate(`/questions/${id}/edit`)
  }

  const actions = [
    { icon: <EditIcon />, onClick: onEdit, label: 'Edit', color: 'secondary' },
    { icon: <ArchiveIcon />, onClick: () => {}, label: 'Archive', color: 'warning' },
  ]

  return (
    <Box>
      {actions.map(({ icon, onClick, label, color }) => (
        <Tooltip key={label} title={`${label} question`}>
          <IconButton disableRipple color={color as Color} aria-label={label} onClick={onClick} className="hover:scale-125">
            {icon}
          </IconButton>
        </Tooltip>
      ))}
    </Box>
  )
}
