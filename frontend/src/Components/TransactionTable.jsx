import React, { useState, useEffect } from "react";

export default function TransactionTable() {
  const [month, setMonth] = useState("March");
  const [transactionList, setTransactionList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    console.log("Fetching transactions...");
    const fetchTransactions = async () => {
      try {
        console.log("Fetching transactions for month:", month);
        const response = await fetch(`http://localhost:3000/list-transactions`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log("Fetched transactions:", data);
        // setTransactionList(data);
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      }
    };

    fetchTransactions();
  }, [month, searchTerm, currentPage]); // Include fetchTransactions in the dependency array

  return (
    <div>
      <h2>Transaction Table</h2>
      {/* Dropdown for selecting month */}
      <select value={month} onChange={(e) => setMonth(e.target.value)}>
        {/* Options for selecting month */}
        {[
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ].map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>
      {/* Search input */}
      <input
        type="text"
        placeholder="Search transaction"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {/* Transaction table */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Image</th>
            <th>Sold</th>
            <th>Date of Sale</th>
          </tr>
        </thead>
        <tbody>
          {transactionList.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction.id}</td>
              <td>{transaction.title}</td>
              <td>{transaction.price}</td>
              <td>{transaction.description}</td>
              <td>{transaction.category}</td>
              <td>
                <img src={transaction.image} alt={transaction.title} />
              </td>
              <td>{transaction.sold ? "Yes" : "No"}</td>
              <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination buttons */}
      <button onClick={() => setCurrentPage((prevPage) => prevPage - 1)}>
        Previous
      </button>
      <button onClick={() => setCurrentPage((prevPage) => prevPage + 1)}>
        Next
      </button>
    </div>
  );
}
