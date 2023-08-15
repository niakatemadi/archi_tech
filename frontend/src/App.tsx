import './App.css';
import AuthenticationPage from './pages/AuthenticationPage/AuthenticationPage';
import { useContext, createContext, useState } from 'react';

function App() {

  const [currentUser, setCurrentUser]= useState({});
  const AuthContext = createContext({});
  
  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className="App">
        <AuthenticationPage />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
