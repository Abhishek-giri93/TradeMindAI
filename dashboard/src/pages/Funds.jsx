import FundsSummary from "../components/funds/FundsSummary";
import DepositWithdraw from "../components/funds/DepositWithdraw";
import TransactionHistory from "../components/funds/TransactionHistory";
import { 
  getBalance,
  depositFunds,
  withdrawFunds, 
  getTransactions
 } from "../api/fundsApi";
import { useEffect, useState } from "react";
function Funds({
  balance,
  setBalance,
  transactions,
  setTransactions,
}) {

  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [transactionType, setTransactionType] = useState("");

  function clearSuccessMessage(){
    setSuccessMessage("");
  }

  async function handleTransaction(type, amount) {
    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount <= 0) {
      return;
    }

    if (type === "withdraw" && numericAmount > balance) {
      alert("Insufficient balance.");
      return;
    }

    if (type === "deposit") {
      // setBalance((prev) => prev + numericAmount);
      try{
        setIsProcessing(true);
        const data = await depositFunds(numericAmount);
        console.log("Deposit successful:", data);
        setTransactionType("deposit")
        setSuccessMessage(
          `₹${numericAmount.toLocaleString("en-IN")} deposited successfully.`
        );

        const latestAmount = await getBalance();
        setBalance(Number(latestAmount.balance));
      }catch(error){
        console.error("Deposit failed : ", error);
        alert(error.message);
      }
      finally{
        setIsProcessing(false);
      }
    }

    if(type === "withdraw"){
      try{
        setIsProcessing(true);
        const data = await withdrawFunds(numericAmount);
        console.log("Withdraw funds", data);
        const latestAmount = await getBalance();
        setBalance(Number(latestAmount.balance));
        setTransactionType("withdraw");

        setSuccessMessage(
          `₹${numericAmount.toLocaleString("en-IN")} withdrawal successfully.`
        );
      }catch(error){
        console.error("Withdrawal failed : ", error);
        alert(error.message);
      }finally{
        setIsProcessing(false);
      }
    }

    
  }
  useEffect(()=>{
    getTransactions()
    .then((data)=>{
      console.log("Transactions:", data.transactions);
      setTransactions(data.transactions);
    })
    .catch((error) => {
      console.error("Transaction history error:", error);
    })
  }, [setTransactions]);
  useEffect(()=>{
    getBalance().then((data)=>{
      console.log("Balance API response :", data);
      setBalance(Number(data.balance));
    })
    .catch((error) => {
      console.error("Balance API error : ", error);
    })
  },[setBalance]);

  return (
    <>
      {/* ==================================================
          FUNDS PAGE
          ================================================== */}

      <div className="funds-page px-3 py-4 px-md-4">

        {/* Page Header */}
        <div className="mb-4">
          <h2 className="fw-bold mb-1">
            Funds
          </h2>

          <p className="text-secondary mb-0">
            Manage your available funds and transactions.
          </p>
        </div>

        {/* Funds Summary */}
        <FundsSummary
          balance={balance}
        />

        {/* Deposit / Withdraw */}
        <div className="mt-4">
          <DepositWithdraw
            balance={balance}
            handleTransaction={handleTransaction}
            isProcessing = {isProcessing}
            successMessage={successMessage}
            clearSuccessMessage={clearSuccessMessage}
            transactionType={transactionType}
          />
        </div>

        {/* Transaction History */}
        <div className="mt-4">
          <TransactionHistory
            transactions={transactions}
          />
        </div>

      </div>
    </>
  );
}

export default Funds;