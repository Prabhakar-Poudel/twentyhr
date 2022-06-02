import EditIcon from '@mui/icons-material/Edit'
import { Button } from '@mui/material'
import { GridToolbarContainer, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid'
import { Link } from 'react-router-dom'

const GridToolbar = () =>
  <GridToolbarContainer className="justify-between">
    <div>
      <GridToolbarQuickFilter debounceMs={500} placeholder="Search questions..." />
      <GridToolbarFilterButton />
    </div>
    <Link to="/questions/new">
      <Button variant="contained" className="!rounded-full" startIcon={<EditIcon />}>Create a question</Button>
    </Link>
  </GridToolbarContainer>

export default GridToolbar
