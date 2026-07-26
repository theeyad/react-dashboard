import React from "react";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import { Button } from "./ui/button";

interface ErrorFallbackProps {
  reset: () => void;
}

export function ErrorFallback({ reset }: ErrorFallbackProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 text-foreground selection:bg-primary selection:text-primary-foreground">
      <div className="w-full max-w-md border border-border/80 bg-card p-8 rounded-2xl shadow-xl backdrop-blur-sm relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-border">
        {/* Decorative gradient overlay */}
        <div className="absolute -top-12 -left-12 h-32 w-32 rounded-full bg-destructive/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

        <div className="flex flex-col items-center text-center gap-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive border border-destructive/20 animate-pulse">
            <AlertTriangle className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Something went wrong</h2>
            <p className="text-sm text-muted-foreground">
              An unexpected error occurred in the application dashboard.
            </p>
          </div>

          <div className="flex w-full flex-col sm:flex-row gap-3">
            <Button
              className="flex-1 cursor-pointer flex items-center justify-center gap-2"
              onClick={reset}
            >
              <RotateCcw className="h-4 w-4" />
              Try Again
            </Button>
            <Button
              variant="outline"
              className="flex-1 cursor-pointer flex items-center justify-center gap-2"
              onClick={() => (window.location.href = "/")}
            >
              <Home className="h-4 w-4" />
              Go to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("Boundary caught error:", error, info);
  }

  resetBoundary = () => {
    this.setState({ hasError: false, error: null });
  };

  override render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback
          reset={this.resetBoundary}
        />
      );
    }
    return this.props.children;
  }
}

