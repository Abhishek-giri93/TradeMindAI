import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Layout from "./components/layout/Layout";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Funds from "./pages/Funds";
import Apps from "./pages/Apps";
import Profile from "./pages/Profile";
import ProtectedRoutes from "./components/auth/ProtectedRoutes";

import { getOrders } from "./api/ordersApi";
import { getBalance } from "./api/fundsApi";

function App() {

  // ==========================================
  // ORDERS STATE
  // ==========================================

  const [orders, setOrders] = useState([]);

  const [isTradingDataLoading, setIsTradingDataLoading] =
    useState(true);


  // ==========================================
  // BALANCE STATE
  // ==========================================

  const [balance, setBalance] = useState(0);


  // ==========================================
  // TRANSACTIONS STATE
  // ==========================================

  const [transactions, setTransactions] = useState([]);


  // ==========================================
  // REFRESH ORDERS
  // ==========================================

  const refreshOrders = async () => {
    try {

      const ordersData = await getOrders();

      console.log(
        "Orders refreshed:",
        ordersData
      );

      setOrders(ordersData);

    } catch (error) {

      console.error(
        "Failed to refresh orders:",
        error
      );

    }
  };


  // ==========================================
  // LOAD TRADING DATA
  // ==========================================

  useEffect(() => {

    const loadTradingData = async () => {

      try {

        // --------------------------------------
        // Load Orders
        // --------------------------------------

        await refreshOrders();


        // --------------------------------------
        // Load Balance
        // --------------------------------------

        const balanceData = await getBalance();

        setBalance(
          Number(balanceData.balance)
        );

      } catch (error) {

        console.error(
          "Failed to load trading data:",
          error
        );

      } finally {

        setIsTradingDataLoading(false);

      }

    };

    loadTradingData();

  }, []);


  return (
    <BrowserRouter>

      <Routes>

        <Route element={<ProtectedRoutes />}>

        <Route element={<Layout />}>


            {/* =================================
                HOME
            ================================== */}

            <Route
              path="/"
              element={<Home />}
            />


            {/* =================================
                DASHBOARD
            ================================== */}

            <Route
              path="/dashboard"
              element={
                <Dashboard
                  orders={orders}
                  setOrders={setOrders}
                  balance={balance}
                  setBalance={setBalance}
                  isTradingDataLoading={
                    isTradingDataLoading
                  }
                />
              }
            />


            {/* =================================
                ORDERS
            ================================== */}

            <Route
              path="/orders"
              element={
                <Orders
                  orders={orders}
                  refreshOrders={refreshOrders}
                />
              }
            />


            {/* =================================
                FUNDS
            ================================== */}

            <Route
              path="/funds"
              element={
                <Funds
                  balance={balance}
                  setBalance={setBalance}
                  transactions={transactions}
                  setTransactions={setTransactions}
                />
              }
            />


            {/* =================================
                APPS
            ================================== */}

            <Route
              path="/apps"
              element={
                <Apps />
              }
            />


            {/* =================================
                PROFILE
            ================================== */}

            <Route
              path="/profile"
              element={
                <Profile />
              }
            />


          </Route>

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;