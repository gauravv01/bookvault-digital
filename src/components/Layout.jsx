import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-primary-light">
      <div className="container mx-auto px-4 py-6 md:px-6 lg:px-8 max-w-7xl">
        {children}
      </div>
    </div>
  );
};

export default Layout;