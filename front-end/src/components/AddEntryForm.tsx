import * as React from 'react';


import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';


import CustomizedHook from './AutocompeteCustomized';






export  default function TransitionAlerts({diagnose}) {
  const [open, setOpen] = React.useState(false);

  if(open){
  return (
   <div>
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
            <CustomizedHook diagnoses={diagnose}/>
            this part still needs to be completed

        </Alert>
      </Collapse>
      <Button
        disabled={open}
        variant="outlined"
        onClick={() => {
          setOpen(true);
        }}
      >
        Add new Entry
      </Button>
      </div>
  );}

  else return (
    <Button
        disabled={open}
        variant="outlined"
        onClick={() => {
          setOpen(true);
        }}
      >
        Add new Entry
      </Button>

  )

}