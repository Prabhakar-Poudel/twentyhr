import { FilterOptionsState } from '@mui/base/AutocompleteUnstyled/useAutocomplete'
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Box,
  TextField,
  Typography
} from '@mui/material'
import { HTMLAttributes, SyntheticEvent } from 'react'
import { useQuestionsIndex } from 'src/queries/Questions'
import { QuestionIndex, QuestionShow } from 'src/types/question'

const OptionItem = (props: HTMLAttributes<HTMLLIElement>, question: QuestionIndex) =>
  <li {...props} key={question.id}>
    <Box className="w-full flex flex-col">
      <Typography variant="body1" className="truncate ...">{question.title}</Typography>
      <Typography variant="body2" className="truncate ...">{question.description}</Typography>
    </Box>
  </li>

const InputField = (props: AutocompleteRenderInputParams) => <TextField { ...props } variant="filled" label="Question" />

interface Props {
  currentQuestion?: QuestionShow
  onChange?: (questionId: string) => void
}

const QuestionsDropdown = ({ currentQuestion, onChange }: Props) => {
  const { data, isLoading } = useQuestionsIndex()
  if (isLoading) return null

  const filterOptions = (options: QuestionIndex[], state: FilterOptionsState<QuestionIndex>) => {
    const input = state.inputValue.toLowerCase()
    return options.filter(option => option.title.toLowerCase().includes(input))
  }

  const onDropdownSelect = (event: SyntheticEvent, value: QuestionIndex) => {
    if (onChange) onChange(value.id)
  }

  return (
    <Autocomplete
      className="w-72 h-3/5"
      componentsProps={{ paper: { elevation: 12 }}}
      disableClearable
      filterOptions={filterOptions}
      getOptionLabel={(option: QuestionIndex) => option.title || ''}
      id="combo-box-demo"
      isOptionEqualToValue={(option: QuestionIndex, value: QuestionIndex) => option.id === value.id}
      onChange={onDropdownSelect}
      options={data}
      renderInput={InputField}
      renderOption={OptionItem}
      size="small"
      // @ts-ignore
      value={currentQuestion || null}
    />
  )
}

export default QuestionsDropdown
