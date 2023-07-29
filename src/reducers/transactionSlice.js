import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TransactionServices from "../services/transactionSevices";
import CategoryServices from "../services/categoryServices";
import { deleteCategory, updateCategory } from "./categorySlice";
import { toast } from "react-toastify";

const initialState = {
    transactions: [],
    error: null,
    message: null,
};

export const getTransactions = createAsyncThunk(
    "transaction/getTransactions",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await TransactionServices.getTransactions(userId);
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getTransaction = createAsyncThunk(
    "transaction/getTransaction",
    async (transactionId, { rejectWithValue }) => {
        try {
            const response = await TransactionServices.getTransaction(transactionId);
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const addTransaction = createAsyncThunk(
    "transaction/addTransaction",
    async (transaction, { rejectWithValue }) => {
        try {
            const response = await TransactionServices.addTransaction(transaction);
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteTransaction = createAsyncThunk(
    "transaction/deleteTransaction",
    async (transactionId, { rejectWithValue }) => {
        try {
            console.log("im in the middlewear");
            console.log(transactionId);
            await TransactionServices.deleteTransaction(transactionId);
            return transactionId;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteMultipleTransaction = createAsyncThunk(
    "transaction/deleteMultipleTransaction",
    async (transactionIds, { rejectWithValue }) => {
        try {
            console.log(transactionIds);
            console.log("this is i received");
            await TransactionServices.deleteMultipleTransaction(transactionIds);
            return transactionIds;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const updateTransaction = createAsyncThunk(
    "transaction/updateTransaction",
    async (transaction, { rejectWithValue }) => {
        try {
            const response = await TransactionServices.updateTransaction(transaction);
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const updateTransactionsCategory = createAsyncThunk(
    "transaction/updateTransactionsCategory",
    async (details, { rejectWithValue }) => {
        try {
            await CategoryServices.updateTransationsCategory(details);
            return details;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const deleteAllCategoryTransactions = createAsyncThunk(
    "transaction/deleteAllCategoryTransactions",
    async (details, { rejectWithValue }) => {
        try {
            await CategoryServices.deleteAllCategoryTransactions(details.userId, details.category);
            return details.category;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const TransactionSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {
        clearTransaction: (state) => {
            state.transactions = [];
            state.error = null;
            state.message = null;
        }
    },  
    extraReducers(builder) {
        builder.addCase(getTransactions.fulfilled, (state, action) => {
            state.transactions = action.payload;
            state.error = false;
            state.message = "Transactions Fetched Successfully";
            toast.success("Transactions Fetched Successfully");
        });
        builder.addCase(getTransactions.rejected, (state, action) => {
            state.transactions = [];
            state.error = true;
            state.message = action.payload;
            toast.error(action.payload);
        });

        builder.addCase(getTransaction.fulfilled, (state, action) => {
            state.transactions = action.payload;
            state.error = false;
            state.message = "Transaction Fetched Successfully";
        });
        builder.addCase(getTransaction.rejected, (state, action) => {
            state.transactions = [];
            state.error = true;
            state.message = action.payload;
        });

        builder.addCase(addTransaction.fulfilled, (state, action) => {
            state.transactions.push(action.payload);
            state.error = false;
            state.message = "Transaction Added Successfully";
            toast.success("Transaction Added Successfully");
        });
        builder.addCase(addTransaction.rejected, (state, action) => {
            state.transactions = [];
            state.error = true;
            state.message = action.payload;
            toast.error(action.payload);

        });

        builder.addCase(deleteTransaction.fulfilled, (state, action) => {
            //action contains the transactionId that should be removed from the state
            console.log("Hlwlllllllllllleajsfuahsfuhawihfwiuehfwererwe");
            console.log(action.payload);
            state.transactions = state.transactions.filter((transaction) => transaction.transactionId !== action.payload);
            state.error = false;
            state.message = "Transaction Deleted Successfully";
            toast.success("Transaction Deleted Successfully");

        });
        builder.addCase(deleteTransaction.rejected, (state, action) => {
            state.transactions = [];
            state.error = true;
            state.message = action.payload;
            toast.error(action.payload);
        });

        builder.addCase(deleteMultipleTransaction.fulfilled, (state, action) => {
            state.transactions = state.transactions.filter((transaction) => !action.payload.includes(transaction.transactionId));
            state.error = false;
            state.message = "Transactions Deleted Successfully";
            toast.success("Transactions Deleted Successfully");
        });
        builder.addCase(deleteMultipleTransaction.rejected, (state, action) => {
            state.transactions = [];
            state.error = true;
            state.message = action.payload;
            toast.error(action.payload);
        });

        builder.addCase(updateTransaction.fulfilled, (state, action) => {
            state.transactions = state.transactions.map((transaction) => {
                if (transaction.transactionId === action.payload.transactionId) {
                    return action.payload;
                }
                return transaction;
            });
            state.error = false;
            state.message = "Transaction Updated Successfully";
            toast.success("Transaction Updated Successfully");
        });
        builder.addCase(updateTransaction.rejected, (state, action) => {
            state.transactions = [];
            state.error = true;
            state.message = action.payload;
            toast.error(action.payload);
        });

        builder.addCase(updateTransactionsCategory.fulfilled, (state, action) => {
            state.transactions = state.transactions.map((transaction) => {
                if (transaction.category === action.payload.oldCategory) {
                    transaction.category = action.payload.newCategory;
                }
                return transaction;
            });
            state.error = false;
            state.message = "Transactions Category Updated Successfully";
            toast.success("Transactions Category Updated Successfully");
        });
        builder.addCase(updateTransactionsCategory.rejected, (state, action) => {
            state.transactions = [];
            state.error = true;
            state.message = action.payload;
            toast.error(action.payload);
        }); 

        builder.addCase(deleteAllCategoryTransactions.fulfilled, (state, action) => {
            state.transactions = state.transactions.filter((transaction) => transaction.category !== action.payload);
            state.error = false;
            state.message = "Transactions Deleted Successfully";
            toast.success("Transactions Deleted Successfully");
        });
        builder.addCase(deleteAllCategoryTransactions.rejected, (state, action) => {
            state.transactions = [];
            state.error = true;
            state.message = action.payload;
            toast.error(action.payload);
        });
    }
});


export const deleteCategoryAndTransactions = (details) => (dispatch, getState) => {
    dispatch(deleteAllCategoryTransactions(details));
    if(getState().transaction.error === false)
    {
        dispatch(deleteCategory(details.category));
    }
}

export const updateCategoryAndTransactions = (details) => (dispatch, getState) => {
    dispatch(updateTransactionsCategory(details));
    if(getState().transaction.error === false)
    {
        dispatch(updateCategory(details));
    }
}

export const { clearTransaction } = TransactionSlice.actions;

export default TransactionSlice.reducer;

