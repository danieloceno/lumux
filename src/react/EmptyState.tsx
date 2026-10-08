'use client';

import type { ReactNode } from 'react';
import { cx } from './cx.ts';

export type EmptyStateProps = {
  icon?: ReactNode;
  /** ≤5 words. */
  title: string;
  /** One line, ≤90 characters: what would fill this and how, never "nothing here yet". */
  description?: ReactNode;
  /** At most one. */
  action?: ReactNode;
  tone?: 'empty' | 'error';
  className?: string;
};

// Empty and error share one shape: icon slot, heading, one line, one action.
// An error state is an alert; an empty one is a status.
export function EmptyState({ icon, title, description, action, tone = 'empty', className }: EmptyStateProps) {
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={cx('flex flex-col items-center gap-2 px-4 py-12 text-center', className)}
    >
      {icon && (
        <div aria-hidden="true" className={cx('mb-1 *:size-8', tone === 'error' ? 'text-danger' : 'text-foreground-subtle')}>
          {icon}
        </div>
      )}
      <p className="text-subheading text-foreground">{title}</p>
      {description && <p className="max-w-sheet text-body-sm text-foreground-muted">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
