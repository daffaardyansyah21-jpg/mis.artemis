'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface UseTimerOptions {
  initialSeconds: number;
  onExpire?: () => void;
  autoStart?: boolean;
}

export function useTimer({ initialSeconds, onExpire, autoStart = true }: UseTimerOptions) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [isExpired, setIsExpired] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  useEffect(() => {
    if (!isRunning || secondsLeft <= 0) return;
    intervalRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setIsRunning(false);
          setIsExpired(true);
          onExpireRef.current?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current!);
  }, [isRunning]);

  const pause  = useCallback(() => { clearInterval(intervalRef.current!); setIsRunning(false); }, []);
  const resume = useCallback(() => { if (!isExpired) setIsRunning(true); }, [isExpired]);
  const reset  = useCallback((seconds?: number) => {
    clearInterval(intervalRef.current!);
    setSecondsLeft(seconds ?? initialSeconds);
    setIsExpired(false);
    setIsRunning(true);
  }, [initialSeconds]);

  const pct = Math.round((secondsLeft / initialSeconds) * 100);
  const isWarning  = secondsLeft <= 300 && secondsLeft > 60;    // ≤ 5 menit
  const isCritical = secondsLeft <= 60;                          // ≤ 1 menit

  return { secondsLeft, isRunning, isExpired, pct, isWarning, isCritical, pause, resume, reset };
}
