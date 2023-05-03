import { Box, LinearProgress, Typography } from '@mui/material'
import OverviewCard from 'src/components/app/settings/Organization/OverviewCard'
import UsersSection from 'src/components/app/settings/Organization/UsersSection'
import { useAuth } from 'src/contexts/AuthContext'
import { useOrganiationsShow } from 'src/queries/Organizations'

const OrganizationPage = () => {
  const { user } = useAuth()
  const organizationId = user?.organization_id ?? '__ERROR__'
  const { data: organization, isLoading: loadingOrganization } = useOrganiationsShow(organizationId)

  if (loadingOrganization) return <LinearProgress />

  return (
    <Box>
      <Box className="mx-4 md:mx-10">
        <Box className="my-4">
          <Typography variant="h4">{organization.name} Settings</Typography>
          <Typography>Manage accounts and access in your organization. View and edit payment information.</Typography>
        </Box>
        <OverviewCard id={organizationId} />
        <Box className="mt-4">
          <UsersSection />
        </Box>
      </Box>
    </Box>
  )
}

export default OrganizationPage
