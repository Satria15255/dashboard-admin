"use client";

import { useState } from "react";

export default function AddTransactionsForm({ onAdd }: { onAdd: (transaction: any) => void }) {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    status: "Pending",
    date: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTransaction = { ...formData, amount: Number(formData.amount) };

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
      setFormData({ name: "", amount: "", status: "Pending", date: new Date().toISOString().split("T")[0] });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input type="text" name="name" placeholder="Transaction Name" value={formData.name} onChange={handleChange} required className="border p-2 mr-2" />
      <input type="text" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} required className="border p-2 mr-2" />
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
