import { Box } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import InterviewTitle from 'src/components/app/interview/interviewHeader/InterviewTitle'
import QuestionsDropdown from 'src/components/app/interview/interviewHeader/QuestionsDropdown'
import { axios } from 'src/lib/axios/axios'
import { InterviewShow } from 'src/types/interview'
import { QuestionShow } from 'src/types/question'

interface Props {
	currentQuestion?: QuestionShow
	onChangeQuestion: (questionId: string) => void
	interview: InterviewShow
}

const InterviewHeader = ({ currentQuestion, onChangeQuestion, interview }: Props) => {
	const onTitleChange = (title: string) => {
		if (!title.length) return
		axios.put(`/interviews/${interview.id}`, { interview: { title } })
	}

	return (
		<AppBar position="relative">
			<Toolbar variant="dense">
				<Box className="flex grow gap-4 mb-0.5">
					<InterviewTitle defaultValue={interview.title} onChange={onTitleChange} />
					<QuestionsDropdown onChange={onChangeQuestion} currentQuestion={currentQuestion} />
				</Box>
			</Toolbar>
		</AppBar>
	)
}

export default InterviewHeader
