import { useState, useEffect } from "react";

// ==========================================
// DASHBOARD COMPONENTS
// ==========================================

import Summary from "../components/dashboard/Summary";
import WatchList from "../components/dashboard/WatchList";
import Holdings from "../components/dashboard/Holdings";
import Positions from "../components/dashboard/Positions";

import PortfolioAllocation from "../components/dashboard/PortfolioAllocation";
import PortfolioFluctuation from "../components/dashboard/PortfolioFluctuation";

import StockPriceChart from "../components/dashboard/StockPriceChart";

import OrderModal from "../components/dashboard/OrderModal";
import OrderConfirmation from "../components/dashboard/OrderConfirmation";
import RecentOrders from "../components/dashboard/RecentOrders";

// ==========================================
// API
// ==========================================

import { getOrders } from "../api/ordersApi";
import { getBalance } from "../api/fundsApi";
import { getHoldings } from "../api/holdingsApi";


// ==========================================
// DASHBOARD
// ==========================================

function Dashboard({
  orders,
  setOrders,
  balance,
  setBalance,
  isTradingDataLoading,
}) {

  // ==========================================
  // ORDER STATES
  // ==========================================

  const [orderType, setOrderType] = useState("");

  const [isOrderOpen, setIsOrderOpen] =
    useState(false);

  const [selectedStock, setSelectedStock] =
    useState(null);

  const [quantity, setQuantity] =
    useState(1);


  // ==========================================
  // CONFIRMATION STATE
  // ==========================================

  const [isConfirmationOpen, setIsConfirmationOpen] =
    useState(false);


  // ==========================================
  // HOLDINGS STATE
  // ==========================================

  const [holdings, setHoldings] =
    useState([]);

  const [isHoldingsLoading, setIsHoldingsLoading] =
    useState(true);


  // ==========================================
  // REFRESH ORDERS
  // ==========================================

  const refreshOrders = async () => {

    try {

      const data = await getOrders();

      console.log(
        "Orders refreshed:",
        data
      );

      setOrders(data);

    } catch (error) {

      console.error(
        "Failed to refresh orders:",
        error
      );

    }

  };


  // ==========================================
  // REFRESH BALANCE
  // ==========================================

  const refreshBalance = async () => {

    try {

      const data = await getBalance();

      console.log(
        "Balance refreshed:",
        data
      );

      setBalance(
        Number(data.balance)
      );

    } catch (error) {

      console.error(
        "Failed to refresh balance:",
        error
      );

    }

  };


  // ==========================================
  // REFRESH HOLDINGS
  // ==========================================

  const refreshHoldings = async () => {

    try {

      setIsHoldingsLoading(true);

      const data = await getHoldings();

      console.log(
        "Holdings refreshed:",
        data
      );

      setHoldings(
        Array.isArray(data?.holdings)
          ? data.holdings
          : []
      );

    } catch (error) {

      console.error(
        "Failed to refresh holdings:",
        error
      );

      setHoldings([]);

    } finally {

      setIsHoldingsLoading(false);

    }

  };


  // ==========================================
  // INITIAL HOLDINGS LOAD
  // ==========================================

  useEffect(() => {

    refreshHoldings();

  }, []);


  // ==========================================
  // SELECT STOCK
  // ==========================================

  const handleStockSelect = (stock) => {

    setSelectedStock(stock);

  };


  // ==========================================
  // OPEN ORDER MODAL
  // ==========================================

  const orderShow = (type, stock) => {

    setSelectedStock(stock);

    setOrderType(type);

    setQuantity(1);

    setIsOrderOpen(true);

  };


  // ==========================================
  // CLOSE ORDER MODAL
  // ==========================================

  const orderHide = () => {

    setIsOrderOpen(false);

  };


  // ==========================================
  // OPEN CONFIRMATION
  // ==========================================

  const confirmationShow = () => {

    setIsConfirmationOpen(true);

  };


  // ==========================================
  // CLOSE CONFIRMATION
  // ==========================================

  const confirmationHide = () => {

    setIsConfirmationOpen(false);

  };


  // ==========================================
  // TOTAL ORDER PRICE
  // ==========================================

  const totalPrice = selectedStock
    ? Number(selectedStock.price || 0) *
      Number(quantity || 0)
    : 0;


  // ==========================================
  // UI
  // ==========================================

  return (

    <main className="dashboard px-3 py-4 px-md-4">


      {/* ==================================================
          1. PORTFOLIO SUMMARY
      =================================================== */}

      <section className="dashboard-section">

        <Summary
          holdings={holdings}
        />

      </section>


      {/* ==================================================
          2. PORTFOLIO ANALYTICS
          
          LEFT  → Portfolio Allocation
          RIGHT → Portfolio Fluctuation
      =================================================== */}

      <section className="dashboard-section mt-4">

        <div className="row g-4 align-items-stretch">


          {/* ================================================
              PORTFOLIO ALLOCATION
          ================================================= */}

          <div className="col-12 col-xl-6 d-flex">

            <div className="dashboard-panel w-100">

              <PortfolioAllocation
                holdings={holdings}
                isLoading={isHoldingsLoading}
              />

            </div>

          </div>


          {/* ================================================
              PORTFOLIO FLUCTUATION
          ================================================= */}

          <div className="col-12 col-xl-6 d-flex">

            <div className="dashboard-panel w-100">

              <PortfolioFluctuation
                holdings={holdings}
                isLoading={isHoldingsLoading}
              />

            </div>

          </div>

        </div>

      </section>


      {/* ==================================================
          3. STOCK PRICE CHART
      =================================================== */}

      <section className="dashboard-section mt-4">

        <div className="row g-4">

          <div className="col-12 d-flex">

            <div className="dashboard-panel w-100">

              <StockPriceChart
                stock={selectedStock}
              />

            </div>

          </div>

        </div>

      </section>


      {/* ==================================================
          4. WATCHLIST + HOLDINGS
      =================================================== */}

      <section className="dashboard-section mt-4">

        <div className="row g-4">


          {/* ================================================
              WATCHLIST
          ================================================= */}

          <div className="col-12 col-xl-5 d-flex">

            <div className="dashboard-panel w-100">

              <WatchList
                orderShow={orderShow}
                holdings={holdings}
                onStockSelect={handleStockSelect}
              />

            </div>

          </div>


          {/* ================================================
              HOLDINGS
          ================================================= */}

          <div className="col-12 col-xl-7 d-flex">

            <div className="dashboard-panel w-100">

              <Holdings
                holdings={holdings}
                isLoading={isHoldingsLoading}
              />

            </div>

          </div>

        </div>

      </section>


      {/* ==================================================
          5. ORDERS + POSITIONS
      =================================================== */}

      <section className="dashboard-section mt-4">

        <div className="row g-4">


          {/* ================================================
              RECENT ORDERS
          ================================================= */}

          <div className="col-12 col-xl-5 d-flex">

            <div className="dashboard-panel w-100">

              {/* ============================================
                  ORDER MODAL
              ============================================= */}

              {isOrderOpen && (

                <OrderModal

                  orderHide={orderHide}

                  orderType={orderType}

                  selectedStock={selectedStock}

                  quantity={quantity}

                  setQuantity={setQuantity}

                  confirmationShow={
                    confirmationShow
                  }

                  balance={balance}

                  holdings={holdings}

                  refreshOrders={
                    refreshOrders
                  }

                  refreshBalance={
                    refreshBalance
                  }

                  refreshHoldings={
                    refreshHoldings
                  }

                />

              )}


              {/* ============================================
                  ORDER CONFIRMATION
              ============================================= */}

              {isConfirmationOpen && (

                <OrderConfirmation

                  confirmationHide={
                    confirmationHide
                  }

                  selectedStock={
                    selectedStock
                  }

                  orderType={
                    orderType
                  }

                  quantity={
                    quantity
                  }

                  totalPrice={
                    totalPrice
                  }

                />

              )}


              {/* ============================================
                  RECENT ORDERS
              ============================================= */}

              <RecentOrders

                orders={orders}

                isLoading={
                  isTradingDataLoading
                }

                onOrderCancelled={
                  refreshOrders
                }

              />

            </div>

          </div>


          {/* ================================================
              POSITIONS
          ================================================= */}

          <div className="col-12 col-xl-7 d-flex">

            <div className="dashboard-panel w-100">

              <Positions

                holdings={holdings}

                isLoading={
                  isHoldingsLoading
                }

              />

            </div>

          </div>

        </div>

      </section>

    </main>

  );

}


export default Dashboard;