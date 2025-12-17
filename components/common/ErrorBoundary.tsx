import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Icons } from '../Icons';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex flex-col items-center justify-center p-6 text-center bg-slate-50 rounded-xl border border-slate-200 m-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <Icons.Alert className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Something went wrong</h2>
          <p className="text-slate-500 mb-6 max-w-md">
            The application encountered an unexpected error. Our engineering team has been notified.
          </p>
          <div className="p-4 bg-slate-100 rounded-lg text-left w-full max-w-lg overflow-auto mb-6">
            <code className="text-xs text-red-800 font-mono">
              {this.state.error?.toString()}
            </code>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-nz-blue text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Reload Application
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}