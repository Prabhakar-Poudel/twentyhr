import { CssBaseline } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from 'src/contexts/AuthContext'
import { ToastProvider } from 'src/hooks/useToast'
import AccountSettingsPage from 'src/pages/account/AccountSettingsPage'
import ForgotPasswordPage from 'src/pages/account/ForgotPasswordPage'
import LoginPage from 'src/pages/account/LoginPage'
import ResetPasswordPage from 'src/pages/account/ResetPasswordPage'
import SignUpPage from 'src/pages/account/SignUpPage'
import VerifyAccountPage from 'src/pages/account/VerifyAccountPage'
import AdminHome from 'src/pages/admin/AdminHome'
import DashboardPage from 'src/pages/dashboard/DashboardPage'
import EditorPage from 'src/pages/editor/EditorPage'
import InterviewsHome from 'src/pages/interview/InterviewsHome'
import NotFoundPage from 'src/pages/NotFoundPage'
import EditQuestion from 'src/pages/question/EditQuestion'
import NewQuestion from 'src/pages/question/NewQuestion'
import QuestionsHome from 'src/pages/question/QuestionsHome'
import ViewQuestion from 'src/pages/question/ViewQuestion'
import AuthenticatedRoute from 'src/routes/AuthenticatedRoute'
import LoginRoute from 'src/routes/LoginRoute'

const theme = createTheme({
	palette: {
		mode: 'dark',
		primary: { main: '#00c853' },
		secondary: { main: '#834cf3' },
	},
})

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
})

const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline enableColorScheme />
			<ToastProvider>
				<QueryClientProvider client={queryClient}>
					<AuthProvider>
						<Routes>
							<Route element={<LoginRoute />}>
								<Route path="login" element={<LoginPage />} />
								<Route path="forgot-password" element={<ForgotPasswordPage />} />
								<Route path="reset-password" element={<ResetPasswordPage />} />
								<Route path="signup" element={<SignUpPage />} />
								<Route path="verify-account" element={<VerifyAccountPage />} />
							</Route>
							<Route element={<AuthenticatedRoute />}>
								<Route path="questions" element={<QuestionsHome />}>
									<Route path=":id" element={<ViewQuestion />} />
								</Route>
								<Route path="questions/new" element={<NewQuestion />} />
								<Route path="questions/:id/edit" element={<EditQuestion />} />
								<Route path="interviews" element={<InterviewsHome />} />
								<Route path="interviews/:id" element={<EditorPage />} />
								<Route path="account" element={<AccountSettingsPage />} />
								<Route path="admin/*" element={<AdminHome />} />
								<Route path="/" element={<DashboardPage />} />
							</Route>
							<Route path="*" element={<NotFoundPage />} />
						</Routes>
					</AuthProvider>
				</QueryClientProvider>
			</ToastProvider>
		</ThemeProvider>
	)
}

export default App
