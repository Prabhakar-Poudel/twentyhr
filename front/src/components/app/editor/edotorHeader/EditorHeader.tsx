import { Box } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import HomeLogo from 'src/components/app/appHeader/HomeLogo'
import InterviewTitle from 'src/components/app/editor/edotorHeader/InterviewTitle'
import QuestionsDropdown from 'src/components/app/editor/edotorHeader/QuestionsDropdown'
import { axios } from 'src/lib/axios/axios'
import { Interview } from 'src/types/interview'
import { QuestionShow } from 'src/types/question'

interface Props {
	currentQuestion?: QuestionShow
	onChangeQuestion: (questionId: string) => void
	interview: Interview
}

const EditorHeader = ({ currentQuestion, onChangeQuestion, interview }: Props) => {
	const onTitleChange = (title: string) => {
		if (!title.length) return
		axios.put(`/interviews/${interview.id}`, { interview: { title } })
	}

	return (
		<AppBar position="relative">
			<Toolbar className="gap-4">
				<HomeLogo />
				<Box className="grow flex gap-4">
					<InterviewTitle defaultValue={interview.title} onChange={onTitleChange} />
					<QuestionsDropdown onChange={onChangeQuestion} currentQuestion={currentQuestion} />
				</Box>
			</Toolbar>
		</AppBar>
	)
}

export default EditorHeader
