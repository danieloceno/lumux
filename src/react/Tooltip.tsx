'use client';

import * as T from '@radix-ui/react-tooltip';
import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from 'react';

/** Mount once at the root, beside IconProvider. */
export function TooltipProvider({ children }: { children: ReactNode }) {
  return (
    <T.Provider delayDuration={300} skipDelayDuration={500}>
      {children}
    </T.Provider>
  );
}

const LONG_PRESS_MS = 500;

export type TooltipProps = {
  /** Short, supplementary. The child keeps its own accessible name. */
  content: ReactNode;
  /** One element that can take focus: a Button, an IconButton, a link. */
  children: ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
};

// Opens on hover, on focus and on a long press. Radix ignores touch on
// purpose; the long-press timer below opens it for touch pointers, and the
// release closes it. Never the only carrier of information.
export function Tooltip({ content, children, side = 'top' }: TooltipProps) {
  // Always controlled: Radix drives hover and focus through onOpenChange, the
  // long press drives touch (switching controlled/uncontrolled warns in Radix).
  const [open, setOpen] = useState(false);
  const timer = useRef<number | null>(null);
  const pressed = useRef(false);

  const clear = () => {
    if (timer.current !== null) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
  };
  useEffect(() => clear, []);
  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType !== 'touch') return;
    clear();
    timer.current = window.setTimeout(() => {
      timer.current = null;
      pressed.current = true;
      setOpen(true);
    }, LONG_PRESS_MS);
  };
  const release = () => {
    clear();
    if (pressed.current) {
      pressed.current = false;
      setOpen(false);
    }
  };

  return (
    <T.Root open={open} onOpenChange={setOpen}>
      <T.Trigger asChild onPointerDown={onPointerDown} onPointerUp={release} onPointerCancel={release} onPointerLeave={release}>
        {children}
      </T.Trigger>
      <T.Portal>
        <T.Content
          side={side}
          sideOffset={6}
          collisionPadding={8}
          className="z-tooltip max-w-sheet rounded-control bg-foreground px-3 py-2 text-body-sm text-background shadow-overlay"
        >
          {content}
          <T.Arrow className="fill-foreground" width={12} height={6} />
        </T.Content>
      </T.Portal>
    </T.Root>
  );
}
