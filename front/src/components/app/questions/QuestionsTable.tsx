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
import { QuestionIndex } from 'src/types/question'

interface Props {
	rows: QuestionIndex[]
}

const columns: GridColDef[] = [
	{ field: 'title', headerName: 'Title', width: 400 },
	{ field: 'creator_id', headerName: 'Create by', width: 300 },
	{ field: 'status', headerName: 'Status', width: 100 },
]

function Toolbar() {
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
			<Button variant="contained" className="!rounded-full" startIcon={<EditIcon />}>Compose</Button>
		</GridToolbarContainer>
	);
}

export default function QuestionsTable({ rows }: Props) {
	return (
		<Container>
			<Paper elevation={12}>
				<DataGrid
					autoHeight
					autoPageSize
					rows={rows}
					columns={columns}
					pageSize={10}
					rowsPerPageOptions={[5, 10, 20, 40]}
					checkboxSelection={false}
					aria-label="questions table"
					density="comfortable"
					editMode="row"
					components={{ Toolbar }}
				/>
			</Paper>
		</Container>
	)
}
