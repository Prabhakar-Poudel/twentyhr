import { Visibility, VisibilityOff } from '@mui/icons-material'
import { InputAdornment, IconButton, OutlinedInput, FormControl, InputLabel } from '@mui/material'
import { useState } from 'react'

const LoginPassword = () => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <FormControl fullWidth variant="outlined" margin="normal">
      <InputLabel htmlFor="password">Password</InputLabel>
      <OutlinedInput
        id="password"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              onMouseDown={(event) => event.preventDefault()}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  )
}

export default LoginPassword
