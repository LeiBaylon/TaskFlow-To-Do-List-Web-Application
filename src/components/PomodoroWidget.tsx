'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';

const WORK_DURATION = 25 * 60;
const SHORT_BREAK = 5 * 60;
const LONG_BREAK = 15 * 60;

type TimerPhase = 'work' | 'short-break' | 'long-break';

const phaseColors: Record<TimerPhase, string> = {
  'work': 'var(--color-accent)',
  'short-break': 'var(--color-success)',
  'long-break': 'var(--color-warning)',
};

const phaseLabels: Record<TimerPhase, string> = {
  'work': 'Focus',
  'short-break': 'Short Break',
  'long-break': 'Long Break',
};

export default function PomodoroWidget() {
  const [timeLeft, setTimeLeft] = useState(WORK_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState<TimerPhase>('work');
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const getDuration = (p: TimerPhase) =>
    p === 'work' ? WORK_DURATION : p === 'short-break' ? SHORT_BREAK : LONG_BREAK;

  const nextPhase = useCallback(() => {
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (phase === 'work') {
      const newSessions = sessions + 1;
      setSessions(newSessions);
      if (newSessions % 4 === 0) {
        setPhase('long-break');
        setTimeLeft(LONG_BREAK);
      } else {
        setPhase('short-break');
        setTimeLeft(SHORT_BREAK);
      }
    } else {
      setPhase('work');
      setTimeLeft(WORK_DURATION);
    }
  }, [phase, sessions]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            nextPhase();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isRunning, nextPhase, timeLeft]);

  const toggle = () => setIsRunning(r => !r);

  const reset = () => {
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimeLeft(getDuration(phase));
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const duration = getDuration(phase);
  const progress = 1 - timeLeft / duration;
  const circumference = 2 * Math.PI * 40;

  return (
    <div className="rounded-2xl p-5" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full" style={{ background: phaseColors[phase] }} />
        <span className="text-xs font-medium" style={{ color: phaseColors[phase] }}>{phaseLabels[phase]}</span>
        {sessions > 0 && (
          <span className="text-xs ml-auto" style={{ color: 'var(--color-text-tertiary)' }}>
            {sessions} session{sessions !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      <div className="flex items-center justify-center mb-4">
        <div className="relative w-28 h-28">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" strokeWidth="3"
              style={{ stroke: 'var(--color-border)' }} />
            <motion.circle
              cx="50" cy="50" r="40" fill="none" strokeWidth="4" strokeLinecap="round"
              style={{ stroke: phaseColors[phase] }}
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress)}
              animate={{ strokeDashoffset: circumference * (1 - progress) }}
              transition={{ duration: 0.5 }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-mono font-semibold tabular-nums" style={{ color: 'var(--color-text-primary)' }}>
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2">
        <button
          onClick={reset}
          className="p-2 rounded-lg transition-colors hover:opacity-70"
          style={{ color: 'var(--color-text-tertiary)' }}
          title="Reset"
        >
          <RotateCcw size={16} />
        </button>
        <button
          onClick={toggle}
          className="px-5 py-2 rounded-xl text-white text-sm font-medium transition-all hover:opacity-90"
          style={{ background: phaseColors[phase] }}
        >
          {isRunning ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <button
          onClick={nextPhase}
          className="p-2 rounded-lg transition-colors hover:opacity-70"
          style={{ color: 'var(--color-text-tertiary)' }}
          title="Skip"
        >
          <SkipForward size={16} />
        </button>
      </div>
    </div>
  );
}
