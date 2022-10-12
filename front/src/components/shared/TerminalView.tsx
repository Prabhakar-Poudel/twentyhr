import { Box, Button } from '@mui/material'
import { useEffect, useRef } from 'react'
import { COLOR_VALUE } from 'src/constants/colors'
import { ActiveUser } from 'src/pages/interview/helpers'
import { IBufferRange, Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import 'xterm/css/xterm.css'

interface Props {
  activeUsers: ActiveUser[]
  onSelect: (value?: IBufferRange) => void
  value?: string
}

function TerminalView({ value = '', onSelect, activeUsers }: Props) {
  const resizeObserver = useRef<ResizeObserver>()
  const terminal = useRef<InstanceType<typeof Terminal>>()
  const fitAddon = useRef<InstanceType<typeof FitAddon>>()

  useEffect(() => {
    if (terminal.current) return

    const term = new Terminal({
      allowProposedApi: true,
      convertEol: true,
      cursorBlink: true,
      cursorStyle: 'bar',
      disableStdin: true,
      fontSize: 16,
      macOptionIsMeta: true,
      theme: { background: '#1F1E1E', selectionForeground: '#1F1E1E', selectionBackground: 'white' },
    })
    const addon = new FitAddon()
    term.loadAddon(addon)
    terminal.current = term
    fitAddon.current = addon
  }, [activeUsers])

  const handleSelect = () => {
    if (!terminal.current) return
    onSelect(terminal.current.getSelectionPosition())
  }

  const clearMarkers = () => terminal.current?.markers.forEach((marker) => marker.dispose())

  const applySelection = () => {
    clearMarkers()

    const cursorY = terminal.current?.buffer.active.cursorY
    activeUsers.forEach((user) => {
      const selection = user.terminal.selection
      if (!selection) return
      const marker = terminal.current?.registerMarker(selection.start.y - cursorY!)
      if (!marker) return

      terminal.current?.registerDecoration({
        marker,
        x: selection.start.x,
        width: selection.end.x - selection.start.x,
        height: selection.end.y - selection.start.y,
        backgroundColor: COLOR_VALUE[user.bgColor],
        foregroundColor: '#FFFFFF',
      })
    })
  }

  const reFit = () => setTimeout(() => fitAddon.current?.fit(), 100)

  useEffect(() => {
    const container = document.getElementById('terminal-container')
    if (!container || !terminal.current) return

    terminal.current.open(container)
    reFit()
    terminal.current.focus()
    applySelection()
    terminal.current.onSelectionChange(handleSelect)

    resizeObserver.current = new ResizeObserver(() => {
      reFit()
      applySelection()
    })
    resizeObserver.current.observe(container)

    return () => {
      resizeObserver.current?.disconnect()
      terminal.current?.dispose()
    }
  }, [terminal.current])

  useEffect(() => {
    applySelection()
  }, [activeUsers])

  useEffect(() => {
    terminal.current?.writeln(value)
    terminal.current?.scrollToBottom()
  }, [value])

  const clearTerminal = () => terminal.current?.clear()

  if (!terminal.current) return null
  return (
    <Box id="terminal-container" className="h-full w-full">
      <Button color="warning" size="small" className="!absolute right-1.5 z-10" onClick={clearTerminal}>
        Clear
      </Button>
    </Box>
  )
}

export default TerminalView
