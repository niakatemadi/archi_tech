import './App.css';
import AuthenticationPage from './pages/AuthenticationPage/AuthenticationPage';
import { useContext, createContext, useState } from 'react';
import React from 'react';
import UserProvider from './utils/contexts/userContext';
import UserDashboard from './pages/UserDashboard/UserDashboard';

function App() {

  const [currentUser, setCurrentUser]= useState({});
  const greeting = "Hello"
  return (
      <div className="App">
        <UserProvider>
          <AuthenticationPage />
          <UserDashboard />
        </UserProvider>
      </div>
  );
}

export default App;
