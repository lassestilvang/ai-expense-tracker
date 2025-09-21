
import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-card shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Expense Tracker</h1>
        <nav>
          <Link href="/insights" className="text-lg font-medium text-primary hover:underline">
            Insights
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
