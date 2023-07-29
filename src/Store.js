import CategorySlice from "./reducers/categorySlice";
import TransactionSlice from "./reducers/transactionSlice";
import UserSlice from "./reducers/userSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        category: CategorySlice,
        transaction: TransactionSlice,
        user: UserSlice,
    },
});

export default store;