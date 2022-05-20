import Paper from '@mui/material/Paper'
import { Box, Button, Container } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import {
	DataGrid,
	GridColDef,
	GridToolbarColumnsButton,
	GridToolbarContainer,
	GridToolbarDensitySelector,
	GridToolbarFilterButton,
	GridToolbarQuickFilter,
} from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'
import { StatusChip } from 'src/components/app/questions/StatusChip'
import { QuestionIndex } from 'src/types/question'

interface Props {
	rows: QuestionIndex[]
	onRowClick: (rowId: string) => void
}

const columns: GridColDef[] = [
	{ field: 'title', headerName: 'Title', width: 400 },
	{ field: 'creator_id', headerName: 'Create by', width: 300 },
	{ field: 'status', headerName: 'Status', width: 150, renderCell: StatusChip },
]

const Toolbar = () => {
	const navigate = useNavigate()

	const onNewQuestion = () => navigate('/questions/new')


	return (
		<GridToolbarContainer className="justify-between">
			<Box>
				<GridToolbarQuickFilter debounceMs={500} />
			</Box>
			<Box>
				<GridToolbarColumnsButton />
				<GridToolbarFilterButton />
				<GridToolbarDensitySelector />
			</Box>
			<Button variant="contained" className="!rounded-full" startIcon={<EditIcon />} onClick={onNewQuestion}>Compose</Button>
		</GridToolbarContainer>
	)
}

export default function QuestionsTable({ rows, onRowClick }: Props) {
	return (
		<Container>
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
					onRowClick={(row) => onRowClick(row.id as string)}
					className="cursor-pointer"
				/>
			</Paper>
		</Container>
	)
}
