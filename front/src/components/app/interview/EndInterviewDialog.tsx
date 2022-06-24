import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

interface Props {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

const EndInterviewDialog = ({ open, onClose, onConfirm }: Props) =>
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      End this interview
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        The interview will be read only and it will not be accessible outside your organization. <br />
        You can view the interview back in future.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} autoFocus color="inherit">Cancel</Button>
      <Button onClick={onConfirm} color="error" variant="contained">End interview</Button>
    </DialogActions>
  </Dialog>


export default EndInterviewDialog
