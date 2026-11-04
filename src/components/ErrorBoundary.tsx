// src/components/ErrorBoundary.tsx
import { Component, type ReactNode } from 'react';
import { ShieldAlert, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-navyPanel flex items-center justify-center px-6">
          <div className="max-w-lg w-full text-left space-y-8">

            <div className="space-y-2">
              <div className="flex items-center gap-3 mb-6">
                <ShieldAlert className="w-5 h-5 text-alertRed animate-pulse" />
                <span className="text-xs font-mono font-black tracking-widest text-alertRed uppercase">
                  Application Error
                </span>
              </div>
              <h1 className="text-5xl font-black text-white leading-none tracking-tighter">
                Something went wrong.
              </h1>
              <p className="text-lg font-black text-white/60 uppercase tracking-tight">
                Unexpected Error
              </p>
            </div>

            <div className="border-l-2 border-alertRed pl-6 space-y-2">
              <p className="text-sm text-white/50 font-mono leading-relaxed">
                The application encountered an unexpected error. Refresh the page to try again.
                If the problem persists, contact our support team.
              </p>
              {this.state.error && (
                <p className="text-[10px] font-mono text-white/20 break-all">
                  {this.state.error.message}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-responseGreen hover:bg-emerald-600 text-navyPanel font-bold uppercase tracking-wider text-xs transition-colors"
              >
                <RefreshCw className="w-4 h-4" /> Reload Page
              </button>
              <a
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/20 hover:border-white text-white font-mono text-xs tracking-widest font-bold uppercase transition-colors"
              >
                Return to Homepage
              </a>
            </div>

            <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
              CleanAfrica Associates Platform — Unhandled Error
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
