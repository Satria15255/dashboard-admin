import { Users, DollarSign, ShoppingBag } from "lucide-react";

const stats = [
  { title: "Total Users", value: "1,250", icon: <Users size={24} />, color: "bg-blue-500" },
  { title: "Total Revenue", value: "$45,230", icon: <DollarSign size={24} />, color: "bg-green-500" },
  { title: "Total Orders", value: "320", icon: <ShoppingBag size={24} />, color: "bg-yellow-500" },
];

export default function StatsCard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
          <div className={`${stat.color} p-3 rounded-full text-white`}>{stat.icon}</div>
          <div>
            <p className="text-gray-600">{stat.title}</p>
            <h2 className="text-2xl font-bold">{stat.value}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}
