import axios from 'axios';

const apiInstance = axios.create({
  baseURL: 'https://localhost:7220/api/Transaction/',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('JWTToken')}`,
  },
});

const getTransactions = async (userId) => {
  const request = await apiInstance.get(`GetAllTransactions/${userId}`);
  return request.data;
};

const getTransaction = async (transactionId) => {
  const request = await apiInstance.get(`GetTransaction/${transactionId}`);
  return request.data;
};

const addTransaction = async (transaction) => {
  const request = await apiInstance.post('AddTransaction', transaction);
  return request.data;
};

const deleteTransaction = async (transactionId) => {
  const request = await apiInstance.delete(
    `DeleteTransaction/${transactionId}`,
  );
  return request.data;
};

const deleteMultipleTransaction = async (transactionIds) => {
  const request = await apiInstance.post(
    'DeleteMultipleTransactions/',
    transactionIds,
  );
  return request.data;
};

const updateTransaction = async (transaction) => {
  const request = await apiInstance.put('updateTransaction', transaction);
  return request.data;
};

const filterTransactionsDashboard = async (filter) => {
  const request = await apiInstance.post('GetFilteredTransactions', filter);
  return request.data;
};

const TransactionServices = {
  getTransactions,
  getTransaction,
  addTransaction,
  deleteTransaction,
  deleteMultipleTransaction,
  updateTransaction,
  filterTransactionsDashboard,
};

export default TransactionServices;
