import Paper from '@mui/material/Paper'
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'
import GridToolbar from 'src/components/app/interviews/GridToolbar'
import { TitleCell } from 'src/components/app/interviews/TitleCell'
import { CreatorCell } from 'src/components/app/questions/CreatorCell'
import { creatorGetter, getCellClassName } from 'src/components/app/questions/helpers'
import { InterviewAction } from 'src/components/app/interviews/InterviewAction'
import { InterviewIndex } from 'src/types/interview'

interface Props {
  rows: InterviewIndex[]
}

const columns: GridColDef[] = [
  { field: 'title', headerName: 'Title', minWidth: 400, renderCell: TitleCell },
  { field: 'creator', headerName: 'Created by', width: 300, renderCell: CreatorCell, valueGetter: creatorGetter },
  { field: 'status', headerName: 'Status', width: 120, cellClassName: 'capitalize' },
  {
    field: 'action',
    headerName: '',
    width: 200,
    renderCell: InterviewAction,
    disableColumnMenu: true,
    disableExport: true,
    disableReorder: true,
    filterable: false,
    groupable: false,
    resizable: false,
    sortable: false,
  },
]

const InterviewsTable = ({ rows }: Props) => {
  const navigate = useNavigate()
  const onRowClick = ({ row }: GridRowParams) => navigate(`/interviews/${row.id}`)

  return (
    <Paper elevation={12}>
      <DataGrid
        autoHeight
        disableColumnMenu
        disableRowSelectionOnClick
        rows={rows}
        columns={columns}
        aria-label="interviews table"
        slots={{ toolbar: GridToolbar }}
        density="comfortable"
        getCellClassName={getCellClassName}
        onRowClick={onRowClick}
        initialState={{ pagination: { paginationModel: { pageSize: 25 } } }}
      />
    </Paper>
  )
}

export default InterviewsTable
