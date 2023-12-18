import React, { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase'; 
import { getDatabase, ref, set, onValue } from 'firebase/database';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserRole, setCurrentUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        // Fetch the role from the database and set it in the state
        const db = getDatabase();
        const roleRef = ref(db, 'users/' + user.uid + '/role');
        onValue(roleRef, (snapshot) => {
          const role = snapshot.val();
          setCurrentUserRole(role);
          setLoading(false); // Set loading to false only after the role is fetched
        }, {
          onlyOnce: true // Use onlyOnce to fetch the role once instead of subscribing
        });
      } else {
        setCurrentUserRole(null);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);


  const signup = async (email, password, role) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const db = getDatabase();
    // Set the role in the database
    await set(ref(db, 'users/' + userCredential.user.uid), {
      role: role
    });
    // Set the role in the state
    setCurrentUserRole(role);
    return userCredential; // Return the userCredential for further use
  };

  const signin = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // No need to fetch the role here as it's handled by the onAuthStateChanged listener
    return userCredential;
  };

  const signout = async () => {
    await signOut(auth);
    // Reset the user role to null on sign out
    setCurrentUserRole(null);
  };

  const value = {
    currentUser,
    currentUserRole,
    signup,
    signin,
    signout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
