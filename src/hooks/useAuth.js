'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [customerData, setCustomerData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch customer profile from Firestore
  const fetchCustomerData = useCallback(async (uid) => {
    try {
      const docRef = doc(db, 'customers', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCustomerData(docSnap.data());
        return docSnap.data();
      }
      return null;
    } catch (error) {
      console.error('Error fetching customer data:', error);
      return null;
    }
  }, []);

  // Create or update customer profile in Firestore
  const upsertCustomer = useCallback(async (firebaseUser, extras = {}) => {
    try {
      const docRef = doc(db, 'customers', firebaseUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // Update lastLogin
        await setDoc(docRef, { lastLogin: serverTimestamp() }, { merge: true });
      } else {
        // Create new customer
        const data = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || extras.displayName || '',
          phone: extras.phone || '',
          photoURL: firebaseUser.photoURL || '',
          role: 'customer',
          addresses: [],
          isFirstPurchase: true,
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
        };
        await setDoc(docRef, data);
      }

      return await fetchCustomerData(firebaseUser.uid);
    } catch (error) {
      console.error('Error upserting customer:', error);
    }
  }, [fetchCustomerData]);

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        await fetchCustomerData(firebaseUser.uid);
      } else {
        setUser(null);
        setCustomerData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [fetchCustomerData]);

  // Register with email/password
  const register = useCallback(async (email, password, displayName) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName });
    await upsertCustomer(cred.user, { displayName });
    return cred.user;
  }, [upsertCustomer]);

  // Login with email/password
  const login = useCallback(async (email, password) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    await upsertCustomer(cred.user);
    return cred.user;
  }, [upsertCustomer]);

  // Login with Google
  const loginWithGoogle = useCallback(async () => {
    const cred = await signInWithPopup(auth, googleProvider);
    await upsertCustomer(cred.user);
    return cred.user;
  }, [upsertCustomer]);

  // Sign out
  const signOut = useCallback(async () => {
    await firebaseSignOut(auth);
    setUser(null);
    setCustomerData(null);
  }, []);

  // Reset password
  const resetPassword = useCallback(async (email) => {
    await sendPasswordResetEmail(auth, email);
  }, []);

  // Check if user is admin
  const isAdmin = customerData?.role === 'admin';

  const value = {
    user,
    customerData,
    loading,
    register,
    login,
    loginWithGoogle,
    signOut,
    resetPassword,
    isAdmin,
    fetchCustomerData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
