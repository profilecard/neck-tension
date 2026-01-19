import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50 px-6 py-4">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight text-gray-800">
          <span className="wadiz-color">Neck tension</span> home care
        </h1>
        <div className="flex gap-4 items-center">
          <span className="text-xs text-gray-400 font-medium bg-gray-100 px-2 py-1 rounded">Beta</span>
        </div>
      </div>
    </header>
  );
};

export default Header;