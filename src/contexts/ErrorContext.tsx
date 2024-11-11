"use client"
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { toast } from 'react-toastify';

interface TErrorContext {
  error: string | null;
  setError: (message: string | null) => void;
}

export const ErrorContext = createContext<TErrorContext>({
  error: null,
  setError: () => {},
});

export const useErrorHandler = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useErrorHandler must be used within an ErrorProvider');
  }
  return context;
};

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    if (error) {
      toast.error(error);
      setError(null)
    }
  }, [error]);

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
    </ErrorContext.Provider>
  );
};
