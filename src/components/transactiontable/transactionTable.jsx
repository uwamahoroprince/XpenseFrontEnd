import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { url } from "../../constants/constants";
import { trasactionStatusContext } from "../../helper/context";
import "./transactionTable.css";
const TransactionTable = () => {
  const baseT = [];
  const [AllTransactions, setAllTransactions] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const { statusValue, setStatusValue } = useContext(trasactionStatusContext);
  const { idValue, setIdValue } = useContext(trasactionStatusContext);
  const { amount, setAmount } = useContext(trasactionStatusContext);

  const getAllTransactions = async () => {
    try {
      const response = await axios.get(`${url.getTransaction}`);
      const transactions = response.data;
      setAllTransactions(transactions);
    } catch (error) {
      console.log(error);
    }
  };
  const getTransactions = async (accountId) => {
    let Totalamount = 0;
    try {
      if (!statusValue) {
        for (const key in AllTransactions) {
          Totalamount = AllTransactions[key].amount + Totalamount;
          setAmount(Totalamount);
        }
      }
      for (const key in AllTransactions) {
        if (AllTransactions[key].account.id === accountId) {
          baseT.push(AllTransactions[key]);
          Totalamount = AllTransactions[key].amount + Totalamount;
          setAmount(Totalamount);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteTransaction = async (transactionId) => {
    try {
      const response = await axios.delete(
        `${url.postTrasaction}/${transactionId}`
      );
      console.log(response.data);
      setIdValue(idValue);
    } catch (error) {
      console.log(error);
    }
  };

  getTransactions(idValue);
  useEffect(() => {
    getAllTransactions();
  });
  const DataTable = (props) => {
    return (
      <>
        {props.data.map((data) => (
          <div className="table-row">
            <div className="table-data">
              {data.amount} {data.account.currency}
            </div>
            <div className="table-data" style={{ color: "#ccc" }}>
              {data.createdAt}
            </div>
            <div
              className="table-data"
              style={{ fontWeight: "bold", color: "black" }}
            >
              {data.category.name}
            </div>

            <div className="table-data" style={{ color: "#7B728D" }}>
              {data.description}
            </div>

            <div className="editIcon">
              <i
                className="fas fa-pen"
                style={{ color: "#5e419a", cursor: "pointer" }}
              ></i>
            </div>
            <div className="deleteicon">
              <i
                onClick={() => deleteTransaction(data.id)}
                class="fas fa-times"
                style={{ color: "purple", cursor: "pointer" }}
              ></i>
            </div>
          </div>
        ))}
      </>
    );
  };
  return (
    <>
      <div className="table">
        <div className="table-content">
          <DataTable data={statusValue ? baseT : AllTransactions} />
        </div>
      </div>
    </>
  );
};
export default TransactionTable;
