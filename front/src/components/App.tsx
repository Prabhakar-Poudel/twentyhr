import { CssBaseline } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Routes, Route } from 'react-router-dom'
import EditorPage from 'src/pages/editor/EditorPage'
import DashboardPage from 'src/pages/dashboard/DashboardPage'
import LoginPage from 'src/pages/login/LoginPage'
import QuestionsHome from 'src/pages/question/QuestionsHome'
import AdminHome from 'src/pages/admin/AdminHome'

const theme = createTheme({
	palette: {
		mode: 'dark',
		primary: { main: '#00c853' },
		secondary: { main: '#5e35b1' },
	},
})

const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline enableColorScheme />
			<Routes>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/editor" element={<EditorPage />} />
				<Route path="/questions" element={<QuestionsHome />} />
				<Route path="/admin/*" element={<AdminHome />} />
				<Route path="/" element={<DashboardPage />} />
			</Routes>
		</ThemeProvider>
	)
}

export default App
