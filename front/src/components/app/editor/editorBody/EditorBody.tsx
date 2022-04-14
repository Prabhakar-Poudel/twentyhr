import MonacoEditor from '@monaco-editor/react'
import { Skeleton } from '@mui/material'
import { MonacoEditorOptions } from 'src/types/editorConfig'

interface EditorBodyProps {
  defaultEditorOptions: MonacoEditorOptions
}

const LoadingEditor = () => (
  <Skeleton
    animation="wave"
    width="100%"
    height="100%"
    variant="rectangular"
    sx={{ bgcolor: 'grey.900' }}
  />
)

const EditorBody = ({ defaultEditorOptions }: EditorBodyProps) => {
  return (
    <div className="grow flex">
      <MonacoEditor
        defaultLanguage="php"
        defaultValue=""
        theme="vs-dark"
        options={defaultEditorOptions}
        loading={<LoadingEditor />}
      />
    </div>
  )
}

export default EditorBody
