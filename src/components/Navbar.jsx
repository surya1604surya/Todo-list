import React from 'react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center bg-slate-700 text-white h-fit py-2 px-6 shadow-md z-10">
      {/* Logo */}
      <div className="text-xl font-bold">iTask</div>

      {/* Navigation Links */}
      <ul className="flex gap-6 text-sm">
        <li className="cursor-pointer hover:font-bold transition-all">Home</li>
        <li className="cursor-pointer hover:font-bold transition-all">Your Tasks</li>
      </ul>
    </nav>
  );
}
