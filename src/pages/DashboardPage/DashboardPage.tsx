// pages/DashboardPage.tsx
import React from 'react';
import { Button } from '../../components/common/Button';

const DashboardPage = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Button onClick={() => console.log('Clicked!')}>Click Me</Button>
    </div>
  );
};

export default DashboardPage;
