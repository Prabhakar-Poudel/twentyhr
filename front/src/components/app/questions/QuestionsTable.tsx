import * as React from "react"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"
import { Container } from "@mui/material"

interface Column {
  id: "name" | "creator"
  label: string
  minWidth?: number
  align?: "right"
  format?: (value: number) => string
}

const columns: readonly Column[] = [
  { id: "name", label: "Name" },
  { id: "creator", label: "Create by" },
]

interface Data {
  name: string
  creator: string
}

function createData(name: string, creator: string): Data {
  return { name, creator }
}

const rows = [
  createData("A quick brown fox", "You"),
  createData("Jumps over", "Me"),
  createData("A lazy dog", "You and Me"),
  createData("United States United States", "Someone else"),
  createData("Canada", "CA"),
  createData("A quick brown Australian", "They did it"),
  createData("Jumped over another  quick Germany", "Who"),
  createData("A quick brown fox", "You"),
  createData("Jumps over", "Me"),
  createData("A lazy dog", "You and Me"),
  createData("United States United States", "Someone else"),
  createData("Canada", "CA"),
  createData("A quick brown Australian", "They did it"),
  createData("Jumped over another  quick Germany", "Who"),
  createData("A quick brown fox", "You"),
  createData("Jumps over", "Me"),
  createData("A lazy dog", "You and Me"),
  createData("United States United States", "Someone else"),
  createData("Canada", "CA"),
  createData("A quick brown Australian", "They did it"),
  createData("Jumped over another  quick Germany", "Who"),
]

export default function QuestionsTable() {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Container>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
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
                  <TableRow hover role="checkbox" tabIndex={-1}>
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
