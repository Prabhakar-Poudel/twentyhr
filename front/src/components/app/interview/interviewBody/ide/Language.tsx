import { Close, InfoRounded } from '@mui/icons-material'
import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle, Divider,
  IconButton, List, ListItem, Typography,
} from '@mui/material'
import { useState } from 'react'
import LanguageSelector, { LanguageSelectorProps } from 'src/components/app/interview/interviewBody/ide/LanguageSelector'

const Language = (props: LanguageSelectorProps) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  return (
    <Box className="flex">
      <LanguageSelector {...props} />
      <IconButton size="small" color="info" onClick={handleOpen}>
        <InfoRounded />
      </IconButton>

      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="language-info"
      >
        <DialogTitle className="flex">
          <Box className="grow">
            <Typography variant="h4" className="capitalize">{props.currentLanguage}</Typography>
            <Typography variant="body2">Running NodeJS v17.3.0</Typography>
            <Divider />
          </Box>
          <IconButton size="small" onClick={handleClose} disableRipple className="self-start">
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="language-info">
            <Typography variant="h6">Available libraries</Typography>
            <List>
              <ListItem>Utility libraries to help you get through simple tasks - underscore, lodash, moment, and more.</ListItem>
              <ListItem>Utility libraries to help you get through simple tasks - underscore, lodash, moment, and more.</ListItem>
              <ListItem>Utility libraries to help you get through simple tasks - underscore, lodash, moment, and more.</ListItem>
              <ListItem>Utility libraries to help you get through simple tasks - underscore, lodash, moment, and more.</ListItem>
              <ListItem>Utility libraries to help you get through simple tasks - underscore, lodash, moment, and more.</ListItem>
              <ListItem>Utility libraries to help you get through simple tasks - underscore, lodash, moment, and more.</ListItem>
            </List>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default Language
