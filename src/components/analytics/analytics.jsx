import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { url } from "../../constants/constants";
import { trasactionStatusContext } from "../../helper/context";
import "./analytics.css";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Analytics = () => {
  let expense = [];
  const encome = [];

  const [AllTransactions, setAllTransactions] = useState([]);
  const [incomeTransactions, setIncomeTransactions] = useState([]);
  const { amount, setAmount } = useContext(trasactionStatusContext);
  const getAllTransactions = async () => {
    let inc;
    let ex;
    try {
      const response = await axios.get(`${url.getTransaction}`);
      const transactions = response.data;

      for (const key in transactions) {
        const date = new Date(transactions[key].createdAt).getMonth() + 1;
        if (transactions[key].category.transactionType === "EXPENSE") {
          ex = transactions[key].amount;
          inc = 0;
        } else {
          ex = 0;
          inc = transactions[key].amount;
        }
        expense.push({
          name: date,
          Income: inc,
          Expense: ex,
        });

        if (transactions[key].category.transactionType === "EXPENSE") {
          encome.push({
            name: date,
            value: transactions[key].amount,
          });
        }
      }
      setAllTransactions(expense);
      setIncomeTransactions(encome);
    } catch (error) {
      console.log(error);
    }
  };
  const COLORS = ["#FFF5DF", "#ECAA11", "#5E419A", "#EEE4F8"];
  useEffect(() => {
    getAllTransactions();
  }, []);

  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  return (
    <>
      <>
        <div className="analyticsContainer">
          <div className="accountDetails">
            <span className="amount">{amount} RWF</span>
            <h6 className="date">{today.toDateString()}</h6>
          </div>
          <div className="transactionButtons">
            <button className="expence">EXPENSE</button>
            <button className="income">INCOME</button>
          </div>
          <span className="tTitle">EXPENSE VS INCOME</span>
          <div className="expenseAnalytics">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={AllTransactions}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Line type="monotone" dataKey="Income" stroke="#5E419A" />
                <Line type="monotone" dataKey="Expense" stroke="#ECAA11" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <span className="tTitle">EXPENSE</span>
          <div className="incomeAnalytics">
            <PieChart width={800} height={400}>
              <Pie
                data={incomeTransactions}
                cx={200}
                cy={120}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label
              >
                {incomeTransactions.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </div>
        </div>
      </>
    </>
  );
};
export default Analytics;
