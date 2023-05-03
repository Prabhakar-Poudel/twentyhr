import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment, InputLabel, OutlinedInput, FormControl } from '@mui/material'
import { ChangeEventHandler, useState } from 'react'

interface PasswordFieldProps {
  label?: string
  autocomplete?: string
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

const PasswordField = ({
  value,
  onChange,
  label = 'Password',
  autocomplete = 'current-password',
}: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <FormControl fullWidth variant="outlined" margin="dense">
      <InputLabel htmlFor={label}>{label}</InputLabel>
      <OutlinedInput
        id={label}
        label={label}
        name={label}
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        autoComplete={autocomplete}
        inputProps={{ minLength: 6 }}
        required
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              onMouseDown={(event) => event.preventDefault()}
              edge="end"
            >
              {showPassword ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  )
}

export default PasswordField
