import React, { useState, useEffect } from 'react';
import {
  Button, TextField, Select, MenuItem,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function TransactionsFilter({ onFilterChange }) {
  const categories = useSelector((state) => state.category.categories);
  const [filterOptions, setFilterOptions] = useState({
    startDate: '',
    endDate: '',
    selectedCategories: [...categories],
  });

  useEffect(() => {
    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    setFilterOptions({
      ...filterOptions,
      startDate: oneMonthAgo.toISOString().split('T')[0],
      endDate: today.toISOString().split('T')[0],
    });
  }, []);

  const handleFilterChange = () => {
    if (filterOptions.selectedCategories.length > 0) {
      onFilterChange(filterOptions);
    } else {
      toast.error('Please select at least one category.');
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div style={{ width: '100%', margin: '20px 0 0 0' }}>
      <div
        style={{
          width: '30%',
          backgroundColor: 'white',
          padding: '50px',
          margin: '0px auto',
        }}
      >
        <TextField
          label="Start Date"
          type="date"
          value={filterOptions.startDate}
          onChange={(e) => setFilterOptions({ ...filterOptions, startDate: e.target.value })}
          inputProps={{
            max: filterOptions.endDate || today,
          }}
          fullWidth
          variant="standard"
          style={{ margin: '10px' }}
        />
        <TextField
          label="End Date"
          type="date"
          value={filterOptions.endDate}
          onChange={(e) => setFilterOptions({ ...filterOptions, endDate: e.target.value })}
          inputProps={{
            min: filterOptions.startDate || today,
            max: today,
          }}
          fullWidth
          variant="standard"
          style={{ margin: '10px' }}
        />
        <Select
          label="Categories"
          multiple
          value={filterOptions.selectedCategories}
          onChange={(e) => setFilterOptions({
            ...filterOptions,
            selectedCategories: e.target.value,
          })}
          fullWidth
          variant="standard"
          style={{ margin: '10px' }}
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
        <Button
          variant="contained"
          onClick={handleFilterChange}
          style={{ margintop: '40px' }}
        >
          Apply Filter
        </Button>
      </div>
    </div>
  );
}

export default TransactionsFilter;
