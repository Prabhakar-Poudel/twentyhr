import { ThemeProvider, createTheme } from '@mui/material/styles'
import EditorPage from 'src/pages/editor/EditorPage'

const App = () => {
  const theme = createTheme({ palette: { mode: 'dark' } })

  return (
    <ThemeProvider theme={theme}>
      <EditorPage />
    </ThemeProvider>
  )
}

export default App
