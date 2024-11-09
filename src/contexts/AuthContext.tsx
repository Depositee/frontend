"use client";
import getCurrentUser from "@/api/auth/getCurrentUser.api";
import { GetCurrentUserData } from "@/interface/auth/user";
import { ReactNode, createContext, useEffect, useState } from "react";


interface TAuthContext {
  currentUser: GetCurrentUserData | null;
  isLogin : boolean;
  setCurrentUser : (currentEntity: GetCurrentUserData | null) => void;
  setIsLogin : (isLogin : boolean ) => void;
}

export const AuthContext = createContext<TAuthContext>({
    currentUser: null,
    setCurrentUser: () => {},
    isLogin: false,
    setIsLogin: () => {},
});

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<GetCurrentUserData | null>(null);
  const [isLogin ,setIsLogin] = useState<boolean>(false);
  
  useEffect(() => {
      getCurrentUser().then((Response) => {
          setCurrentUser(Response);
      });
    }, 
  []);
  

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser ,isLogin ,setIsLogin}}>
      {children}
    </AuthContext.Provider>
  );
};