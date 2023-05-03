import { Box, Card, CardContent, CircularProgress, Typography } from '@mui/material'
import { useOrganiationsOverviewShow } from 'src/queries/organizations/overview'

interface Props {
  id: string
}

const OverviewCard = ({ id }: Props) => {
  const { data: status, isLoading } = useOrganiationsOverviewShow(id)

  if (isLoading) return <CircularProgress color="inherit" />

  return (
    <Card raised className="w-80">
      <CardContent>
        <Box>
          <Typography color="text.secondary" gutterBottom>
            Interviews
          </Typography>
          <Typography>{status.interviews}</Typography>
        </Box>
        <Box className="mt-4">
          <Typography color="text.secondary" gutterBottom>
            Members
          </Typography>
          <Typography>{status.users}</Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default OverviewCard
