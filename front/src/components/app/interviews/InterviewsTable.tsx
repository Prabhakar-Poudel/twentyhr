import Paper from '@mui/material/Paper'
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'
import GridToolbar from 'src/components/app/interviews/GridToolbar'
import { TitleCell } from 'src/components/app/interviews/TitleCell'
import { absoluteToRelativeTime, creatorGetter, getCellClassName } from 'src/components/app/questions/helpers'
import { InterviewIndex } from 'src/types/interview'

interface Props {
  rows: InterviewIndex[]
}

const columns: GridColDef[] = [
  { field: 'title', headerName: 'Title', minWidth: 400, renderCell: TitleCell },
  { field: 'creator', headerName: 'Created by', width: 300, valueGetter: creatorGetter },
  { field: 'created_at', headerName: 'Created', width: 300, valueGetter: absoluteToRelativeTime },
  { field: 'status', headerName: 'Status', width: 120, cellClassName: 'capitalize' },
]

const InterviewsTable = ({ rows }: Props) => {
  const navigate = useNavigate()

  const openInterview = ({ id }: GridRowParams) => navigate(`/interviews/${id}`)

  return (
    <Paper elevation={12}>
      <DataGrid
        autoHeight
        autoPageSize
        hideFooterSelectedRowCount
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5, 10, 20, 40]}
        checkboxSelection={false}
        aria-label="interviews table"
        density="comfortable"
        components={{ Toolbar: GridToolbar }}
        getCellClassName={getCellClassName}
        onRowClick={openInterview}
      />
    </Paper>
  )
}

export default InterviewsTable
