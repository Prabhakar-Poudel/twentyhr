import EditIcon from '@mui/icons-material/Edit'
import { Fab } from '@mui/material'
import { GridToolbarContainer, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid'
import { Link } from 'react-router-dom'

const GridToolbar = () => {
  return (
    <GridToolbarContainer className="justify-between">
      <div>
        <GridToolbarQuickFilter debounceMs={500} placeholder="Search users..." />
        <GridToolbarFilterButton />
      </div>
      <Fab color="primary" size="small" variant="extended" aria-label="add user" className="gap-2">
        <EditIcon />
        Invite user
      </Fab>
    </GridToolbarContainer>
  )
}

export default GridToolbar
