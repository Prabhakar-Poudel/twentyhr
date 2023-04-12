import { CircularProgress, Typography } from '@mui/material'
import { useUsersIndex } from 'src/queries/Users'
import UsersTable from './UsersTable'

const UsersSection = () => {
  const { data: users, isLoading } = useUsersIndex()

  if (isLoading) return <CircularProgress color="inherit" />

  return (
    <>
      <Typography variant="h5">Organization Accesses</Typography>
      <UsersTable rows={users} />
    </>
  )
}

export default UsersSection
