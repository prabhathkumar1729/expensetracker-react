import axios from "axios";

const apiInstance = axios.create({
  baseURL: "https://localhost:7220/api/Transaction/",
});

const getUserCategories = async (userId) => {
  const request = await apiInstance.get("GetUserCategories/" + userId);
  return request.data;
};

const updateTransationsCategory = async (details) => {
  
  const request = await apiInstance.put(
    "UpdateUserTransactionsCatergory",
    details
  );
  return request.data;
};

const deleteAllCategoryTransactions = async (userId, category) => {
  const request = await apiInstance.delete(
    "DeleteTransactionsHavingCategory/" + userId + "/" + category
  );
  return request.data;
};

const CategoryServices = {
    getUserCategories,
    updateTransationsCategory,
    deleteAllCategoryTransactions
};

export default CategoryServices;