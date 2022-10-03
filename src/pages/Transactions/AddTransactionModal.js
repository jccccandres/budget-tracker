import React, { useState } from 'react';
import { Backdrop, Box, Fade, FormControl, MenuItem, Modal, useTheme, TextField, Button } from '@mui/material';
import { StyledInputLabel, StyledTextField, StyledSelect, StyledDatePicker } from '../../components/CustomFormElements';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const AddTransactionModal = ({ ...props }) => {
  const { modalOpen, handleModalClose } = props;
  const theme = useTheme();

  const [category, setCategory] = useState("");

  return (
    <>
      <Modal
         aria-labelledby="transition-modal-title"
         aria-describedby="transition-modal-description"
         open={modalOpen}
         onClose={handleModalClose}
         closeAfterTransition
         BackdropComponent={Backdrop}
         BackdropProps={{
           timeout: 500,
         }}
      >
        <Fade in={modalOpen}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 350,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
              backgroundColor: theme.palette.background.default,
              color: theme.palette.primary.text
            }}
          >
            <FormControl fullWidth sx={{ mb: 2 }}>
              <StyledInputLabel>Select Category</StyledInputLabel>
              <StyledSelect
                fullWidth
                label='Select Category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="income">Income</MenuItem>
                <MenuItem value="expenses">Expenses</MenuItem>
                <MenuItem value="savings">Savings</MenuItem>
              </StyledSelect>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <StyledInputLabel>Select Tags</StyledInputLabel>
              <StyledSelect
                fullWidth
                label='Select Tags'
              >
              </StyledSelect>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <StyledTextField 
                variant='outlined'
                fullWidth
                margin="normal"
                label="Description"
              />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <StyledTextField 
                variant='outlined'
                fullWidth
                margin="normal"
                label="Amount"
              />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StyledDatePicker
                  label="Date"
                  renderInput={(params) => <TextField {...params} helperText={null} />}
                />
              </LocalizationProvider>
            </FormControl>
            <FormControl fullWidth>
              <Button
                variant="contained"
                color="secondary"
              >
                Save
              </Button>
            </FormControl>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default AddTransactionModal;