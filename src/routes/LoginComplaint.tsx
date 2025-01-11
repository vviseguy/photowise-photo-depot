// Login.tsx
import React from 'react';
import data from "../utils/loginComplaints.json"
import { getRandomElement } from '../utils/randomtools';

const LoginComplaint: React.FC = () => {

  return (
    <div>
      <h1>Uh-oh!</h1>
      <p>{getRandomElement(data)}</p>
    </div>
  );
};

export default LoginComplaint;