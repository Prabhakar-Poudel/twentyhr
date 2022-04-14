import { ThemeProvider, createTheme } from '@mui/material/styles'
import LoginPage from 'src/pages/login/LoginPage'

const App = () => {
  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: { main: '#00c853' },
      secondary: { main: '#5e35b1' },
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <LoginPage />
    </ThemeProvider>
  )
}

export default App
