import { Box, Button, Container, FormControl, FormLabel, TextField, Typography } from '@mui/material'
import { FormEvent, useState } from 'react'
import { CodeInput, OnChangeParams } from 'src/components/shared/CodeInput'
import { RichTextInput } from 'src/components/shared/RichTextInput'

const QuestionForm = () => {
  const [starterCode, setStarterCode] = useState('// console.log("Hello world")')
  const [language, setLanguage] = useState('javascript')

  const onCodeUpdate = ({ currentValue, language }: OnChangeParams) => {
    setStarterCode(currentValue)
    setLanguage(language)
  }

  const createQuestion = (event: FormEvent) => {
    event.preventDefault()
    console.log(starterCode, language)
  }

  return (
    <Container maxWidth="md">
      <Box className="my-4">
        <Typography className="my-4" variant="h4">Create a new interview question</Typography>
      </Box>
      <Box component="form" onSubmit={createQuestion}>
        <FormControl fullWidth margin="normal">
          <FormLabel required htmlFor="title">Title</FormLabel>
          <TextField
            autoFocus
            fullWidth
            required
            name="title"
            placeholder="Give your question a name"
            helperText="The tile helps you find this question easily"
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
            placeholder="Add brief details about your question"
            helperText="Theis helps your peers and you to understand your question"
          />
        </FormControl>
        <RichTextInput
          id="instructions"
          label="Instructions"
          placeholder="Author interview instructions..."
          helperText="This will be visible to both candidate and interviewers during an interview"
        />
        <RichTextInput
          id="guidelines"
          label="Guidelines"
          placeholder="Author interviewer guidelines..."
          helperText="This will be visible only to the interviewers"
        />
        <CodeInput
          defaultValue='// console.log("Hello world")'
          defaultLanguage="javascript"
          label="Starter code"
          helperText="This code will be prefilled in the editor when interview starts"
          onChange={onCodeUpdate}
        />
        <Box className="my-4">
          <Button fullWidth variant="contained" type="submit">Create</Button>
        </Box>
      </Box>
    </Container>
  )
}

export default QuestionForm
