import React, { useEffect, useState } from 'react';
import { Box, Tab, Tabs, Typography, styled, AccordionSummary, AccordionDetails, Table, TableBody, TableRow, TableCell, useTheme, Fab } from '@mui/material';
import { TabContext } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';

import AddTransactionModal from '../pages/Transactions/AddTransactionModal';
import { StyledAccordion } from '../components/CustomFormElements';

// api
import { getMonthsYear, getTransactions } from '../api/Transactions';
import { useTransactionsStore } from '../stores/TransactionStore';

const StyledTab = styled(Tab)(({ theme }) => ({
  "&.MuiTab-root": {
    color: theme.palette.secondary.main
  },
  "&.MuiTab-root:hover": {
    color: theme.palette.secondary.light
  },
  "&.MuiTab-root.Mui-selected": {
    color: theme.palette.primary.text
  }
}));

const Transactions = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState('0');
  const [tabDateValue, setTabDateValue] = useState('');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => {
    setModalOpen(true);
  }
  const handleModalClose = () => {
    setModalOpen(false);
  }

  const { 
    transactions, 
    setTransactions,
    monthsYear,
    setMonthsYear
  } = useTransactionsStore(
    state => ({ 
      transactions: state.transactions, 
      setTransactions: state.setTransactions,
      monthsYear: state.monthsYear, 
      setMonthsYear: state.setMonthsYear
    })
  );
  
  useEffect(() => {
    getMonthsYear().then((response) => {
      const resp_data = response.data.data;
      setMonthsYear(resp_data);
      setTabValue((resp_data.length - 1).toString());
      handleClickTab(resp_data[resp_data.length - 1].datetransact);
      setTabDateValue(resp_data[resp_data.length - 1].datetransact);
    });
  }, []);

  const handleClickTab = (value) => {
    getTransactions({
      date: value
    }).then((response) => {
      setTransactions(response.data);
      setTabDateValue(value);
    });
  }

  useEffect(() => {
    // console.log(monthsYear);
    // console.log(transactions);
  })

  return (
    <>
      <Box>
        <Typography variant="h5">Transactions</Typography>
        <Typography variant="p">Reprehenderit ex elit laborum ullamco voluptate non.</Typography>
      </Box>

      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            {
              monthsYear.map((value, index) => (
                <StyledTab 
                  key={index} 
                  value={index.toString()} 
                  label={value.monthyear} 
                  onClick={() => handleClickTab(value.datetransact)}
                />
              ))
            }
          </Tabs>
        </Box>
        <Box sx={{ m: 2 }}>
          {(Object.keys(transactions).length > 0) && (
            Object.keys(transactions).map((dateIndex, index) => (
              <StyledAccordion defaultExpanded key={index}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{ dateIndex }</Typography>
                  <Typography 
                    sx={
                      transactions[dateIndex].sum > 0 ? { color: theme.palette.text.success } : { color: theme.palette.text.danger }
                    }
                  >
                    { Number(transactions[dateIndex].sum).toLocaleString(undefined, {minimumFractionDigits: 2}) }
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 1 }}>
                  <Table size="small">
                    <TableBody>
                      {
                        transactions[dateIndex].transactions.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell sx={{ textAlign: "left", color: theme.palette.secondary.light, borderBottom: 0 }}>
                              { row.category.description } 
                              <Typography variant='overline' sx={{ textTransform: 'lowercase' }}> ({ row.type.description })</Typography>
                            </TableCell>
                            <TableCell sx={{ textAlign: "right", borderBottom: 0 }}>
                              <Typography 
                                sx={
                                  row.amount > 0 ? { color: theme.palette.text.success } : { color: theme.palette.text.danger }
                                }
                              >
                                { Number(row.amount).toLocaleString(undefined, {minimumFractionDigits: 2}) }
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ))
                      }
                    </TableBody>
                  </Table>
                </AccordionDetails>
              </StyledAccordion>
            ))
          )}
        </Box>
      </TabContext>

      <Fab
        color="success" 
        aria-label="add"
        sx={{
          position: 'absolute',
          bottom: 20,
          right: 20
        }}
        onClick={handleModalOpen}
      >
        <AddIcon />
      </Fab>
      
      <AddTransactionModal
        modalOpen={modalOpen}
        handleModalClose={handleModalClose}
        handleClickTab={handleClickTab}
        tabDateValue={tabDateValue}
      />
    </>
  );
};

export default Transactions;