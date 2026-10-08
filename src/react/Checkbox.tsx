'use client';

import { useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from './cx.ts';
import { describedBy, FieldMessages } from './FieldMessages.tsx';

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
};

// A native checkbox inside its label. The label row is the target (min 44px
// tall), so the drawn box can stay 20px.
export function Checkbox({ label, hint, error, id, className, ...rest }: CheckboxProps) {
  const generated = useId();
  const inputId = id ?? generated;
  return (
    <div className={cx('flex flex-col gap-1', className)}>
      <label
        htmlFor={inputId}
        className="inline-flex min-h-target cursor-pointer items-center gap-3 text-body text-foreground has-disabled:cursor-not-allowed has-disabled:text-foreground-subtle"
      >
        <input
          {...rest}
          id={inputId}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(inputId, { hint, error }, rest['aria-describedby'])}
          className="size-5 shrink-0 cursor-pointer accent-accent disabled:cursor-not-allowed"
        />
        {label}
      </label>
      <FieldMessages id={inputId} hint={hint} error={error} />
    </div>
  );
}
