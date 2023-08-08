import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@mui/material';
import { addTransaction } from '../reducers/transactionSlice';
import ConfirmationDialogue from './ConfirmationDialogue';

function AddTransactions() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const userId = useSelector((state) => state.user.user.Id);
  const formRef = useRef(null);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [confirmation, setConfirmation] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirmation(true);
  };

  const formatDate = (_date) => {
    const year = _date.getFullYear();
    const month = String(_date.getMonth() + 1).padStart(2, '0');
    const day = String(_date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDialog = (confirmed) => {
    if (confirmed) {
      const temp = {
        userId,
        category,
        transactionDate: date,
        description,
        amount,
      };
      dispatch(addTransaction(temp));
      formRef.current.reset();
      setCategory('');
      setAmount('');
      setDate('');
      setDescription('');
    }
    setConfirmation(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <h3>Add Transaction</h3>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        style={{ display: 'inline-grid' }}
      >
        <FormControl variant="standard" required>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="Category"
          >
            {categories.map((_category) => (
              <MenuItem key={_category} value={_category}>
                {_category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          type="number"
          label="Amount"
          variant="standard"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <TextField
          type="date"
          label="Date"
          variant="standard"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          inputProps={{
            max: formatDate(new Date()),
          }}
          required
        />
        <TextField
          label="Description"
          variant="standard"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ margin: '20px' }}
        >
          Add Transaction
        </Button>
      </form>
      {confirmation && (
        <ConfirmationDialogue
          title="Confirm Add Transaction"
          message="Are you sure you want to add this transaction?"
          confirmText="Add"
          confirmColor="primary"
          onClose={handleDialog}
        />
      )}
    </Box>
  );
}

export default AddTransactions;
