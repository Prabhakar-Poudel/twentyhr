import * as monaco from 'monaco-editor'
import { Pointer, SelectedElements } from 'src/components/shared/DrawInput'
import { BG_COLORS, ColorKey } from 'src/constants/colors'
import { User } from 'src/types/user'
import { IBufferRange, IMarker } from 'xterm'

export interface ActiveUser {
  id: string
  name: string
  bgColor: ColorKey
  editorHighlights: {
    selection: monaco.editor.IModelDeltaDecoration
    cursor: monaco.editor.IModelDeltaDecoration
  }
  drawing: {
    pointer?: Pointer
    button?: 'down' | 'up'
    selectedElementIds?: SelectedElements
  }
  terminal: {
    selection?: IBufferRange
  }
}

interface Selection {
  startLineNumber: number
  endLineNumber: number
  startColumn: number
  endColumn: number
}

interface SelectionData {
  selection: Selection
  user: string
}

interface TerminalSelectionData {
  selection: IBufferRange
  user: string
}

interface CursorData {
  position: monaco.Position
  user: string
}

interface PointerData {
  pointer: Pointer
  button: 'up' | 'down'
  user: string
  selectedElementIds: SelectedElements
}

const blankDecoration = () => ({ range: new monaco.Range(0, 0, 0, 0), options: {} })

const defaultEditorHighlights = () => ({
  selection: blankDecoration(),
  cursor: blankDecoration(),
})

export const formatActiveUsers = (existingUsers: ActiveUser[], newUsers: ActiveUser[]): ActiveUser[] =>
  newUsers.map((user, idx) => {
    const existingUser = existingUsers.find((existingUser) => existingUser.id === user.id)
    if (existingUser) return { ...user, ...existingUser, bgColor: BG_COLORS[idx] }
    return {
      ...user,
      editorHighlights: defaultEditorHighlights(),
      drawing: {},
      terminal: {},
      bgColor: BG_COLORS[idx],
    }
  })

export const getSelectionData = (selection: monaco.Selection, user: User): SelectionData => {
  const { startLineNumber, endLineNumber, startColumn, endColumn } = selection
  return { selection: { startLineNumber, endLineNumber, startColumn, endColumn }, user: user.id }
}

export const setSelection = (activeUsers: ActiveUser[], data: SelectionData): ActiveUser[] => {
  const { startLineNumber, endLineNumber, startColumn, endColumn } = data.selection
  const _activeUsers = [...activeUsers]
  const activeUser = _activeUsers.find((user) => user.id === data.user)

  if (!activeUser) return activeUsers
  activeUser.editorHighlights.selection = {
    range: new monaco.Range(startLineNumber, startColumn, endLineNumber, endColumn),
    options: { className: `${activeUser.bgColor} opacity-30` },
  }
  return _activeUsers
}

export const setCursor = (activeUsers: ActiveUser[], data: CursorData): ActiveUser[] => {
  const { lineNumber, column } = data.position
  const _activeUsers = [...activeUsers]
  const activeUser = _activeUsers.find((user) => user.id === data.user)

  if (!activeUser) return activeUsers
  activeUser.editorHighlights.cursor = {
    range: new monaco.Range(lineNumber, column, lineNumber, column + 1),
    options: { className: `${activeUser.bgColor} remote-cursor animate-pulse` },
  }
  return _activeUsers
}

export const setPointer = (activeUsers: ActiveUser[], data: PointerData): ActiveUser[] => {
  const { pointer, button, selectedElementIds } = data
  const _activeUsers = [...activeUsers]
  const activeUser = _activeUsers.find((user) => user.id === data.user)

  if (!activeUser) return activeUsers
  if (!activeUser.drawing) activeUser.drawing = {} // crashes on re-renders
  activeUser.drawing.pointer = pointer
  activeUser.drawing.button = button
  activeUser.drawing.selectedElementIds = selectedElementIds
  return _activeUsers
}

export const setTerminalSelection = (activeUsers: ActiveUser[], data: TerminalSelectionData): ActiveUser[] => {
  const _activeUsers = [...activeUsers]
  const activeUser = _activeUsers.find((user) => user.id === data.user)

  if (!activeUser) return activeUsers
  activeUser.terminal.selection = data.selection
  return _activeUsers
}
