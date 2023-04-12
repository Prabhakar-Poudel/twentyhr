import { CssBaseline } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from 'src/contexts/AuthContext'
import { ToastProvider } from 'src/hooks/useToast'
import NotFoundPage from 'src/pages/NotFoundPage'
import ForgotPasswordPage from 'src/pages/account/ForgotPasswordPage'
import LoginPage from 'src/pages/account/LoginPage'
import ResetPasswordPage from 'src/pages/account/ResetPasswordPage'
import SignUpPage from 'src/pages/account/SignUpPage'
import VerifyAccountPage from 'src/pages/account/VerifyAccountPage'
import DashboardPage from 'src/pages/dashboard/DashboardPage'
import InterviewPage from 'src/pages/interview/InterviewPage'
import InterviewsHome from 'src/pages/interview/InterviewsHome'
import EditQuestion from 'src/pages/question/EditQuestion'
import NewQuestion from 'src/pages/question/NewQuestion'
import QuestionsHome from 'src/pages/question/QuestionsHome'
import ViewQuestion from 'src/pages/question/ViewQuestion'
import AccountSettingsPage from 'src/pages/settings/AccountPage'
import OrganizationSettingsPage from 'src/pages/settings/OrganizationPage'
import SettingsLayout from 'src/pages/settings/SettingsLayout'
import UsageSettingsPage from 'src/pages/settings/UsagePage'
import AuthenticatedRoute from 'src/routes/AuthenticatedRoute'
import LoginRoute from 'src/routes/LoginRoute'
import './colors.css'

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

const App = () => (
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
              <Route path="settings" element={<SettingsLayout />}>
                <Route path="account" element={<AccountSettingsPage />} />
                <Route path="organization" element={<OrganizationSettingsPage />} />
                <Route path="usage" element={<UsageSettingsPage />} />
              </Route>
              <Route path="/" element={<DashboardPage />} />
            </Route>
            <Route path="interviews/:id" element={<InterviewPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AuthProvider>
      </QueryClientProvider>
    </ToastProvider>
  </ThemeProvider>
)

export default App
