"use client";

import { useState } from "react";
import { Home, Settings, Users, ShoppingBagIcon } from "lucide-react";
import Link from "next/link";

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: <Home size={20} /> },
  { name: "Users", href: "/dashboard/users", icon: <Users size={20} /> },
  { name: "Transaction", href: "/dashboard/transaction", icon: <ShoppingBagIcon size={20} /> },
  { name: "Settings", href: "/dashboard/settings", icon: <Settings size={20} /> },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside className={`bg-gray-900 text-white vh-100 p-4 transition-all ${isOpen ? "w-64" : "w-20"}`}>
      <button onClick={() => setIsOpen(!isOpen)} className="mb-4 p-2 bg-gray-700 rounded hover:bg-gray-600">
        {isOpen ? "⬅" : "➡"}
      </button>
      <nav className="flex flex-col gap-4">
        {menuItems.map((item, index) => (
          <Link key={index} href={item.href} className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded">
            {item.icon}
            {isOpen && <span>{item.name}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
