"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  ListTodo,
  TrendingUp,
  Flame,
  FolderOpen,
  ArrowRight,
  PartyPopper,
} from "lucide-react";
import { useApp } from "@/store/AppContext";
import { formatRelativeDate, getPriorityColor } from "@/lib/nlp";
import QuotesCarousel from "./QuotesCarousel";
import PomodoroWidget from "./PomodoroWidget";

export default function DashboardView() {
  const { state, dispatch, openTaskModal } = useApp();

  const stats = useMemo(() => {
    const now = new Date();
    const todayKey = now.toISOString().split("T")[0];
    const total = state.tasks.length;
    const completed = state.tasks.filter((t) => t.completed).length;
    const completedToday = state.tasks.filter((t) =>
      t.completedAt?.startsWith(todayKey),
    ).length;
    const pending = state.tasks.filter((t) => !t.completed).length;
    const overdue = state.tasks.filter((t) => {
      if (t.completed || !t.dueDate) return false;
      return new Date(t.dueDate) < new Date(todayKey);
    }).length;
    const highPriority = state.tasks.filter(
      (t) => !t.completed && t.priority <= 2,
    ).length;

    // Streak
    let streak = 0;
    for (let i = 0; i < 365; i++) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split("T")[0];
      const count = state.tasks.filter((t) =>
        t.completedAt?.startsWith(key),
      ).length;
      if (count > 0) streak++;
      else if (i > 0) break;
    }

    return {
      total,
      completed,
      completedToday,
      pending,
      overdue,
      highPriority,
      streak,
    };
  }, [state.tasks]);

  const upcomingTasks = useMemo(() => {
    const now = new Date();
    return state.tasks
      .filter((t) => !t.completed && t.dueDate)
      .sort(
        (a, b) =>
          new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime(),
      )
      .slice(0, 5);
  }, [state.tasks]);

  const recentCompleted = useMemo(() => {
    return state.tasks
      .filter((t) => t.completed && t.completedAt)
      .sort(
        (a, b) =>
          new Date(b.completedAt!).getTime() -
          new Date(a.completedAt!).getTime(),
      )
      .slice(0, 5);
  }, [state.tasks]);

  const folderStats = useMemo(() => {
    return state.folders.map((f) => ({
      ...f,
      total: state.tasks.filter((t) => t.folderId === f.id).length,
      pending: state.tasks.filter((t) => t.folderId === f.id && !t.completed)
        .length,
    }));
  }, [state.tasks, state.folders]);

  const completionRate =
    stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  const statCards = [
    {
      label: "Total Tasks",
      value: stats.total,
      icon: ListTodo,
      color: "var(--color-accent)",
    },
    {
      label: "Completed Today",
      value: stats.completedToday,
      icon: CheckCircle2,
      color: "var(--color-success)",
    },
    {
      label: "Overdue",
      value: stats.overdue,
      icon: AlertTriangle,
      color: "var(--color-danger)",
    },
    {
      label: "Streak",
      value: `${stats.streak}d`,
      icon: Flame,
      color: "var(--color-warning)",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };
  const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6 max-w-5xl mx-auto"
    >
      {/* Greeting + Quotes */}
      <motion.div variants={item}>
        <h1
          className="text-2xl font-bold mb-1"
          style={{ color: "var(--color-text-primary)" }}
        >
          {getGreeting()}
        </h1>
        <p
          className="text-sm mb-4"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          You have{" "}
          <strong style={{ color: "var(--color-text-primary)" }}>
            {stats.pending}
          </strong>{" "}
          task{stats.pending !== 1 ? "s" : ""} remaining today
        </p>
        <QuotesCarousel />
      </motion.div>

      {/* Stat cards */}
      <motion.div
        variants={item}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3"
      >
        {statCards.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl p-4 flex items-center gap-3"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: `${s.color}15` }}
            >
              <s.icon size={18} style={{ color: s.color }} />
            </div>
            <div>
              <div
                className="text-xl font-bold"
                style={{ color: "var(--color-text-primary)" }}
              >
                {s.value}
              </div>
              <div
                className="text-[11px]"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                {s.label}
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Progress bar */}
      <motion.div
        variants={item}
        className="rounded-2xl p-4"
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <span
            className="text-sm font-medium"
            style={{ color: "var(--color-text-primary)" }}
          >
            Overall Progress
          </span>
          <span
            className="text-sm font-bold"
            style={{ color: "var(--color-accent)" }}
          >
            {completionRate}%
          </span>
        </div>
        <div
          className="w-full h-2.5 rounded-full overflow-hidden"
          style={{ background: "var(--color-border)" }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6)" }}
            initial={{ width: 0 }}
            animate={{ width: `${completionRate}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        <div
          className="flex justify-between mt-1.5 text-[11px]"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          <span>{stats.completed} completed</span>
          <span>{stats.pending} remaining</span>
        </div>
      </motion.div>

      {/* Two column layout: Upcoming + Pomodoro */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Upcoming tasks */}
        <motion.div
          variants={item}
          className="lg:col-span-2 rounded-2xl p-4"
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2
              className="text-sm font-semibold"
              style={{ color: "var(--color-text-primary)" }}
            >
              <Clock size={14} className="inline mr-1.5 -mt-0.5" />
              Upcoming Tasks
            </h2>
            <button
              onClick={() =>
                dispatch({ type: "SET_VIEW_MODE", payload: "list" })
              }
              className="text-xs flex items-center gap-1 hover:opacity-70 transition-opacity"
              style={{ color: "var(--color-accent)" }}
            >
              View all <ArrowRight size={12} />
            </button>
          </div>
          {upcomingTasks.length === 0 ?
            <p
              className="text-sm py-6 text-center"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              No upcoming tasks — great job!{" "}
              <PartyPopper size={14} className="inline-block ml-1" />
            </p>
          : <div className="space-y-2">
              {upcomingTasks.map((task) => (
                <button
                  key={task.id}
                  onClick={() => openTaskModal({ mode: "edit", task })}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors hover:opacity-80"
                  style={{ background: "var(--color-background)" }}
                >
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: getPriorityColor(task.priority) }}
                  />
                  <span
                    className="flex-1 text-sm truncate"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {task.title}
                  </span>
                  {task.dueDate && (
                    <span
                      className="text-[11px] shrink-0"
                      style={{ color: "var(--color-text-tertiary)" }}
                    >
                      {formatRelativeDate(task.dueDate)}
                    </span>
                  )}
                </button>
              ))}
            </div>
          }
        </motion.div>

        {/* Pomodoro */}
        <motion.div variants={item}>
          <PomodoroWidget />
        </motion.div>
      </div>

      {/* Two column: Recently completed + Folders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recently completed */}
        <motion.div
          variants={item}
          className="rounded-2xl p-4"
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
          }}
        >
          <h2
            className="text-sm font-semibold mb-3"
            style={{ color: "var(--color-text-primary)" }}
          >
            <CheckCircle2 size={14} className="inline mr-1.5 -mt-0.5" />
            Recently Completed
          </h2>
          {recentCompleted.length === 0 ?
            <p
              className="text-sm py-4 text-center"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              No completed tasks yet
            </p>
          : <div className="space-y-2">
              {recentCompleted.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl"
                  style={{ background: "var(--color-background)" }}
                >
                  <CheckCircle2
                    size={14}
                    style={{ color: "var(--color-success)" }}
                  />
                  <span
                    className="flex-1 text-sm truncate line-through opacity-60"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {task.title}
                  </span>
                  {task.completedAt && (
                    <span
                      className="text-[11px] shrink-0"
                      style={{ color: "var(--color-text-tertiary)" }}
                    >
                      {formatRelativeDate(task.completedAt.split("T")[0])}
                    </span>
                  )}
                </div>
              ))}
            </div>
          }
        </motion.div>

        {/* Folders overview */}
        <motion.div
          variants={item}
          className="rounded-2xl p-4"
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
          }}
        >
          <h2
            className="text-sm font-semibold mb-3"
            style={{ color: "var(--color-text-primary)" }}
          >
            <FolderOpen size={14} className="inline mr-1.5 -mt-0.5" />
            Folders
          </h2>
          <div className="space-y-2">
            {folderStats.map((folder) => (
              <button
                key={folder.id}
                onClick={() => {
                  dispatch({ type: "SET_ACTIVE_FOLDER", payload: folder.id });
                  dispatch({ type: "SET_VIEW_MODE", payload: "list" });
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors hover:opacity-80"
                style={{ background: "var(--color-background)" }}
              >
                <div
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ background: folder.color || "#6366f1" }}
                />
                <span
                  className="flex-1 text-sm"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {folder.name}
                </span>
                <span
                  className="text-[11px]"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  {folder.pending} pending
                </span>
                <div
                  className="w-12 h-1.5 rounded-full overflow-hidden"
                  style={{ background: "var(--color-border)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      background: folder.color || "#6366f1",
                      width:
                        folder.total > 0 ?
                          `${((folder.total - folder.pending) / folder.total) * 100}%`
                        : "0%",
                    }}
                  />
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Priority distribution */}
      <motion.div
        variants={item}
        className="rounded-2xl p-4"
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
        }}
      >
        <h2
          className="text-sm font-semibold mb-3"
          style={{ color: "var(--color-text-primary)" }}
        >
          <TrendingUp size={14} className="inline mr-1.5 -mt-0.5" />
          Priority Distribution
        </h2>
        <div className="grid grid-cols-4 gap-3">
          {([1, 2, 3, 4] as const).map((p) => {
            const count = state.tasks.filter(
              (t) => !t.completed && t.priority === p,
            ).length;
            const labels = ["Urgent", "High", "Medium", "Low"];
            return (
              <div key={p} className="text-center">
                <div
                  className="text-lg font-bold"
                  style={{ color: getPriorityColor(p) }}
                >
                  {count}
                </div>
                <div
                  className="text-[11px]"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  {labels[p - 1]}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}
