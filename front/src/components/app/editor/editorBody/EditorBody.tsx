import MonacoEditor from '@monaco-editor/react'
import { MonacoEditorOptions } from 'src/types/editorConfig'

interface EditorBodyProps {
  defaultEditorOptions: MonacoEditorOptions
}

const EditorBody = ({ defaultEditorOptions }: EditorBodyProps) => {
  return (
    <div className="grow flex">
      <MonacoEditor
        defaultLanguage="javascript"
        defaultValue=""
        theme="vs-dark"
        options={defaultEditorOptions}
      />
    </div>
  )
}

export default EditorBody
