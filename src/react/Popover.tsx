'use client';

import * as P from '@radix-ui/react-popover';
import { X } from 'lucide-react';
import { useId, type ReactNode } from 'react';
import { IconButton } from './Button.tsx';

export type PopoverProps = {
  /** The opener: a Button or IconButton. It gets aria-haspopup and aria-expanded. */
  trigger: ReactNode;
  /** Visible heading; also the popover's accessible name. */
  title: ReactNode;
  children: ReactNode;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'right' | 'bottom' | 'left';
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  closeLabel?: string;
};

// Anchored, non-modal content that is more than a menu: a filter form, a date
// picker, a legend. Focus moves in on open and back to the trigger on close;
// Escape and outside click dismiss. For a confirmation, use a Dialog.
export function Popover({ trigger, title, children, align = 'start', side = 'bottom', open, onOpenChange, closeLabel = 'Close' }: PopoverProps) {
  const titleId = useId();
  return (
    <P.Root open={open} onOpenChange={onOpenChange}>
      <P.Trigger asChild>{trigger}</P.Trigger>
      <P.Portal>
        <P.Content
          aria-labelledby={titleId}
          align={align}
          side={side}
          sideOffset={4}
          collisionPadding={8}
          className="z-overlay flex max-w-sheet flex-col gap-3 rounded-card border border-border-strong bg-surface p-4 text-foreground shadow-overlay outline-none"
        >
          <div className="flex items-start gap-2">
            <h2 id={titleId} className="flex-1 text-subheading">
              {title}
            </h2>
            <P.Close asChild>
              <IconButton icon={<X aria-hidden="true" size={20} />} aria-label={closeLabel} className="-m-2" />
            </P.Close>
          </div>
          {children}
        </P.Content>
      </P.Portal>
    </P.Root>
  );
}
