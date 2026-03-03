import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);
    // You can log errors to an error reporting service here
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '50vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#e202e2' }}>
            Oops! Something went wrong
          </h1>
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: '#666' }}>
            We're sorry for the inconvenience. Please try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.75rem 2rem',
              fontSize: '1rem',
              backgroundColor: '#e202e2',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginRight: '1rem'
            }}
          >
            Refresh Page
          </button>
          <a
            href="/"
            style={{
              padding: '0.75rem 2rem',
              fontSize: '1rem',
              backgroundColor: '#6f7285',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '5px'
            }}
          >
            Go Home
          </a>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;