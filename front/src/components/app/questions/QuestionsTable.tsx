import Paper from '@mui/material/Paper'
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'
import { CreatorCell } from 'src/components/app/questions/CreatorCell'
import { creatorGetter, getCellClassName } from 'src/components/app/questions/helpers'
import { RowActions } from 'src/components/app/questions/RowActions'
import { StatusCell } from 'src/components/app/questions/StatusCell'
import { TitleCell } from 'src/components/app/questions/TitleCell'
import { QuestionIndex } from 'src/types/question'
import GridToolbar from './GridToolbar'

interface Props {
  rows: QuestionIndex[]
}

const columns: GridColDef[] = [
  { field: 'title', headerName: 'Title', minWidth: 400, renderCell: TitleCell },
  { field: 'creator', headerName: 'Created by', width: 300, renderCell: CreatorCell, valueGetter: creatorGetter },
  { field: 'status', headerName: 'Status', width: 120, renderCell: StatusCell },
  {
    field: 'actions',
    headerName: '',
    width: 150,
    renderCell: RowActions,
    disableColumnMenu: true,
    disableExport: true,
    disableReorder: true,
    filterable: false,
    groupable: false,
    resizable: false,
    sortable: false,
  },
]

const QuestionsTable = ({ rows }: Props) => {
  const navigate = useNavigate()

  const openQuestion = ({ id }: GridRowParams) => navigate(`/questions/${id}`)

  return (
    <Paper elevation={12}>
      <DataGrid
        autoHeight
        disableColumnMenu
        rows={rows}
        columns={columns}
        aria-label="questions table"
        density="comfortable"
        slots={{ toolbar: GridToolbar }}
        getCellClassName={getCellClassName}
        onRowClick={openQuestion}
        initialState={{ pagination: { paginationModel: { pageSize: 25 } } }}
      />
    </Paper>
  )
}

export default QuestionsTable
