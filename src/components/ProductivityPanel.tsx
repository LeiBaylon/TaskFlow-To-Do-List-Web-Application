'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Flame, TrendingUp, CheckCircle2, Target } from 'lucide-react';
import { useApp } from '@/store/AppContext';

export default function ProductivityPanel() {
  const { state } = useApp();

  // Calculate streak
  const streak = useMemo(() => {
    const today = new Date();
    let count = 0;
    for (let i = 0; i < 365; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      const completed = state.tasks.filter(t => t.completedAt?.startsWith(key)).length;
      if (completed > 0) {
        count++;
      } else if (i > 0) {
        break;
      }
    }
    return count;
  }, [state.tasks]);

  // Heatmap data (last 12 weeks)
  const heatmapData = useMemo(() => {
    const weeks: { date: string; count: number; day: number }[][] = [];
    const today = new Date();

    for (let w = 11; w >= 0; w--) {
      const week: { date: string; count: number; day: number }[] = [];
      for (let d = 0; d < 7; d++) {
        const date = new Date(today);
        date.setDate(date.getDate() - (w * 7 + (6 - d)));
        const key = date.toISOString().split('T')[0];
        const count = state.tasks.filter(t => t.completedAt?.startsWith(key)).length;
        week.push({ date: key, count, day: date.getDay() });
      }
      weeks.push(week);
    }
    return weeks;
  }, [state.tasks]);

  // Today stats
  const todayStr = new Date().toISOString().split('T')[0];
  const todayCompleted = state.tasks.filter(t => t.completedAt?.startsWith(todayStr)).length;
  const totalIncomplete = state.tasks.filter(t => !t.completed).length;
  const totalCompleted = state.tasks.filter(t => t.completed).length;

  const getHeatColor = (count: number): string => {
    if (count === 0) return 'var(--color-border)';
    if (count === 1) return 'var(--color-accent-light)';
    if (count <= 3) return 'var(--color-accent)';
    return 'var(--color-accent-hover)';
  };

  return (
    <div className="space-y-4">
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="rounded-xl p-3 text-center"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
        >
          <div className="flex items-center justify-center gap-1 mb-1">
            <Flame size={14} style={{ color: 'var(--color-warning)' }} />
          </div>
          <p className="text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{streak}</p>
          <p className="text-[10px] font-medium" style={{ color: 'var(--color-text-tertiary)' }}>Day Streak</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="rounded-xl p-3 text-center"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
        >
          <div className="flex items-center justify-center gap-1 mb-1">
            <CheckCircle2 size={14} style={{ color: 'var(--color-success)' }} />
          </div>
          <p className="text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{todayCompleted}</p>
          <p className="text-[10px] font-medium" style={{ color: 'var(--color-text-tertiary)' }}>Done Today</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="rounded-xl p-3 text-center"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
        >
          <div className="flex items-center justify-center gap-1 mb-1">
            <Target size={14} style={{ color: 'var(--color-accent)' }} />
          </div>
          <p className="text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{totalIncomplete}</p>
          <p className="text-[10px] font-medium" style={{ color: 'var(--color-text-tertiary)' }}>Remaining</p>
        </motion.div>
      </div>

      {/* Heatmap */}
      <div className="rounded-xl p-4" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp size={14} style={{ color: 'var(--color-accent)' }} />
          <span className="text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>
            Activity (12 weeks)
          </span>
        </div>
        <div className="flex gap-1">
          {heatmapData.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {week.map((day, di) => (
                <motion.div
                  key={day.date}
                  className="heatmap-cell w-3 h-3 rounded-[3px]"
                  style={{ background: getHeatColor(day.count) }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: (wi * 7 + di) * 0.005 }}
                  title={`${day.date}: ${day.count} tasks`}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-2 justify-end">
          <span className="text-[9px]" style={{ color: 'var(--color-text-tertiary)' }}>Less</span>
          {[0, 1, 2, 4].map(n => (
            <div key={n} className="w-2.5 h-2.5 rounded-[2px]" style={{ background: getHeatColor(n) }} />
          ))}
          <span className="text-[9px]" style={{ color: 'var(--color-text-tertiary)' }}>More</span>
        </div>
      </div>
    </div>
  );
}
