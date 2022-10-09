import React, { useEffect, useState } from 'react';
import { Backdrop, Box, Fade, FormControl, MenuItem, Modal, useTheme, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useSnackbar } from 'notistack';

// components
import { StyledInputLabel, StyledTextField, StyledSelect } from '../../components/CustomFormElements';

// stores
import { useTypeStore, useLogInStore } from '../../stores';

// api
import { createType, createTransaction } from '../../api';

const AddTransactionModal = ({ ...props }) => {
  const { modalOpen, handleModalClose, handleClickTab, tabDateValue } = props;
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  // for form input
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionDate, setTransactionDate] = useState(new Date().toJSON().slice(0, 10));

  const [newCategory, setNewCategory] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [categories, setCategories] = useState({});

  const types = useTypeStore(state => state.types);
  

  const handleChangeType = (value) => {
    setType(value);
    let type = types.filter(type => type.id === value);
    setCategory("");
    setCategories(type[0].categories);
  }

  useEffect(() => {
    // console.log(types);
    // console.log(transactionDate);
  })

  
  const handleCategoryModalOpen = () => {
    setCategoryModalOpen(true);
  }
  const handleCategoryModalClose = () => {
    setCategoryModalOpen(false);
  }

  const handleCreateCategory = () => {
    createType({
      'userId': useLogInStore.getState().user.id,
      'typeId': type,
      'description': newCategory
    }).then((response) => {
      if (response.status === 201) {
        const newCategories = categories;
        newCategories.push(response.data.data);
        setCategories(newCategories);
        handleCategoryModalClose();
        enqueueSnackbar(response.data.message, {
					variant: 'success',
					anchorOrigin: {
						vertical: theme.snackbar.position.vertical,
						horizontal: theme.snackbar.position.horizontal
					},
					autoHideDuration: 3000
				});
      }
      else {
        enqueueSnackbar(response.response.data.message, {
					variant: 'error',
					anchorOrigin: {
						vertical: theme.snackbar.position.vertical,
						horizontal: theme.snackbar.position.horizontal
					},
					autoHideDuration: 3000
				});
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  const handleSaveTransaction = () => {
    createTransaction({
      'userId': useLogInStore.getState().user.id,
      'typeId': type,
      'categoryId': category,
      'description': description,
      'amount': amount,
      'dateTransact': transactionDate
    }).then((response) => {
      console.log(response);
      if (response.status === 201) {
        enqueueSnackbar(response.data.message, {
          variant: 'success',
          anchorOrigin: {
            vertical: theme.snackbar.position.vertical,
            horizontal: theme.snackbar.position.horizontal
          },
          autoHideDuration: 3000
        });
        handleClickTab(tabDateValue);
        handleModalClose();
      }
      else {
        enqueueSnackbar(response.response.data.message, {
          variant: 'error',
          anchorOrigin: {
            vertical: theme.snackbar.position.vertical,
            horizontal: theme.snackbar.position.horizontal
          },
          autoHideDuration: 3000
        });
      }
    }).catch((error) => {
      console.log(error);
    })
  }

  return (
    <>
      <Modal
         aria-labelledby="add-transaction-modal"
         aria-describedby="add-transaction-modal"
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
              <StyledInputLabel>Select Type</StyledInputLabel>
              <StyledSelect
                fullWidth
                label='Select Type'
                value={type}
                onChange={(e) => handleChangeType(e.target.value)}
              >
                {
                  (Object.keys(types).length > 0) && (
                    types.map((type) => (
                      <MenuItem sx={{ color: theme.palette.text.secondary }} key={type.id} value={type.id}>{type.description}</MenuItem>
                    ))
                  )
                }
              </StyledSelect>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <StyledInputLabel>Select Category</StyledInputLabel>
              <StyledSelect
                fullWidth
                label='Select Category'
                sx={{ pb: 0 }}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={(type === "") ? true : false}
              >
                {
                  (categories.length > 0) && (
                    categories.map((category) => (
                      <MenuItem 
                        sx={{ color: theme.palette.text.secondary }} 
                        key={category.id} 
                        value={category.id}
                      >
                        {category.description}
                      </MenuItem>
                    ))
                  )
                }
                <MenuItem sx={{ color: theme.palette.text.success }} onClick={handleCategoryModalOpen}>
                  <AddIcon />
                  Add Category
                </MenuItem>
              </StyledSelect>

              <AddCategoryModal
                theme={theme}
                categoryModalOpen={categoryModalOpen}
                handleCategoryModalClose={handleCategoryModalClose}
                setNewCategory={setNewCategory}
                handleCreateCategory={handleCreateCategory}
              />
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <StyledTextField 
                variant='outlined'
                fullWidth
                margin="normal"
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <StyledTextField 
                variant='outlined'
                fullWidth
                margin="normal"
                label="Amount"
                type='number'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <StyledTextField 
                type='date'
                value={transactionDate}
                onChange={(e) => setTransactionDate(e.target.value)}
              />
            </FormControl>

            <FormControl fullWidth>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSaveTransaction}
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

const AddCategoryModal = props => {
  const { theme, categoryModalOpen, handleCategoryModalClose, setNewCategory, handleCreateCategory } = props;

  return (
    <>
      <Modal
        open={categoryModalOpen}
        onClose={handleCategoryModalClose}
        aria-labelledby="add-category-modal"
        aria-describedby="add-category-modal"
      >
        <Fade in={categoryModalOpen}>
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
            <Typography sx={{ pb: 2 }}>Add Category</Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <StyledTextField 
                variant='outlined'
                fullWidth
                margin="normal"
                label="Description"
                autoComplete='off'
                onChange={(e) => setNewCategory(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCreateCategory}
              >
                Save
              </Button>
            </FormControl>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default AddTransactionModal;