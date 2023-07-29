import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import ConfirmationDialogue from "./ConfirmationDialogue";
import {
  updateTransaction,
  deleteTransaction,
  deleteMultipleTransaction,
} from "../reducers/transactionSlice";

const TransactionsList = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transaction.transactions);
  const categories = useSelector((state) => state.category.categories);
  const userId = useSelector((state) => state.user.user.id);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedTransaction, setEditedTransaction] = useState({
    transactionDate: "",
    amount: "",
    category: "",
    description: "",
  });

  const [isSaveConfirmationOpen, setIsSaveConfirmationOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [selectedTransactionsToDelete, setSelectedTransactionsToDelete] =
    useState([]);

  const columns = [
    { field: "transactionId", headerName: "Transaction ID", width: 150 },
    {
      field: "transactionDate",
      headerName: "Date",
      width: 150,
      valueFormatter: (params) => {
        return new Date(params.value).toLocaleDateString();
      },
    },
    { field: "amount", headerName: "Amount", width: 150 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "description", headerName: "Description", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        return (
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
              onClick={() => handleDelete(params.row.transactionId)}
            >
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  const handleEdit = (transaction) => {
    setSelectedTransaction(transaction);
    setEditedTransaction({
      transactionDate: new Date(transaction.transactionDate)
        .toISOString()
        .split("T")[0],
      amount: transaction.amount,
      category: transaction.category,
      description: transaction.description,
    });
    setIsEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setIsEditDialogOpen(false);
  };

  const handleSave = () => {
    setIsSaveConfirmationOpen(true);
  };

  const handleConfirmSave = async () => {
    setIsSaveConfirmationOpen(false);
    console.log("Dispatching updated transaction:", editedTransaction);
    await dispatch(
      updateTransaction({
        transactionId: selectedTransaction.transactionId,
        transactionDate: editedTransaction.transactionDate,
        amount: editedTransaction.amount,
        category: editedTransaction.category,
        description: editedTransaction.description,
        userId: userId,
      })
    );
    setIsEditDialogOpen(false);
  };

  const handleCancelSave = () => {
    setIsSaveConfirmationOpen(false);
  };

  const handleDelete = (transactionId) => {
    setSelectedTransactionsToDelete([transactionId]);
    setIsDeleteConfirmationOpen(true);
  };

  const handleDeleteSelected = () => {
    setIsDeleteConfirmationOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleteConfirmationOpen(false);
    console.log(
      "Selected transactions to delete:",
      selectedTransactionsToDelete
    );
    if (selectedTransactionsToDelete.length === 1) {
      await dispatch(deleteTransaction(selectedTransactionsToDelete[0]));
      console.log(
        "Dispatching delete transaction:",
        selectedTransactionsToDelete[0]
      );
    } else {
      console.log(
        "Dispatching delete multiple transactions:",
        selectedTransactionsToDelete
      );
      dispatch(deleteMultipleTransaction(selectedTransactionsToDelete));
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmationOpen(false);
  };

  const getRowId = (row) => row.transactionId;

  return (
    <div style={{ height: "auto", width: "100%" }}>
      <Button variant="contained" color="error" onClick={handleDeleteSelected} sx={{margin:"20px"}}>
        Delete Selected
      </Button>
      <DataGrid
        rows={transactions}
        columns={columns}
        pageSize={5}
        checkboxSelection
        getRowId={getRowId}
        components={{
          Toolbar: GridToolbar,
        }}
        onRowSelectionModelChange={(newSelection) =>
          setSelectedTransactionsToDelete(newSelection)
        }
      />

      {isSaveConfirmationOpen && (
        <ConfirmationDialogue
          onClose={(confirmed) => {
            if (confirmed) {
              handleConfirmSave();
            } else {
              handleCancelSave();
            }
          }}
          title="Confirm Save"
          message="Are you sure you want to save this transaction?"
          confirmText="Save"
          confirmColor="primary"
        />
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
          message="Are you sure you want to delete this transaction?"
          confirmText="Delete"
          confirmColor="error"
        />
      )}

      <Dialog open={isEditDialogOpen} onClose={handleEditDialogClose}>
        <DialogTitle>Edit Transaction</DialogTitle>
        <DialogContent>
          <TextField
            label="Date"
            type="date"
            value={editedTransaction.transactionDate}
            onChange={(e) =>
              setEditedTransaction({
                ...editedTransaction,
                transactionDate: e.target.value,
              })
            }
            fullWidth
          />
          <TextField
            label="Amount"
            type="number"
            value={editedTransaction.amount}
            onChange={(e) =>
              setEditedTransaction({
                ...editedTransaction,
                amount: e.target.value,
              })
            }
            fullWidth
          />
          <Select
            label="Category"
            value={editedTransaction.category}
            onChange={(e) =>
              setEditedTransaction({
                ...editedTransaction,
                category: e.target.value,
              })
            }
            fullWidth
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
          <TextField
            label="Description"
            value={editedTransaction.description}
            onChange={(e) =>
              setEditedTransaction({
                ...editedTransaction,
                description: e.target.value,
              })
            }
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
    </div>
  );
};

export default TransactionsList;
