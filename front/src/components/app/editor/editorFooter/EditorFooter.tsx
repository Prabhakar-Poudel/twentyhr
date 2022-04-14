import { AppBar } from '@mui/material'
import IdeConfiguration from './IdeConfiguration'

interface EditorFooterProps {
  fontSize: number
  setFontSize: (event: any) => void
}

const EditorFooter = ({ fontSize, setFontSize }: EditorFooterProps) => {
  return (
    <AppBar position="relative">
      <IdeConfiguration fontSize={fontSize} setFontSize={setFontSize} />
    </AppBar>
  )
}

export default EditorFooter
