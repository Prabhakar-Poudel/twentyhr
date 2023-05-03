import { Box, Button, Container, FormControl, FormLabel, TextField, Typography } from '@mui/material'
import { FormEvent, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { CodeInput, OnChangeParams } from 'src/components/shared/CodeInput'
import { RichTextInput } from 'src/components/shared/RichTextInput'
import useToast from 'src/hooks/useToast'
import { QuestionShow, QuestionPayload } from 'src/types/question'

interface Props {
  defaultValues: Partial<QuestionShow>
  onSave: (question: QuestionPayload) => Promise<QuestionShow>
}

const QuestionForm = ({ defaultValues, onSave }: Props) => {
  const navigate = useNavigate()
  const toast = useToast()
  const [starterCode, setStarterCode] = useState(defaultValues.initial_code || '// Hello World')
  const [language, setLanguage] = useState(defaultValues.language || 'javascript')
  const [title, setTitle] = useState(defaultValues.title || '')
  const [description, setDescription] = useState(defaultValues.description || '')
  const [instruction, setInstruction] = useState(defaultValues.instruction || '')
  const [guidelines, setGuidelines] = useState(defaultValues.guidelines || '')

  const buttonText = defaultValues.id ? 'Update' : 'Create'

  const onCodeUpdate = ({ currentValue, language }: OnChangeParams) => {
    setStarterCode(currentValue)
    setLanguage(language)
  }

  const submitForm = (event: FormEvent) => {
    event.preventDefault()
    const body = {
      title,
      description,
      instruction,
      guidelines,
      initial_code: starterCode,
      language,
      status: 'published',
    }
    onSave(body)
      .then(() => {
        toast({ message: 'Question created successfully', type: 'success' })
        navigate('/questions')
      })
      .catch((error) => toast({ message: error.response.statusText, type: 'error' }))
  }

  return (
    <Container maxWidth="md">
      <Box className="my-4">
        <Typography className="my-4" variant="h4">
          Create a new interview question
        </Typography>
      </Box>
      <Box component="form" onSubmit={submitForm}>
        <FormControl fullWidth margin="normal">
          <FormLabel required htmlFor="title">
            Title
          </FormLabel>
          <TextField
            autoFocus
            fullWidth
            required
            inputProps={{ maxLength: 200 }}
            name="title"
            placeholder="Give your question a title"
            helperText="The tile helps you find this question easily"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <FormLabel htmlFor="Description">Description</FormLabel>
          <TextField
            fullWidth
            multiline
            minRows={4}
            maxRows={6}
            inputProps={{ maxLength: 1000 }}
            name="Description"
            placeholder="Add a brief description about your question"
            helperText="Theis helps your peers and you to understand your question"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </FormControl>
        <RichTextInput
          label="Instructions"
          placeholder="Author instructions about this interview"
          helperText="This will be visible to both candidate and interviewers during an interview"
          defaultValue={instruction}
          onChange={setInstruction}
        />
        <RichTextInput
          label="Guidelines"
          placeholder="Author guidelines on how to take this interview"
          helperText="This will be visible only to the interviewers during an interview"
          defaultValue={guidelines}
          onChange={setGuidelines}
        />
        <CodeInput
          defaultValue={starterCode}
          defaultLanguage={language}
          label="Starter code"
          helperText="This code will be prefilled in the editor when interview starts"
          onChange={onCodeUpdate}
        />
        <Box className="my-4 flex flex-row-reverse">
          <Button variant="contained" type="submit">
            {buttonText}
          </Button>
          <Link to="/questions" className="mx-2">
            <Button color="error">Cancel</Button>
          </Link>
        </Box>
      </Box>
    </Container>
  )
}

export default QuestionForm
