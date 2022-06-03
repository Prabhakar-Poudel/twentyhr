import { Box } from '@mui/material'
import { useEffect } from 'react'
import { Terminal } from 'xterm'

const TERMINAL = new Terminal({
  theme: { background: '#121212' },
  fontSize: 16,
})

interface Props {
  value?: string
}

const TerminalView = ({ value = '' }: Props) => {

  useEffect(() => {
    const container = document.getElementById('terminal-container')
    if(!container) return
    TERMINAL.open(container)
    TERMINAL.writeln(value)
    TERMINAL.focus()
    return () => TERMINAL.dispose()
  }, [])

  return (
    <Box id="terminal-container"/>
  )
}

export default TerminalView
