import * as monaco from 'monaco-editor'
import { loader } from '@monaco-editor/react'
import EditorHeader from 'src/components/app/editor/edotorHeader/EditorHeader'
import EditorBody from 'src/components/app/editor/editorBody/EditorBody'
import EditorFooter from 'src/components/app/editor/editorFooter/EditorFooter'
import defaultEditorOptions from './editorConfig'
import { useEffect, useState } from 'react'

const EditorPage = () => {
  const [fontSize, setInputVal] = useState<number>(defaultEditorOptions.fontSize)

  const onFontSizeChange = (event: any) => {
    setInputVal(event.target.value)
  }

  useEffect(() => {
    loader.config({ monaco })
  }, [])

  return (
    <div className="flex h-screen w-screen flex-col">
      <EditorHeader fontSize={fontSize} setFontSize={onFontSizeChange} />
      <EditorBody defaultEditorOptions={{ ...defaultEditorOptions, fontSize }} />
      <EditorFooter />
    </div>
  )
}

export default EditorPage
