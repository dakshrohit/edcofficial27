"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

interface WebGLErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface WebGLErrorBoundaryState {
  hasError: boolean;
}

export class WebGLErrorBoundary extends React.Component<
  WebGLErrorBoundaryProps,
  WebGLErrorBoundaryState
> {
  public state: WebGLErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): WebGLErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.props.onError?.(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <WebGLFallback />;
    }
    return this.props.children;
  }
}

interface WebGLFallbackProps {
  className?: string;
  message?: string;
  children?: React.ReactNode;
}

export function WebGLFallback({
  className,
  message = "Interactive WebGL content is unavailable on this device/browser.",
  children,
}: WebGLFallbackProps) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-950 via-slate-900 to-zinc-900 px-4 text-center text-sm text-white/75",
        className,
      )}
      role="status"
      aria-live="polite"
    >
      {children}
      <p className="absolute bottom-3 left-1/2 z-10 m-0 -translate-x-1/2 bg-black/70 px-2 py-1 text-xs">
        {message}
      </p>
    </div>
  );
}
