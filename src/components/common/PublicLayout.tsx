import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F6F3EE] text-[#1B1F1E]">
      <Navbar />
      <main className="flex-1 pb-16 md:pb-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
