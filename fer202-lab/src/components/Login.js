// src/components/Login.js
import React from 'react';
import { auth, googleProvider } from '../config/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { toast } from 'react-toastify';

const signInWithGoogle = async (setUser) => {
  if (typeof window !== 'undefined' && auth && googleProvider) {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      setUser(user);
      toast.success('Login successfully!');
    } catch (error) {
      console.error('Error during sign-in:', error);
      toast.error('Login error!');
    }
  }
};

export default signInWithGoogle;
