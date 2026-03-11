import * as chrono from 'chrono-node';
import type { Priority } from './types';

interface ParsedTask {
  title: string;
  priority: Priority;
  dueDate: string | null;
  dueTime: string | null;
  tags: string[];
}

export function parseTaskInput(input: string): ParsedTask {
  let text = input.trim();
  let priority: Priority = 4;
  const tags: string[] = [];

  // Extract priority: !high, !medium, !low, !urgent or !1 !2 !3 !4
  const priorityMap: Record<string, Priority> = {
    '!urgent': 1, '!high': 1, '!1': 1,
    '!medium': 2, '!med': 2, '!2': 2,
    '!low': 3, '!3': 3,
    '!none': 4, '!4': 4,
  };

  for (const [token, prio] of Object.entries(priorityMap)) {
    const regex = new RegExp(`\\s*${token.replace('!', '\\!')}\\s*`, 'gi');
    if (regex.test(text)) {
      priority = prio;
      text = text.replace(regex, ' ');
      break;
    }
  }

  // Extract tags: #tag
  const tagRegex = /#(\w+)/g;
  let tagMatch;
  while ((tagMatch = tagRegex.exec(text)) !== null) {
    tags.push(tagMatch[1]);
  }
  text = text.replace(/#\w+/g, '').trim();

  // Parse dates with chrono
  let dueDate: string | null = null;
  let dueTime: string | null = null;

  const parsed = chrono.parse(text, new Date(), { forwardDate: true });
  if (parsed.length > 0) {
    const result = parsed[0];
    const date = result.start.date();
    dueDate = date.toISOString().split('T')[0];

    if (result.start.isCertain('hour')) {
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      dueTime = `${hours}:${minutes}`;
    }

    // Remove the matched date text from the title
    text = text.slice(0, result.index) + text.slice(result.index + result.text.length);
  }

  const title = text.replace(/\s+/g, ' ').trim();

  return { title, priority, dueDate, dueTime, tags };
}

export function formatRelativeDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diff = (target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

  if (diff === 0) return 'Today';
  if (diff === 1) return 'Tomorrow';
  if (diff === -1) return 'Yesterday';
  if (diff > 1 && diff <= 7) return `In ${Math.round(diff)} days`;
  if (diff < -1) return `${Math.round(Math.abs(diff))} days ago`;

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function getPriorityColor(priority: Priority): string {
  const colors: Record<Priority, string> = {
    1: 'var(--color-priority-1)',
    2: 'var(--color-priority-2)',
    3: 'var(--color-priority-3)',
    4: 'var(--color-priority-4)',
  };
  return colors[priority];
}

export function getPriorityLabel(priority: Priority): string {
  const labels: Record<Priority, string> = {
    1: 'Urgent',
    2: 'High',
    3: 'Medium',
    4: 'Low',
  };
  return labels[priority];
}
