import Paper from '@mui/material/Paper'
import { Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import {
	DataGrid,
	GridColDef, GridRowParams,
	GridToolbarContainer,
	GridToolbarFilterButton,
	GridToolbarQuickFilter,
} from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'
import { creatorGetter } from 'src/components/app/questions/helpers'
import { RowActions } from 'src/components/app/questions/RowActions'
import { StatusCell } from 'src/components/app/questions/StatusCell'
import { TitleCell } from 'src/components/app/questions/TitleCell'
import { QuestionIndex } from 'src/types/question'

interface Props {
	rows: QuestionIndex[]
}

const columns: GridColDef[] = [
	{ field: 'title', headerName: 'Title', minWidth: 400, renderCell: TitleCell },
	{ field: 'creator_id', headerName: 'Create by', width: 300, valueGetter: creatorGetter },
	{ field: 'status', headerName: 'Status', width: 120, renderCell: StatusCell },
	{ field: 'actions', headerName: '', width: 150, renderCell: RowActions, disableColumnMenu: true, disableExport: true, disableReorder: true, filterable: false, groupable: false, hideable: false, resizable: false, sortable: false },
]

const Toolbar = () => {
	const navigate = useNavigate()

	const onNewQuestion = () => navigate('/questions/new')

	return (
		<GridToolbarContainer className="justify-between">
			<div>
				<GridToolbarQuickFilter debounceMs={500} placeholder="Search everywhere..." />
				<GridToolbarFilterButton />
			</div>
			<Button variant="contained" className="!rounded-full" startIcon={<EditIcon />} onClick={onNewQuestion}>Compose</Button>
		</GridToolbarContainer>
	)
}

const QuestionsTable = ({ rows }: Props) => {
	const navigate = useNavigate()

	const getCellClassName = () => 'focus:!outline-none focus-within:!outline-none cursor-pointer'
	const openQuestion = ({ id }: GridRowParams) => navigate(`/questions/${id}`)

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
				aria-label="questions table"
				density="comfortable"
				components={{ Toolbar }}
				getCellClassName={getCellClassName}
				onRowClick={openQuestion}
			/>
		</Paper>
	)
}

export default QuestionsTable
