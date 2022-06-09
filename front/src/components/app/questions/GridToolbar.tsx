import EditIcon from '@mui/icons-material/Edit'
import { Fab } from '@mui/material'
import { GridToolbarContainer, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid'
import { Link } from 'react-router-dom'

function GridToolbar() {
  return (
    <GridToolbarContainer className="justify-between">
      <div>
        <GridToolbarQuickFilter debounceMs={500} placeholder="Search questions..." />
        <GridToolbarFilterButton />
      </div>
      <Link to="/questions/new">
        <Fab color="primary" size="small" variant="extended" aria-label="create question" className="gap-2">
          <EditIcon />
          Create a question
        </Fab>
      </Link>
    </GridToolbarContainer>
  )
}

export default GridToolbar
