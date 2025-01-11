
// Dashboard.tsx
import React from 'react';
import { toast } from 'react-toastify';

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <button
        onClick={() => {
          localStorage.removeItem('accessToken');
          toast.info('Logged out.');
          window.location.href = '/login';
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;