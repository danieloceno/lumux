import { CircleAlert } from 'lucide-react';
import type { ReactNode } from 'react';

export const hintId = (id: string) => `${id}-hint`;
export const errorId = (id: string) => `${id}-error`;

/** aria-describedby for a control: the error while there is one, then the hint. */
export function describedBy(id: string, { hint, error }: { hint?: ReactNode; error?: ReactNode }, extra?: string) {
  return [error ? errorId(id) : null, hint ? hintId(id) : null, extra].filter(Boolean).join(' ') || undefined;
}

// Hint (≤90 chars, docs/copy.md) and error under a control. The error is an
// icon plus text, never colour alone, and role=alert announces it the moment
// it appears (3.3.1, 4.1.3).
export function FieldMessages({ id, hint, error }: { id: string; hint?: ReactNode; error?: ReactNode }) {
  return (
    <>
      {hint && (
        <p id={hintId(id)} className="text-caption text-foreground-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId(id)} role="alert" className="flex items-start gap-1 text-body-sm text-danger">
          {/* h-5 is body-sm's line height, so the icon centres on the first line. */}
          <span aria-hidden="true" className="flex h-5 shrink-0 items-center">
            <CircleAlert className="size-4" />
          </span>
          <span>{error}</span>
        </p>
      )}
    </>
  );
}

/** The required marker is a word in the label, not an asterisk alone. */
export function RequiredMark({ label = 'required' }: { label?: string }) {
  return <span className="font-normal text-foreground-muted"> ({label})</span>;
}
