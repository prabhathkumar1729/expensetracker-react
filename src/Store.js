import { configureStore } from '@reduxjs/toolkit';
import CategorySlice from './reducers/categorySlice';
import TransactionSlice from './reducers/transactionSlice';
import UserSlice from './reducers/userSlice';

const store = configureStore({
  reducer: {
    category: CategorySlice,
    transaction: TransactionSlice,
    user: UserSlice,
  },
});

export default store;
