import logo from 'src/assets/logos/logo192.png'
import HeaderOptions from './HeaderOptions'

interface EditorHeaderProps {
  fontSize: number
  setFontSize: (event: any) => void
}

const EditorHeader = ({ fontSize, setFontSize }: EditorHeaderProps) => {
  return (
    <header className="p-2 bg-stone-900 flex">
      <img src={logo} alt="logo" className="w-7 h-7" />
      <HeaderOptions fontSize={fontSize} setFontSize={setFontSize} />
    </header>
  )
}

export default EditorHeader
