import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from '@mui/material';
import ConfirmationDialogue from './ConfirmationDialogue';
import {
  deleteCategoryAndTransactions,
  updateCategoryAndTransactions,
} from '../reducers/transactionSlice';
import { addCategory } from '../reducers/categorySlice';

function CategoriesList() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const rows = categories.map((item, index) => ({
    id: index + 1,
    category: item,
  }));
  const userId = useSelector((state) => state.user.user.Id);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [formError, setFormError] = useState('');
  const [editedCategory, setEditedCategory] = useState('');
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [isDeleteOptionDialogOpen, setIsDeleteOptionDialogOpen] = useState(false);
  const [deleteOption, setDeleteOption] = useState('delete');
  const [isEditConfirmationDialogOpen, setIsEditConfirmationDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [isAddConfirmationDialogOpen, setIsAddConfirmationDialogOpen] = useState(false);
  const columns = [
    { field: 'category', headerName: 'Category', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <>
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleEdit(params.row)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={() => handleDelete(params.row)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  const handleAdd = () => {
    setIsAddDialogOpen(true);
    setNewCategory('');
    setFormError('');
  };

  const handleAddDialogClose = () => {
    setIsAddDialogOpen(false);
    setFormError('');
  };

  const handleConfirmAdd = () => {
    setIsAddConfirmationDialogOpen(false);
    setIsAddDialogOpen(false);
    setFormError('');
    dispatch(addCategory(newCategory));
  };

  const handleCancleAddConfirm = () => {
    setIsAddConfirmationDialogOpen(false);
    setFormError('');
  };

  const handleAddSave = () => {
    let flag = false;
    const trimmedNewCategory = newCategory.trim();
    if (trimmedNewCategory === '') {
      setFormError('Category cannot be empty.');
      flag = true;
    }

    if (categories.includes(trimmedNewCategory)) {
      setFormError('Category already exists.');
      flag = true;
    }

    if (trimmedNewCategory.length > 15) {
      setFormError("You can't add more than 15 categories");
      flag = true;
    }

    if (!flag) {
      setIsAddConfirmationDialogOpen(true);
      setFormError('');
    }
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setEditedCategory(category.category);
    setIsEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setFormError('');
    setIsEditDialogOpen(false);
  };

  const handleSave = () => {
    const trimmedCategory = editedCategory.trim();
    let flag = false;
    if (trimmedCategory === '') {
      setFormError('Category cannot be empty.');
      flag = true;
    }

    if (categories.includes(trimmedCategory)) {
      setFormError('Category already exists.');
      flag = true;
    }

    if (trimmedCategory.length > 15) {
      setFormError("You can't add more than 15 categories");
      flag = true;
    }

    if (!flag) {
      setIsEditConfirmationDialogOpen(true);
    }
  };

  const handleConfirmSave = () => {
    setIsEditConfirmationDialogOpen(false);
    setIsEditDialogOpen(false);
    setFormError('');
    dispatch(
      updateCategoryAndTransactions({
        userId,
        oldCategory: selectedCategory.category,
        newCategory: editedCategory,
      }),
    );
  };

  const handleCancleConfirm = () => {
    setIsEditConfirmationDialogOpen(false);
    setFormError('');
  };

  const handleDelete = (category) => {
    setSelectedCategory(category);
    setIsDeleteOptionDialogOpen(true);
  };

  const handleConfirmDeleteOption = () => {
    setIsDeleteOptionDialogOpen(false);
    setIsDeleteConfirmationOpen(true);
  };

  const handleConfirmDelete = () => {
    setIsDeleteConfirmationOpen(false);
    const categoryToDelete = selectedCategory.category;
    const deleteTransactions = deleteOption === 'delete';

    if (deleteTransactions) {
      dispatch(
        deleteCategoryAndTransactions({
          userId,
          category: categoryToDelete,
        }),
      );
    }

    if (!deleteTransactions) {
      dispatch(
        updateCategoryAndTransactions({
          userId,
          oldCategory: categoryToDelete,
          newCategory: 'Others',
        }),
      );
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteOptionDialogOpen(false);
    setIsDeleteConfirmationOpen(false);
  };

  const getRowId = (row) => row.id;

  return (
    <div style={{ backgroundColor: '#fff' }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAdd}
        sx={{ margin: '20px' }}
      >
        Add Category
      </Button>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        components={{
          Toolbar: GridToolbar,
        }}
        getRowId={getRowId}
        sx={{ alignItems: 'center' }}
      />

      {isEditDialogOpen && (
        <Dialog open={isEditDialogOpen} onClose={handleEditDialogClose}>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogContent>
            <TextField
              label="Category"
              value={editedCategory}
              onChange={(e) => setEditedCategory(e.target.value)}
              error={!!formError}
              helperText={formError}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {isDeleteOptionDialogOpen && (
        <Dialog
          open={isDeleteOptionDialogOpen}
          onClose={handleCancelDelete}
          fullWidth
        >
          <DialogTitle>Select Delete Option</DialogTitle>
          <DialogContent>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="delete-option"
                name="delete-option"
                value={deleteOption}
                onChange={(e) => setDeleteOption(e.target.value)}
              >
                <FormControlLabel
                  value="delete"
                  control={<Radio />}
                  label="Delete all associated transactions"
                />
                <FormControlLabel
                  value="convert"
                  control={<Radio />}
                  label="Convert associated transactions to 'Others'"
                />
              </RadioGroup>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDelete} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirmDeleteOption} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {isDeleteConfirmationOpen && (
        <ConfirmationDialogue
          onClose={(confirmed) => {
            if (confirmed) {
              handleConfirmDelete();
            } else {
              handleCancelDelete();
            }
          }}
          title="Confirm Delete"
          message={`Are you sure you want to delete the category "${
            selectedCategory?.category
          }"? ${
            categories.some(
              (category) => category.category === selectedCategory?.category,
            )
              ? "This category is associated with transactions. You can either delete the transactions or change their category to 'Others' before deleting this category."
              : ''
          }`}
          confirmText="Delete"
          confirmColor="secondary"
        />
      )}

      {isEditConfirmationDialogOpen && (
        <ConfirmationDialogue
          onClose={(confirmed) => {
            if (confirmed) {
              handleConfirmSave();
            } else {
              handleCancleConfirm();
            }
          }}
          title="Confirm Edit"
          message="Are you sure you want to save the edit?"
          confirmText="Save Edit"
          confirmColor="secondary"
        />
      )}

      {isAddDialogOpen && (
        <Dialog open={isAddDialogOpen} onClose={handleAddDialogClose}>
          <DialogTitle>Add Category</DialogTitle>
          <DialogContent>
            <TextField
              label="Category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              error={!!formError}
              helperText={formError}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAddSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {isAddConfirmationDialogOpen && (
        <ConfirmationDialogue
          onClose={(confirmed) => {
            if (confirmed) {
              handleConfirmAdd();
            } else {
              handleCancleAddConfirm();
            }
          }}
          title="Confirm Add"
          message={
            'Are you sure you want to add the category? \n After successfully adding the new category, Please add a transaction with this category to retain it'
          }
          confirmText="Add Category"
          confirmColor="secondary"
        />
      )}
    </div>
  );
}

export default CategoriesList;
