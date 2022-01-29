import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase-config';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  // signInWithRedirect, 
  signInWithPopup,
  signOut,
} from "firebase/auth";

const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
}

function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
    });
    return () => {
      unsubscribe();
    }
  }, []);

  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account"
    });
    return signInWithPopup(auth, provider);
  }

  function logout() {
    console.log("logout");
    return signOut(auth);
  }

  const value = {
    currentUser,
    signInWithGoogle,
    logout,
  };
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export { useAuth };
export default AuthContextProvider;