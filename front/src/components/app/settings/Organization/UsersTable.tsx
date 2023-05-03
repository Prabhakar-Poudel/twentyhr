import { Paper } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import GridToolbar from './GridToolbar'
import { User } from 'src/types/user'

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', minWidth: 300 },
  { field: 'email', headerName: 'Email', minWidth: 300 },
  { field: 'role', headerName: 'Role', minWidth: 120, cellClassName: 'capitalize', editable: true },
]

interface Props {
  rows: User[]
}

const UsersTable = ({ rows }: Props) => (
  <Paper elevation={12} className="my-2">
    <DataGrid
      autoHeight
      disableColumnMenu
      rows={rows}
      columns={columns}
      aria-label="users table"
      density="comfortable"
      slots={{ toolbar: GridToolbar }}
      initialState={{ pagination: { paginationModel: { pageSize: 25 } } }}
    />
  </Paper>
)

export default UsersTable
