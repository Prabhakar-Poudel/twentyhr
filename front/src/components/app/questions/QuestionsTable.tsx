import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { Container } from '@mui/material'
import { ChangeEvent, useState } from 'react'

interface Column {
	id: 'name' | 'creator'
	label: string
}

const columns: readonly Column[] = [
	{ id: 'name', label: 'Name' },
	{ id: 'creator', label: 'Create by' },
]

interface Data {
	id: number
	name: string
	creator: string
}

function createData(id: number, name: string, creator: string): Data {
	return { id, name, creator }
}

const rows = [
	createData(1, 'A quick brown fox', 'You'),
	createData(2, 'Jumps over', 'Me'),
	createData(3, 'A lazy dog', 'You and Me'),
	createData(4, 'United States United States', 'Someone else'),
	createData(5, 'Canada', 'CA'),
	createData(6, 'A quick brown Australian', 'They did it'),
	createData(7, 'Jumped over another  quick Germany', 'Who'),
	createData(8, 'A quick brown fox', 'You'),
	createData(9, 'Jumps over', 'Me'),
	createData(10, 'A lazy dog', 'You and Me'),
	createData(11, 'United States United States', 'Someone else'),
	createData(12, 'Canada', 'CA'),
	createData(13, 'A quick brown Australian', 'They did it'),
	createData(14, 'Jumped over another  quick Germany', 'Who'),
	createData(15, 'A quick brown fox', 'You'),
	createData(16, 'Jumps over', 'Me'),
	createData(17, 'A lazy dog', 'You and Me'),
]

export default function QuestionsTable() {
	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(+event.target.value)
		setPage(0)
	}

	return (
		<Container>
			<Paper sx={{ width: '100%', overflow: 'hidden' }}>
				<TableContainer sx={{ maxHeight: 440 }}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							<TableRow>
								{columns.map((column) => (
									<TableCell key={column.id}>{column.label}</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{rows
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row) => (
									<TableRow key={row.id} hover role="checkbox" tabIndex={-1}>
										{columns.map(({ id }) => (
											<TableCell key={id}>{row[id]}</TableCell>
										))}
									</TableRow>
								))}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[10, 25, 100]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</Container>
	)
}
