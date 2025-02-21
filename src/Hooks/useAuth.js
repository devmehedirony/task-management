import { useContext } from "react";
import { auth } from "../Contexts/AuthContext";


export const useAuth = () => {
  const context = useContext(auth)
  return context
};