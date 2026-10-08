'use client';

import type { ReactNode } from 'react';
import { cx } from './cx.ts';

export type BadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info';

// The dot carries the colour, the word carries the meaning (1.4.1). Each text
// pair below is a legal pair in vocabulary.ts; `filled` uses the -soft tint.
const TONE: Record<BadgeTone, { dot: string; text: string; fill: string }> = {
  neutral: { dot: 'bg-foreground-muted', text: 'text-foreground-muted', fill: 'bg-surface-raised text-foreground-muted' },
  accent: { dot: 'bg-accent', text: 'text-accent', fill: 'bg-accent-soft text-accent-on-soft' },
  success: { dot: 'bg-success', text: 'text-success', fill: 'bg-success-soft text-success-on-soft' },
  warning: { dot: 'bg-warning', text: 'text-warning', fill: 'bg-warning-soft text-warning-on-soft' },
  danger: { dot: 'bg-danger', text: 'text-danger', fill: 'bg-danger-soft text-danger-on-soft' },
  info: { dot: 'bg-info', text: 'text-info', fill: 'bg-info-soft text-info-on-soft' },
};

export type BadgeProps = {
  tone?: BadgeTone;
  /** A tinted ground, for a badge on something already dense. Square corners: a pill says "press me". */
  filled?: boolean;
  className?: string;
  /** The word. Never empty: a dot alone is not a badge. */
  children: ReactNode;
};

export function Badge({ tone = 'neutral', filled = false, className, children }: BadgeProps) {
  const t = TONE[tone];
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1.5 text-label font-medium whitespace-nowrap',
        filled ? cx('rounded-control px-2 py-0.5', t.fill) : t.text,
        className,
      )}
    >
      <span aria-hidden="true" className={cx('size-1.5 shrink-0 rounded-pill', filled ? 'bg-current' : t.dot)} />
      {children}
    </span>
  );
}
