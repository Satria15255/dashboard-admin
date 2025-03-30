"use client";

import { Bell, User } from "lucide-react";

export default function Navbar() {
  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-700">Dashboard</h1>
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-600 hover:text-gray-800">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">3</span>
        </button>
        <div className="flex items-center gap-2">
          <User size={20} className="text-gray-600" />
          <span className="text-gray-700">Admin</span>
        </div>
      </div>
    </header>
  );
}
