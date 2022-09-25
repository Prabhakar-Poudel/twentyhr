import { Box } from '@mui/material'
import { useEffect, useRef } from 'react'
import { ActiveUser, TerminalSelection } from 'src/pages/interview/helpers'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import 'xterm/css/xterm.css'

const terminal = new Terminal({
  cursorBlink: true,
  cursorStyle: 'bar',
  cursorWidth: 2,
  fontSize: 16,
  macOptionIsMeta: true,
  theme: { background: '#1F1E1E', selectionForeground: '#1944f8' },
})

const fitAddon = new FitAddon()
terminal.loadAddon(fitAddon)

interface Props {
  activeUsers: ActiveUser[]
  onSelect: (value?: TerminalSelection) => void
  value?: string
}

function TerminalView({ value = '', onSelect, activeUsers }: Props) {
  const resizeObserver = useRef<ResizeObserver>()

  const handleSelect = () => {
    const selection = terminal.getSelectionPosition()
    if (!selection?.start) return

    const start = selection.start
    const length = terminal.getSelection().length
    onSelect({ start, length })
  }

  const applySelection = () => {
    activeUsers.forEach((user) => {
      const selection = user.terminal.selection
      if (!selection) return

      terminal.select(selection.start.x, selection.start.y, selection.length)
    })
  }

  const reFit = () => setTimeout(() => fitAddon.fit(), 100)

  useEffect(() => {
    const container = document.getElementById('terminal-container')
    if (!container) return

    terminal.open(container)
    reFit()
    terminal.focus()
    applySelection()
    terminal.onSelectionChange(handleSelect)

    resizeObserver.current = new ResizeObserver(() => {
      reFit()
      applySelection()
    })
    resizeObserver.current.observe(container)

    return () => {
      resizeObserver.current?.disconnect()
      terminal.dispose()
    }
  }, [])

  useEffect(() => {
    applySelection()
  }, [activeUsers])

  useEffect(() => {
    terminal.writeln(value)
  }, [value])

  return <Box id="terminal-container" className="h-full w-full" />
}

export default TerminalView
