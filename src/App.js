import { collection, getDocs, query, where } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import './App.css';
import { AuthContext } from './Context/AuthContext';
import { db } from './firebase';
import AppRouter from './routers/AppRouter';

function App() {

  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
