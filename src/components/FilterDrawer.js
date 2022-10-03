import React, { useEffect } from 'react';
import { Box, Divider, FormControl, Grid, IconButton, List, ListItem, MenuItem, SwipeableDrawer, TextField, useTheme } from '@mui/material';
import { StyledInputLabel, StyledSelect, StyledDatePicker } from '../components/CustomFormElements';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useFilterStore } from '../stores/FilterStore';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const FilterDrawer = ({ ...props }) => {
  const { secondDrawerOpen, handleSecondDrawerClose, handleSecondDrawerOpen } = props;
  const theme = useTheme();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const { 
    category, 
    setCategory,
    month,
    setMonth,
    year,
    setYear
  } = useFilterStore(
    state => ({ 
      category: state.category, 
      setCategory: state.setCategory,
      month: state.month,
      setMonth: state.setMonth,
      year: state.year,
      setYear: state.setYear
    })
  );

  useEffect(() => {
    // console.log(category);
    // console.log(month);
    // console.log(year);
  }, [category, month, year]);

  return (
    <>
      <SwipeableDrawer
        anchor='right'
        open={secondDrawerOpen}
        onClose={handleSecondDrawerClose}
        onOpen={handleSecondDrawerOpen}
        PaperProps={{
          sx: { width: 300, backgroundColor: theme.palette.background.default, height: '100vh' }
        }}
      >
        <Box>
          <List>
            <ListItem>
              <IconButton onClick={handleSecondDrawerClose}>
                <ChevronRightIcon sx={{ color: theme.palette.primary.text }} />
              </IconButton>
            </ListItem>
          </List>
          <Divider />
          <Grid sx={{ p: 1 }}>
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
              <StyledInputLabel>Select Month</StyledInputLabel>
              <StyledSelect
                fullWidth
                label='Select Month'
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              >
                {
                  months.map((value, index) => ( 
                    <MenuItem key={index} value={index}>{value}</MenuItem> 
                  ))
                }
              </StyledSelect>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StyledDatePicker
                  views={['year']}
                  label="Year"
                  minDate={dayjs('1990')}
                  maxDate={dayjs('2030')}
                  value={year}
                  onChange={(value) => setYear(dayjs(value).format('YYYY'))}
                  renderInput={(params) => <TextField {...params} helperText={null} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
        </Box>
      </SwipeableDrawer>
    </>
  );
};

export default FilterDrawer;