import MonacoEditor from '@monaco-editor/react'
import { useState } from 'react'
import { MonacoEditorOptions } from 'src/types/editorConfig'
import EditorDrawer from './EditorDrawer'
import EditorSticky from './EditorSticky'


interface EditorBodyProps {
  defaultEditorOptions: MonacoEditorOptions
}

const EditorBody = ({ defaultEditorOptions }: EditorBodyProps) => {
  const [showDrawer, setShowDrawer] = useState(false)

  return (
    <div className="grow flex">
      <MonacoEditor
        defaultLanguage="javascript"
        defaultValue=""
        theme="vs-dark"
        options={defaultEditorOptions}
      />
      <EditorDrawer open={showDrawer} />
      <EditorSticky onClick={() => setShowDrawer(!showDrawer)}/>
    </div>
  )
}

export default EditorBody
