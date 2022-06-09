import { Close, InfoRounded } from '@mui/icons-material'
import { Box, Dialog, DialogContent, DialogTitle, IconButton, List, ListItem, Tooltip, Typography } from '@mui/material'
import { useState } from 'react'
import LanguageSelector, {
  LanguageSelectorProps,
} from 'src/components/app/interview/interviewBody/ide/LanguageSelector'

function Language(props: LanguageSelectorProps) {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  return (
    <Box className="flex">
      <LanguageSelector {...props} />
      <Tooltip arrow title="Language information">
        <IconButton size="small" color="info" onClick={handleOpen}>
          <InfoRounded />
        </IconButton>
      </Tooltip>

      <Dialog open={open} keepMounted onClose={handleClose} aria-describedby="language-info">
        <DialogTitle className="flex">
          <Box className="grow">
            <Typography variant="h4" className="capitalize">
              {props.currentLanguage}
            </Typography>
            <Typography variant="body2">Running NodeJS v17.3.0</Typography>
          </Box>
          <Tooltip arrow title="Close">
            <IconButton size="small" onClick={handleClose} disableRipple className="self-start">
              <Close />
            </IconButton>
          </Tooltip>
        </DialogTitle>
        <DialogContent dividers id="language-info">
          <Typography variant="h6">Available libraries</Typography>
          <List>
            <ListItem>
              Utility libraries to help you get through simple tasks - underscore, lodash, moment, and more.
            </ListItem>
            <ListItem>
              Utility libraries to help you get through simple tasks - underscore, lodash, moment, and more.
            </ListItem>
            <ListItem>
              Utility libraries to help you get through simple tasks - underscore, lodash, moment, and more.
            </ListItem>
            <ListItem>
              Utility libraries to help you get through simple tasks - underscore, lodash, moment, and more.
            </ListItem>
            <ListItem>
              Utility libraries to help you get through simple tasks - underscore, lodash, moment, and more.
            </ListItem>
            <ListItem>
              Utility libraries to help you get through simple tasks - underscore, lodash, moment, and more.
            </ListItem>
          </List>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default Language
