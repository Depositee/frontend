"use client"
import React, { Component, ReactNode } from 'react';
import { toast } from 'react-toastify';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    toast.error("An unexpected error occurred. Please try again.");
  }

  render() {
    if (this.state.hasError) {
      return this.props.children;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
