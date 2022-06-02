import { Box } from '@mui/material'
import { useEffect } from 'react'
import { Terminal } from 'xterm'

const TERMINAL = new Terminal({
  theme: { background: '#121212' },
  cursorBlink: true,
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
    TERMINAL.write(value)
    TERMINAL.focus()

    console.log(TERMINAL.cols, TERMINAL.rows)

    return () => TERMINAL.dispose()
  }, [])

  return (
    <Box id="terminal-container"/>
  )
}

export default TerminalView
