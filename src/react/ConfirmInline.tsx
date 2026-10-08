'use client';

import { useEffect, useRef, type KeyboardEvent, type ReactNode } from 'react';
import { Button } from './Button.tsx';
import { cx } from './cx.ts';

export type ConfirmInlineProps = {
  /** Names the group: "Delete this entry?" */
  question: ReactNode;
  /** The destructive verb: "Delete", "Discard". */
  confirmLabel: string;
  keepLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  className?: string;
};

// Replaces window.confirm for a destructive row action: it stays in the page,
// lands focus on Keep so a stray Enter keeps the row, and Escape backs out.
export function ConfirmInline({ question, confirmLabel, keepLabel = 'Keep', onConfirm, onCancel, className }: ConfirmInlineProps) {
  // Focus Keep on mount: this replaces a control the user just pressed, so
  // focus would otherwise fall to <body>. Not `autoFocus`: that is for page
  // load, and jsx-a11y bans it for the same reason.
  const keep = useRef<HTMLButtonElement>(null);
  useEffect(() => keep.current?.focus(), []);
  // Escape backs out from either button; the group itself is not interactive.
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onCancel();
  };
  return (
    <span
      role="group"
      aria-label={typeof question === 'string' ? question : confirmLabel}
      className={cx('inline-flex flex-wrap items-center gap-2', className)}
    >
      <span className="text-body-sm text-foreground">{question}</span>
      <Button variant="danger" onClick={onConfirm} onKeyDown={onKeyDown}>
        {confirmLabel}
      </Button>
      <Button ref={keep} variant="ghost" onClick={onCancel} onKeyDown={onKeyDown}>
        {keepLabel}
      </Button>
    </span>
  );
}
