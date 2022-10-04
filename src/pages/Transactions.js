import React, { useState } from 'react';
import { Box, Tab, Tabs, Typography, styled, AccordionSummary, AccordionDetails, Table, TableBody, TableRow, TableCell, useTheme, Fab } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';

import AddTransactionModal from '../pages/Transactions/AddTransactionModal';
import { StyledAccordion, StyledTabPanel } from '../components/CustomFormElements';

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
  const [value, setValue] = useState("4");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => {
    setModalOpen(true);
  }
  const handleModalClose = () => {
    setModalOpen(false);
  }

  return (
    <>
      <Box>
        <Typography variant="h5">Transactions</Typography>
        <Typography variant="p">Reprehenderit ex elit laborum ullamco voluptate non.</Typography>
      </Box>

      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            <StyledTab value="1" label="Jul 2022" />
            <StyledTab value="2" label="Aug 2022" />
            <StyledTab value="3" label="Sep 2022" />
            <StyledTab value="4" label="Oct 2022" />
          </Tabs>
        </Box>
        <TabPanel value="1">Item One</TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
        <StyledTabPanel value="4">

          <StyledAccordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>October 3, 2022</Typography>
              <Typography sx={{ color: theme.palette.text.danger }}>- 5,000.00</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 1 }}>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ textAlign: "left", color: theme.palette.secondary.light, borderBottom: 0 }}>Bills (expense)</TableCell>
                    <TableCell sx={{ textAlign: "right", color: theme.palette.text.danger, borderBottom: 0 }}>- 5,000.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </AccordionDetails>
          </StyledAccordion>

          <StyledAccordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>October 2, 2022</Typography>
              <Typography sx={{ color: theme.palette.text.danger }}>- 1,000.00</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 1 }}>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ textAlign: "left", color: theme.palette.text.primary, borderBottom: 0 }}>Food (expense)</TableCell>
                    <TableCell sx={{ textAlign: "right", color: theme.palette.text.danger, borderBottom: 0 }}>- 1,000.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </AccordionDetails>
          </StyledAccordion>

          <StyledAccordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>October 1, 2022</Typography>
              <Typography sx={{ color: theme.palette.text.success }}>47,000.00</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 1 }}>
            <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ textAlign: "left", color: theme.palette.secondary.light, borderBottom: 0 }}>Salary (income)</TableCell>
                    <TableCell sx={{ textAlign: "right", color: theme.palette.text.success, borderBottom: 0 }}>50,000.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ textAlign: "left", color: theme.palette.secondary.light, borderBottom: 0 }}>Credit Card (expense)</TableCell>
                    <TableCell sx={{ textAlign: "right", color: theme.palette.text.danger, borderBottom: 0 }}>- 3,000.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </AccordionDetails>
          </StyledAccordion>

        </StyledTabPanel>
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
      />
    </>
  );
};

export default Transactions;