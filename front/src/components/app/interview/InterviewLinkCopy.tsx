import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { IconButton, Tooltip } from '@mui/material'
import useToast from 'src/hooks/useToast'

interface Props {
  link: string
}

const InterviewLinkCopy = ({ link }: Props) => {
  const toast = useToast()

  const onCopy = () => {
    navigator.clipboard.writeText(link).then(() => {
      toast({ message: 'Link copied', type: 'success', duration: 1000 })
    })
  }

  return (
    <Tooltip arrow title="Copy interview link">
      <IconButton aria-label="Copy interview link" onClick={onCopy}>
        <ContentCopyIcon />
      </IconButton>
    </Tooltip>
  )
}

export default InterviewLinkCopy
