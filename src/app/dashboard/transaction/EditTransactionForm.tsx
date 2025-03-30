import { useState } from "react";

interface Transaction {
  id: number;
  name: string;
  amount: string;
  status: string;
  date: string; // Format tanggal string (YYYY-MM-DD)
}

const EditTransactionForm = ({ transaction, onSave, onCancel }: { transaction: Transaction; onSave: any; onCancel: any }) => {
  const [formData, setFormData] = useState({
    name: transaction.name,
    amount: transaction.amount,
    status: transaction.status,
    date: transaction.date.split("T")[0], // Pastikan format tanggal sesuai
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(transaction.id, { ...formData, amount: Number(formData.amount) });
  };

  return (
    <div className="modal">
      <h2 className="font-bold">Edit Transaksi</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Transaction Name" value={formData.name} onChange={handleChange} required className="border p-2 mr-2" />
        <input type="text" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} required className="border p-2 mr-2" />
        <select name="status" value={formData.status} onChange={handleChange} className="border p-2 mr-2">
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Failed">Failed</option>
        </select>
        <input type="date" name="date" value={formData.date} onChange={handleChange} required className="mr-10" />
        <button className="px-4 border bg-blue-500 font-bold py-1 text-white rounded-md ml-10" type="submit">
          Simpan
        </button>
        <button className="px-4 border bg-blue-500 font-bold py-1 text-white rounded-md" type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditTransactionForm;
