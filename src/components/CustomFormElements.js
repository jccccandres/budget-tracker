import { TabPanel } from '@mui/lab';
import { Accordion, InputLabel, Select, styled, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
  "&.MuiInputLabel-root": {
    color: theme.palette.secondary.light
  },
  "& .MuiSvgIcon-root": {
    color: theme.palette.secondary.main
  }
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  "&.MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.palette.secondary.main
    },
    "&:hover fieldset": {
      borderColor: theme.palette.secondary.light
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.secondary.light
    },
    "& .MuiOutlinedInput-input": {
      color: theme.palette.secondary.main
    },
    "&:hover .MuiOutlinedInput-input": {
      color: theme.palette.secondary.light
    },
    "&.Mui-focused .MuiOutlinedInput-input": {
      color: theme.palette.secondary.light
    },
    "& .MuiSvgIcon-root": {
      color: theme.palette.secondary.main
    }
  }
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "&.MuiTextField-root": {
    marginBottom: 0,
    marginTop: 0,
    "& fieldset": {
      borderColor: theme.palette.secondary.main
    },
    "&:hover fieldset": {
      borderColor: theme.palette.secondary.light
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.secondary.light
    },
    "& .MuiOutlinedInput-input": {
      color: theme.palette.secondary.main
    },
    "&:hover .MuiOutlinedInput-input": {
      color: theme.palette.secondary.light
    },
    "&.Mui-focused .MuiOutlinedInput-input": {
      color: theme.palette.secondary.light
    },
    "& .MuiSvgIcon-root": {
      color: theme.palette.secondary.main
    },
    "& .MuiInputLabel-root": {
      color: theme.palette.secondary.main
    },
    "&:hover .MuiInputLabel-root": {
      color: theme.palette.secondary.light
    }
  }
}));

const StyledDatePicker = styled(DatePicker)(({ theme }) => ({
  "&.MuiTextField-root": {
    "& fieldset": {
      borderColor: theme.palette.secondary.main
    },
    "&:hover fieldset": {
      borderColor: theme.palette.secondary.light
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.secondary.light
    },
    "& .MuiOutlinedInput-input": {
      color: theme.palette.secondary.main
    },
    "&:hover .MuiOutlinedInput-input": {
      color: theme.palette.secondary.light
    },
    "&.Mui-focused .MuiOutlinedInput-input": {
      color: theme.palette.secondary.light
    },
    "& .MuiInputLabel-root": {
      color: theme.palette.secondary.main
    },
    "&:hover .MuiInputLabel-root": {
      color: theme.palette.secondary.light
    },
    "&.Mui-focused .MuiInputLabel-root": {
      color: theme.palette.secondary.light
    },
    "& .MuiSvgIcon-root": {
      color: theme.palette.secondary.main
    }
  }
}));

const StyledTabPanel = styled(TabPanel)(({ theme }) => ({
  "&.MuiTabPanel-root": {
    padding: "24px 0"
  }
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  "&.MuiAccordion-root": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.light,
    "& .MuiAccordionSummary-root": {
      borderBottom: "1px solid",
      "& .MuiAccordionSummary-content": {
        justifyContent: "space-between"
      }
    }
  }
}));

export { StyledInputLabel, StyledTextField, StyledSelect, StyledDatePicker, StyledTabPanel, StyledAccordion };