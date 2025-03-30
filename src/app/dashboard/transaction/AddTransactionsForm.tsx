"use client";

import { useState } from "react";

interface Transaction {
  id?: number; // Opsional karena akan dibuat di backend
  name: string;
  amount: number;
  status: "Pending" | "Completed" | "Failed";
  date: string;
}

export default function AddTransactionsForm({ onAdd }: { onAdd: (transaction: Transaction) => void }) {
  const [formData, setFormData] = useState<{
    name: string;
    amount: number;
    status: "Pending" | "Completed" | "Failed";
    date: string;
  }>({
    name: "",
    amount: 0,
    status: "Pending", // Pastikan sesuai dengan tipe yang diizinkan
    date: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : (value as "Pending" | "Completed" | "Failed"), // Konversi hanya jika name === "amount"
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTransaction: Partial<Transaction> = { ...formData, amount: Number(formData.amount) };

    console.log("Sending Data:", newTransaction); // Debugging
    try {
      const res = await fetch("/api/transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTransaction),
      });

      if (!res.ok) throw new Error("Gagal menambahkan transaksi");

      const data = await res.json();
      onAdd(data);
      setFormData({ name: "", amount: 0, status: "Pending", date: new Date().toISOString().split("T")[0] });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input type="text" name="name" placeholder="Transaction Name" value={formData.name} onChange={handleChange} required className="border p-2 mr-2" />
      <input type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} required className="border p-2 mr-2" min="0" />
      <select name="status" value={formData.status} onChange={handleChange} className="border p-2 mr-2">
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
        <option value="Failed">Failed</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Add
      </button>
    </form>
  );
}
