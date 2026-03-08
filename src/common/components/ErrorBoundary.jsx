import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: '2rem',
            fontFamily: 'system-ui, sans-serif',
            maxWidth: '600px',
            margin: '2rem auto',
          }}
        >
          <h1 style={{ color: '#c62828', marginBottom: '1rem' }}>
            Something went wrong
          </h1>
          <pre
            style={{
              background: '#f5f5f5',
              padding: '1rem',
              overflow: 'auto',
              fontSize: '0.875rem',
            }}
          >
            {this.state.error?.message}
          </pre>
          <p style={{ color: '#666', marginTop: '1rem' }}>
            Check the browser console for more details. Make sure you have a{' '}
            <code>.env</code> file with Firebase config (see <code>.env.example</code>
            ).
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
