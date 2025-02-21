import { useContext } from "react";
import {  authProvider } from "../Contexts/AuthContext";


export const useAuth = () => {
  const context = useContext(authProvider)
  return context
};