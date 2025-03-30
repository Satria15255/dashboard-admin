"use client";

import { useState, useEffect } from "react";
import AddTransactionsForm from "../transaction/AddTransactionsForm";
import EditTransactionForm from "../transaction/EditTransactionForm";

type Transaction = {
  id: number;
  name: string;
  amount: string;
  status: string;
  date: string;
};

export default function TransactionsTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("/api/transaction");
        console.log("Response API:", response);

        if (!response.ok) throw new Error("Gagal memuat data");

        const data = await response.json();
        console.log("Data dari API:", data);
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  const deleteTransaction = async (id: number) => {
    try {
      console.log("Menghapus transaksi dengan ID:", id);

      const response = await fetch("/api/transaction", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Gagal menghapus transaksi");
      }

      console.log("Transaksi berhasil dihapus");
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addTransaction = (transaction: { name: string; amount: string; status: string; date: string }) => {
    setTransactions((prev) => [...prev, { id: prev.length ? prev[prev.length - 1].id + 1 : 1, ...transaction }]);
  };

  const updateTransaction = async (id: number, updatedData: Partial<Transaction>) => {
    try {
      console.log("Mengupdate transaksi dengan ID:", id, updatedData);

      const response = await fetch("/api/transaction", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, ...updatedData }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Gagal mengupdate transaksi");
      }

      console.log("Transaksi berhasil diperbarui");
      setTransactions((prev) => prev.map((t) => (t.id === id ? { ...t, ...updatedData } : t)));
      setSelectedTransaction(null); // Tutup modal setelah update
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
      <AddTransactionsForm onAdd={addTransaction} />

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border-b">
                <td className="px-4 py-2">{transaction.name}</td>
                <td className="px-4 py-2">{transaction.amount}</td>
                <td className={`px-4 py-2 font-semibold ${transaction.status === "Completed" ? "text-green-500" : transaction.status === "Pending" ? "text-yellow-500" : "text-red-500"}`}>{transaction.status}</td>
                <td className="px-4 py-2">{transaction.date}</td>
                <td className="px-4 py-2">
                  <button onClick={() => deleteTransaction(transaction.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                    Delete
                  </button>
                  <button onClick={() => setSelectedTransaction(transaction)} className="bg-blue-500 text-white px-2 py-1 rounded ml-2">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Jika ada transaksi yang dipilih, tampilkan modal edit */}
      {selectedTransaction && <EditTransactionForm transaction={selectedTransaction} onSave={updateTransaction} onCancel={() => setSelectedTransaction(null)} />}
    </div>
  );
}
