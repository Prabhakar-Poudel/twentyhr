import { Alert, Snackbar, AlertColor, AlertTitle } from '@mui/material'
import { useState } from 'react'

export interface ToastProps {
  duration?: number
  id?: string
  message?: string
  onClose?: (id: string) => void
  open?: boolean
  title?: string
  type?: AlertColor
}

export const Toast = ({
  duration = 6000,
  id='toast',
  message = '',
  onClose = () => {},
  open = false,
  title = '',
  type = 'info'
 }: ToastProps) => {
  const [show, setShow] = useState(open)

  const handleClose = () => {
    setShow(false)
    onClose(id)
  }

  setTimeout(handleClose, duration)

  return (
    <Snackbar id={id} open={show} transitionDuration={800} className="!relative w-64 md:w-96">
      <Alert variant="filled" severity={type} className="w-full" onClose={handleClose}>
        {title && <AlertTitle>{title}</AlertTitle>}
        {message}
      </Alert>
    </Snackbar>
  )
}
