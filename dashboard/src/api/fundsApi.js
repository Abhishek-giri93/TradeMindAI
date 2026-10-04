
const API_URL = import.meta.env.VITE_API_URL;

export const getBalance = async () =>{
  const response = await fetch(`${API_URL}/funds/balance`, {
    method : "get",
    credentials : "include"
  })
  // getting the json response-
  const data = await response.json();

  // checking the status -
  if(!response.ok){
    throw new Error(data.message || "Failed to fetch balance");
  }
  return data;
};

export const depositFunds = async(amount) => {
  const response = await fetch(`${API_URL}/funds/deposit`, {
    method : "POST",
    credentials : "include",
    headers : {
      "Content-Type" : "application/json",
    },
    body : JSON.stringify({
      amount : Number(amount),
    })
  })

  const data = await response.json();
  if(!response.ok){
    throw new Error(data.message || "Deposit failed");
  }
  return data;
}

export const withdrawFunds = async (amount)=>{
  const response = await fetch(`${API_URL}/funds/withdraw`, {
    method : "POST",
    credentials : "include",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify({
      amount : Number(amount),
    })
  })
  const data = await response.json();
  if(!response.ok){
    throw new Error(data.message || "Withdrawal failed");
  }
  return data;
}

export const getTransactions = async() => {
  const response = await fetch(`${API_URL}/funds/transactions`,{
    method : "GET",
    credentials : "include"
  });
  const data = await response.json();
  if(!response.ok){
    throw new Error(data.message || "Failed to fetch transaction");
  }
  return data;
}