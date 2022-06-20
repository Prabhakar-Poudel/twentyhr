import { Box } from '@mui/material'
import { useEffect, useRef } from 'react'
import { COLOR_VALUE } from 'src/constants/colors'
import { ActiveUser, TerminalSelection } from 'src/pages/interview/helpers'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'

const terminal = new Terminal({
  cursorBlink: true,
  cursorStyle: 'bar',
  cursorWidth: 2,
  fontSize: 16,
  macOptionIsMeta: true,
  theme: { background: '#1F1E1E', selection: '#1944f8' },
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
    if (!selection?.startRow) return

    const numberOfColumns = terminal.cols
    const start = selection.startRow * numberOfColumns + selection.startColumn
    const length = terminal.getSelection().length
    onSelect({ start, length })
  }

  const applySelection = () => {
    activeUsers.forEach(user => {
      const selection = user.terminal.selection
      if(!selection) return

      const numberOfColumns = terminal.cols
      const row = Math.floor(selection.start / numberOfColumns)
      const col = selection.start % numberOfColumns
      terminal.select(col, row, selection.length )
    })
  }

  useEffect(() => {
    const container = document.getElementById('terminal-container')
    if (!container) return

    terminal.open(container)
    fitAddon.fit()
    terminal.focus()
    terminal.onSelectionChange(handleSelect)

    resizeObserver.current = new ResizeObserver(() => {
      fitAddon.fit()
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
