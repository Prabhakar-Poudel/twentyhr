import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Routes, Route } from 'react-router-dom'
import EditorPage from 'src/pages/editor/EditorPage'
import LandingPage from 'src/pages/landing/LandingPage'
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
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="editor" element={<EditorPage />} />
        <Route path="landing" element={<LandingPage />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
