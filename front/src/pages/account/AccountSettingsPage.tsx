import { Box, Button, TextField, Typography } from '@mui/material'
import { FormEvent, useState } from 'react'
import AppHeader from 'src/components/app/appHeader/AppHeader'
import { useAuth } from 'src/contexts/AuthContext'
import useToast from 'src/hooks/useToast'
import { axios } from 'src/lib/axios/axios'
import { User } from 'src/types/user'

function AccountSettingsPage() {
  const { user } = useAuth()
  const toast = useToast()

  const currentUser = {
    ...user,
    name: user?.name || '',
    email: user?.email || '',
  } as Required<User>

  const [email, setEmail] = useState<string>(currentUser.email)
  const [name, setName] = useState<string>(currentUser.name)

  const updateUserData = (event: FormEvent) => {
    event.preventDefault()
    return axios
      .put(`/users/${currentUser.id}`, { user: { name } })
      .then(() => {
        toast({ message: 'Changes saved', type: 'success' })
      })
      .catch(({ response: { data } }) => {
        toast({ message: data.error, type: 'error' })
      })
  }

  return (
    <Box>
      <AppHeader />
      <Box className="mx-4 md:mx-10">
        <Box className="my-4">
          <Typography className="my-4" variant="h4">
            Account Settings
          </Typography>
        </Box>
        <Box className="w-80" component="form" onSubmit={updateUserData}>
          <TextField
            fullWidth
            required
            disabled
            label="Email"
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            margin="dense"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Name"
            id="name"
            autoComplete="name"
            value={name}
            margin="dense"
            inputProps={{ maxLength: 50 }}
            onChange={(e) => setName(e.target.value)}
          />
          <Box className="mt-2">
            <Button type="submit" variant="contained" fullWidth>
              Update
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default AccountSettingsPage
