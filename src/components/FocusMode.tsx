'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, X, Square, SkipForward, Volume2 } from 'lucide-react';
import { useApp } from '@/store/AppContext';

const WORK_DURATION = 25 * 60; // 25 minutes in seconds
const SHORT_BREAK = 5 * 60;
const LONG_BREAK = 15 * 60;

type TimerPhase = 'work' | 'short-break' | 'long-break';

export default function FocusMode() {
  const { state, dispatch, toggleTask } = useApp();
  const [workDuration, setWorkDuration] = useState(WORK_DURATION);
  const [shortBreakDuration, setShortBreakDuration] = useState(SHORT_BREAK);
  const [longBreakDuration, setLongBreakDuration] = useState(LONG_BREAK);
  const [timeLeft, setTimeLeft] = useState(WORK_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState<TimerPhase>('work');
  const [sessions, setSessions] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editMin, setEditMin] = useState('25');
  const [editSec, setEditSec] = useState('00');
  const [minimized, setMinimized] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const minRef = useRef<HTMLInputElement>(null);

  const getDuration = useCallback((p: TimerPhase) =>
    p === 'work' ? workDuration : p === 'short-break' ? shortBreakDuration : longBreakDuration,
  [workDuration, shortBreakDuration, longBreakDuration]);

  const focusTask = state.tasks.find(t => t.id === state.focusTaskId);

  const close = () => {
    if (isRunning) {
      setMinimized(true);
      return;
    }
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    dispatch({ type: 'SET_FOCUS_TASK', payload: null });
  };

  const forceClose = () => {
    setIsRunning(false);
    setMinimized(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    dispatch({ type: 'SET_FOCUS_TASK', payload: null });
  };

  const reset = () => {
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimeLeft(getDuration(phase));
  };

  const nextPhase = useCallback(() => {
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (phase === 'work') {
      const newSessions = sessions + 1;
      setSessions(newSessions);
      if (newSessions % 4 === 0) {
        setPhase('long-break');
        setTimeLeft(longBreakDuration);
      } else {
        setPhase('short-break');
        setTimeLeft(shortBreakDuration);
      }
    } else {
      setPhase('work');
      setTimeLeft(workDuration);
    }
  }, [phase, sessions, workDuration, shortBreakDuration, longBreakDuration]);

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
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, nextPhase, timeLeft]);

  // Reset when focus task changes
  useEffect(() => {
    if (state.focusTaskId) {
      setPhase('work');
      setTimeLeft(workDuration);
      setSessions(0);
      setIsRunning(false);
      setIsEditing(false);
      setMinimized(false);
    }
  }, [state.focusTaskId, workDuration]);

  if (!focusTask) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const currentDuration = getDuration(phase);
  const progress = 1 - (timeLeft / currentDuration);

  const phaseColors: Record<TimerPhase, string> = {
    'work': 'var(--color-accent)',
    'short-break': 'var(--color-success)',
    'long-break': 'var(--color-warning)',
  };

  const phaseLabels: Record<TimerPhase, string> = {
    'work': 'Focus Time',
    'short-break': 'Short Break',
    'long-break': 'Long Break',
  };

  // Minimized floating pill
  if (minimized) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 60, scale: 0.8 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-2.5 rounded-2xl shadow-2xl cursor-pointer select-none"
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
        }}
        onClick={() => setMinimized(false)}
      >
        <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: phaseColors[phase] }} />
        <span className="text-sm font-bold tabular-nums" style={{ color: 'var(--color-text-primary)' }}>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </span>
        <span className="text-xs max-w-[120px] truncate" style={{ color: 'var(--color-text-tertiary)' }}>
          {focusTask.title}
        </span>
        <button
          onClick={e => { e.stopPropagation(); forceClose(); }}
          className="p-1 rounded-lg transition-colors hover:opacity-70"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          <X size={14} />
        </button>
      </motion.div>
    );
  }

  const startEditing = () => {
    if (isRunning) return;
    setEditMin(String(minutes));
    setEditSec(String(seconds).padStart(2, '0'));
    setIsEditing(true);
    setTimeout(() => minRef.current?.select(), 0);
  };

  const commitEdit = () => {
    const m = Math.max(0, Math.min(99, parseInt(editMin) || 0));
    const s = Math.max(0, Math.min(59, parseInt(editSec) || 0));
    const total = m * 60 + s;
    if (total > 0) {
      setTimeLeft(total);
      // Update the duration for the current phase so reset/progress work correctly
      if (phase === 'work') setWorkDuration(total);
      else if (phase === 'short-break') setShortBreakDuration(total);
      else setLongBreakDuration(total);
    }
    setIsEditing(false);
  };

  const handleEditKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') commitEdit();
    if (e.key === 'Escape') setIsEditing(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 flex items-center justify-center"
        style={{ background: 'var(--color-background)' }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="text-center max-w-md w-full px-6"
        >
          {/* Close button */}
          <button
            onClick={close}
            className="absolute top-6 right-6 p-2 rounded-xl transition-colors"
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            <X size={20} />
          </button>

          {/* Phase label */}
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-8"
            style={{ background: `${phaseColors[phase]}15`, color: phaseColors[phase] }}
          >
            <div className="w-2 h-2 rounded-full pulse-ring" style={{ background: phaseColors[phase] }} />
            {phaseLabels[phase]}
          </motion.div>

          {/* Timer circle */}
          <div className="relative w-64 h-64 mx-auto mb-8">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="46" fill="none" strokeWidth="2"
                style={{ stroke: 'var(--color-border)' }} />
              <motion.circle
                cx="50" cy="50" r="46" fill="none" strokeWidth="3" strokeLinecap="round"
                style={{ stroke: phaseColors[phase] }}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: progress }}
                transition={{ duration: 0.5 }}
                strokeDasharray="289.03"
                strokeDashoffset={289.03 * (1 - progress)}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {isEditing ? (
                <div className="flex items-center gap-1">
                  <input
                    ref={minRef}
                    type="text"
                    inputMode="numeric"
                    value={editMin}
                    onChange={e => setEditMin(e.target.value.replace(/\D/g, '').slice(0, 2))}
                    onKeyDown={handleEditKeyDown}
                    onBlur={commitEdit}
                    className="w-16 text-5xl font-bold tabular-nums tracking-tight text-center bg-transparent outline-none border-b-2"
                    style={{ color: 'var(--color-text-primary)', borderColor: phaseColors[phase] }}
                  />
                  <span className="text-5xl font-bold" style={{ color: 'var(--color-text-primary)' }}>:</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={editSec}
                    onChange={e => setEditSec(e.target.value.replace(/\D/g, '').slice(0, 2))}
                    onKeyDown={handleEditKeyDown}
                    onBlur={commitEdit}
                    className="w-16 text-5xl font-bold tabular-nums tracking-tight text-center bg-transparent outline-none border-b-2"
                    style={{ color: 'var(--color-text-primary)', borderColor: phaseColors[phase] }}
                  />
                </div>
              ) : (
                <span
                  className="text-5xl font-bold tabular-nums tracking-tight cursor-pointer hover:opacity-70 transition-opacity"
                  style={{ color: 'var(--color-text-primary)' }}
                  onClick={startEditing}
                  title="Click to edit timer"
                >
                  {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </span>
              )}
              <span className="text-xs mt-1" style={{ color: 'var(--color-text-tertiary)' }}>
                Session {sessions + 1}
              </span>
            </div>
          </div>

          {/* Task title */}
          <h2 className="text-lg font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>
            {focusTask.title}
          </h2>
          <p className="text-sm mb-8" style={{ color: 'var(--color-text-tertiary)' }}>
            Stay focused. You&apos;re doing great.
          </p>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={reset}
              className="p-3 rounded-xl transition-colors"
              style={{ background: 'var(--color-surface)', color: 'var(--color-text-tertiary)' }}
            >
              <RotateCcw size={18} />
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsRunning(!isRunning)}
              className="p-5 rounded-2xl text-white shadow-lg"
              style={{ background: phaseColors[phase] }}
            >
              {isRunning ? <Pause size={24} /> : <Play size={24} className="ml-0.5" />}
            </motion.button>
            <button
              onClick={nextPhase}
              className="p-3 rounded-xl transition-colors"
              style={{ background: 'var(--color-surface)', color: 'var(--color-text-tertiary)' }}
            >
              <SkipForward size={18} />
            </button>
          </div>

          {/* Complete task button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => { toggleTask(focusTask.id); forceClose(); }}
            className="mt-8 px-6 py-2.5 rounded-xl text-sm font-medium transition-colors"
            style={{
              background: 'var(--color-surface)',
              color: 'var(--color-text-secondary)',
              border: '1px solid var(--color-border)',
            }}
          >
            Mark as Complete & Exit
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
