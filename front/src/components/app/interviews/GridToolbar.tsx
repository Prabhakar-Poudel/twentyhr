import { GridToolbarContainer, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid'
import CreateNewInterview from 'src/components/app/interviews/CreateNewInterview'

const GridToolbar = () =>
  <GridToolbarContainer className="justify-between">
    <div>
      <GridToolbarQuickFilter debounceMs={500} placeholder="Search interviews..." />
      <GridToolbarFilterButton />
    </div>
    <CreateNewInterview />
  </GridToolbarContainer>

export default GridToolbar
