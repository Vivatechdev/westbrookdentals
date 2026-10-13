import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-6 bg-[#FAF9F6]">
      <div className="max-w-sm w-full text-center space-y-6">
        <p className="text-xs uppercase tracking-[0.2em] text-[#6E7571]">404</p>
        <h1 className="font-serif text-3xl font-normal text-[#202421]">Page not found</h1>
        <p className="text-sm text-[#6E7571] leading-relaxed">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-md text-sm font-medium text-white bg-[#315B50] hover:bg-[#25473E] transition-colors"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
};
