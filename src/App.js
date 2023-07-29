import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getTransactions } from "./reducers/transactionSlice";
import { setUser } from "./reducers/userSlice";
import { getUserCategories } from "./reducers/categorySlice";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Loader from "./components/Loader";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Transactions from "./pages/Transactions";
import Categories from "./pages/Categories";
import Profile from "./pages/Profile";
import AuthorisedLayout from "./components/AuthorisedLayout";
import UnAuthorisedLayout from "./components/UnAuthorisedLayout";
import ForgotPassword from "./pages/ForgotPassword";
const decodeJwtToken = (token) => {
  const payload = token.split(".")[1];
  const decodedPayload = JSON.parse(atob(payload));
  return decodedPayload;
};

function App() {
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("JWTToken");
  //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjEwMiIsIk5hbWUiOiJUZXN0ZXIyIiwiRW1haWwiOiJ0ZXN0ZXIyQGFiYy5jb20iLCJleHAiOjE2OTA0NDU3NTMsImlzcyI6ImxvY2FsaG9zdDo3MjIwIiwiYXVkIjoibG9jYWxob3N0OjcyNTkifQ.YuSHficP5SlR0p965JIIPLZSAhgKpmmCQNTUptQoBNE';
  const dispatch = useDispatch();
  const user = token ? decodeJwtToken(token) : null;

  useEffect(() => {
    const fetchData = async () => {
      if (user != null) {
        dispatch(setUser(user));
        await dispatch(getTransactions(user.Id));
        await dispatch(getUserCategories(user.Id));
      }
      setLoading(false);
    };
    fetchData();
  }, [dispatch, token, user]);

  return (
    <Router>
      {loading ? (
        <div className="loader">
          <Loader />
        </div>
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              token ? (
                <Navigate to="/dashboard" />
              ) : (
                <UnAuthorisedLayout>
                  <Home />
                </UnAuthorisedLayout>
              )
            }
          />
          <Route
            path="/login"
            element={
              token ? (
                <Navigate to="/dashboard" />
              ) : (
                <UnAuthorisedLayout>
                  <Login />
                </UnAuthorisedLayout>
              )
            }
          />
          <Route
            path="/register"
            element={
              token ? (
                <Navigate to="/dashboard" />
              ) : (
                <UnAuthorisedLayout>
                  <Register />
                </UnAuthorisedLayout>
              )
            }
          />
          <Route path="/forgotpass"
            element={
              token ? (
                <Navigate to="/dashboard" />
              ) : (
                <UnAuthorisedLayout>
                  <ForgotPassword />
                </UnAuthorisedLayout>
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              token ? (
                <AuthorisedLayout>
                  <Dashboard />
                </AuthorisedLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/transactions"
            element={
              token ? (
                <AuthorisedLayout>
                  <Transactions />
                </AuthorisedLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/categories"
            element={
              token ? (
                <AuthorisedLayout>
                  <Categories />
                </AuthorisedLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/profile"
            element={
              token ? (
                <AuthorisedLayout>
                  <Profile />
                </AuthorisedLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      )}
    </Router>
  );
}

export default App;
