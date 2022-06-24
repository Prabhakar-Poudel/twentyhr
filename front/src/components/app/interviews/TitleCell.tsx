import { Box, Link, Typography } from '@mui/material'
import { GridRenderCellParams } from '@mui/x-data-grid'
import { MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'

export function TitleCell({ row }: GridRenderCellParams) {
  const navigate = useNavigate()

  const openQuestion = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    navigate(`/questions/${row.question.id}`)
  }

  return (
    <Box className="w-full flex flex-col">
      <Typography component="div" variant="h6" className="truncate ...">
        {row.title}
      </Typography>
      {row.question && (
        <Box onClick={openQuestion} component={Link} className="w-fit">
          {row.question.title}
        </Box>
      )}
    </Box>
  )
}
