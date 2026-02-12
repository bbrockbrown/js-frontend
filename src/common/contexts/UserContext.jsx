import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { auth, googleProvider } from '@/firebase-config';
import { 
  signInWithPopup, 
  signOut, 
  sendPasswordResetEmail, 
  updatePassword, 
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const UserContext = React.createContext({
  user: null,
  setUser: () => {}, 
  isLoading: false,
  logout: () => {},
  login: () => {},
  googleAuth: () => {},
  requestPasswordReset: () => {},
  updateUserPassword: () => {},
});

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const buildUrl = (endpoint) =>
    `${import.meta.env.VITE_BACKEND_URL.replace(/\/$/, '')}${endpoint}`;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const idToken = await firebaseUser.getIdToken();
          const response = await fetch(buildUrl('/auth/profile'), {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          });

          if (response.ok) {
            const backendUserData = await response.json();
            setUser({ ...firebaseUser, ...backendUserData });
          } else {
            console.warn("Could not fetch backend profile data. Using Firebase user data only.");
            setUser(firebaseUser); 
          }
        } catch (error) {
          console.error("Error fetching backend profile:", error);
          setUser(firebaseUser); // Fallback to just Firebase user if backend call fails
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe(); // Clean up the subscription
  }, []); 

// Firebase Email/Password Login
  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error) {
      console.error('Firebase Login error:', error);
      throw error;
    }
  };

  // Firebase Logout
  const logout = async () => {
    try {
      await signOut(auth);
      return true;
    } catch (error) {
      console.error('Firebase Logout error:', error);
      throw error;
    }
  };

  // Firebase Google Sign-In
  const googleAuth = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Firebase Google auth error:', error);
      throw new Error('Failed to complete Google authentication');
    }
  };

  // Firebase Password Reset
  const requestPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return true;
    } catch (error) {
      console.error('Firebase Password reset request error:', error);
      throw error;
    }
  };

  // Firebase Update Password
  const updateUserPassword = async (newPassword) => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        // NOTE: For sensitive operations like password update, Firebase might
        // require recent re-authentication. If an error like 'auth/requires-recent-login'
        // occurs, you'll need to prompt the user to re-authenticate first.
        // You would use `reauthenticateWithCredential(currentUser, credential)`
        // where `credential` is obtained from a recent sign-in (e.g., EmailAuthProvider.credential).
        await updatePassword(currentUser, newPassword);
        return true;
      } else {
        throw new Error('No user is currently signed in to update password.');
      }
    } catch (error) {
      console.error('Firebase Password update error:', error);
      throw error;
    }
  };

  const contextValue = {
    user,
    setUser, 
    isLoading,
    login,
    logout,
    googleAuth,
    requestPasswordReset,
    updateUserPassword,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};