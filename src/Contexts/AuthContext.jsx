import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../firebase/firebase.config";


export const authProvider = createContext()
const auth = getAuth(app)
const provider = new GoogleAuthProvider();



const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      setLoading(false)

          })

    return () => {
      unSubscribe()
    }

  }, [])

  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const login = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logOut = () => {
    setLoading(true)
    return signOut(auth)
  }

  const createUserWithGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, provider)
  }

  const updatedUser = (name) => {
    setLoading(false)
    return updateProfile(auth.currentUser, {
      displayName: name

    })
  }


  const authInfo = {
    user,
    loading,
    createUser,
    createUserWithGoogle,
    login,
    logOut,
    updatedUser
  }
  return (
    <authProvider.Provider value={authInfo}>
      {children}
    </authProvider.Provider>
  );
};

export default AuthContext;