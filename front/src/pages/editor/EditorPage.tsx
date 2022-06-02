import { LinearScale } from '@mui/icons-material'
import { SelectChangeEvent } from '@mui/material'
import { useEffect, useState } from 'react'
import * as monaco from 'monaco-editor'
import { loader } from '@monaco-editor/react'
import { useParams } from 'react-router'
import EditorHeader from 'src/components/app/editor/edotorHeader/EditorHeader'
import EditorBody from 'src/components/app/editor/editorBody/EditorBody'
import EditorFooter from 'src/components/app/editor/editorFooter/EditorFooter'
import { axios } from 'src/lib/axios/axios'
import { useInterviewShow } from 'src/queries/Interviews'
import { QuestionShow } from 'src/types/question'
import defaultEditorOptions, { SUPPORTED_LANGUAGES } from './editorConfig'
import EditorDrawer from 'src/components/app/editor/editorBody/EditorDrawer'
import EditorSticky from 'src/components/app/editor/editorBody/EditorSticky'

const EditorPage = () => {
  const { id } = useParams()
  const { data: interview, isLoading  } = useInterviewShow(id!)
  const [fontSize, setFontSize] = useState<number>(defaultEditorOptions.fontSize)
  const [theme, setTheme] = useState<string>('vs-dark')
  const [language, setLanguage] = useState<string>('')
  const [code, setCode] = useState<string>()
  const [question, setQuestion] = useState<QuestionShow>()
  const [availableLanguages, setAvailableLanguages] = useState<monaco.languages.ILanguageExtensionPoint[]>([])
  const [showDrawer, setShowDrawer] = useState(false)

  const onFontSizeChange = (event: Event, value: number) => setFontSize(value)
  const onThemeChange =  (event: SelectChangeEvent) => setTheme(event.target.value)

  useEffect(() => {
    loader.config({ monaco })
  }, [])

  useEffect(() => {
    if (interview?.question) changeQuestion(interview.question.id)
  }, [interview])

  const changeQuestion = async (questionId: string) => {
    const question = await axios.get<QuestionShow>(`/questions/${questionId}`).then(({ data }) => data)
    console.log(question)
    setQuestion(question)
    setLanguage(question.language!)
    setCode(question.initial_code)
  }

  const onLanguagesFetch = (languages: monaco.languages.ILanguageExtensionPoint[]) => {
    setAvailableLanguages(languages.filter(({ id }) => SUPPORTED_LANGUAGES.includes(id)))
  }

  const onDrawerToggle = () => setShowDrawer(!showDrawer)
  const terminalContent = 'Hello from \x1B[1;3;31mxterm.js\x1B[0m $ '

  if(isLoading) return <LinearScale />
  if(!isLoading && !interview) return <div>Interview not found</div>

  return (
    <div className="flex h-screen w-screen">
      <div className="flex flex-col flex-grow">
        <EditorHeader interview={interview} currentQuestion={question} onChangeQuestion={changeQuestion} />
        <EditorBody theme={theme} defaultEditorOptions={{ ...defaultEditorOptions, fontSize }} language={language} defaultValue={code} setLanguages={onLanguagesFetch} />
        <EditorFooter fontSize={fontSize} setFontSize={onFontSizeChange} theme={theme} setTheme={onThemeChange} currentLanguage={language} availableLanguages={availableLanguages} setLanguage={setLanguage}/>
      </div>
      <div>
        <EditorSticky open={showDrawer} onClick={onDrawerToggle} />
        {question && (
          <EditorDrawer
            open={showDrawer}
            instructions={question.instruction}
            guidelines={question.guidelines}
            terminalContent={terminalContent} />
        )}
      </div>
    </div>
  )
}

export default EditorPage
