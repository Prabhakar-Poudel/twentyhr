import Drawer from '@mui/material/Drawer'
import { useEffect, useRef } from 'react'
import { Terminal } from 'xterm'
import 'xterm/css/xterm.css'

interface EditorDrawerProps {
  open: boolean
}

const EditorDrawer = ({ open }: EditorDrawerProps) => {
  const terminalRef = useRef<Terminal | null>(null)

  useEffect(() => {
    const container = document.getElementById('terminal-container')
    if (!container || terminalRef.current) return
    const term = new Terminal({ theme: { background: '#1e1e1e' }, cursorBlink: true, fontSize: 16, disableStdin: false })
    term.open(container)
    term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
    terminalRef.current = term
  }, [])

  useEffect(() => {
    if(open && terminalRef.current) terminalRef.current.focus()
    else if(terminalRef.current) terminalRef.current.blur()
  }, [open])

  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={open}
    >
      <div id="terminal-container" className="h-full" />
    </Drawer>
  )
}

export default EditorDrawer
