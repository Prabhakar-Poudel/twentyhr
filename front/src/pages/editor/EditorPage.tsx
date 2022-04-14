import { useEffect, useState } from 'react'
import * as monaco from 'monaco-editor'
import { loader } from '@monaco-editor/react'
import EditorHeader from 'src/components/app/editor/edotorHeader/EditorHeader'
import EditorBody from 'src/components/app/editor/editorBody/EditorBody'
import EditorFooter from 'src/components/app/editor/editorFooter/EditorFooter'
import defaultEditorOptions from './editorConfig'
import EditorDrawer from 'src/components/app/editor/editorBody/EditorDrawer'
import EditorSticky from 'src/components/app/editor/editorBody/EditorSticky'

const EditorPage = () => {
  const [fontSize, setInputVal] = useState<number>(defaultEditorOptions.fontSize)
  const [showDrawer, setShowDrawer] = useState(false)


  const onFontSizeChange = (event: any) => {
    setInputVal(event.target.value)
  }

  useEffect(() => {
    loader.config({ monaco })
  }, [])

  return (
    <div className="flex h-screen w-screen">
      <div className="flex flex-col flex-grow">
        <EditorHeader />
        <EditorBody defaultEditorOptions={{ ...defaultEditorOptions, fontSize }} />
        <EditorFooter fontSize={fontSize} setFontSize={onFontSizeChange} />
      </div>
      <div>
        <EditorSticky onClick={() => setShowDrawer(!showDrawer)}/>
        <EditorDrawer open={showDrawer} />
      </div>
    </div>
  )
}

export default EditorPage
