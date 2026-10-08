'use client';

import * as D from '@radix-ui/react-dialog';
import { useEffect, type ReactNode } from 'react';
import { cx } from './cx.ts';
import { OverlayBody, OverlayFooter, OverlayHeader, PANEL, useFocusReturn, useMediaQuery } from './overlay.tsx';

export type SheetSide = 'right' | 'left';

// One sheet open at a time: opening one closes the others.
const closers = new Set<() => void>();

export type SheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: ReactNode;
  description?: ReactNode;
  side?: SheetSide;
  /**
   * Modal: focus trapped, page inert, scroll locked. `false` keeps the page
   * operable beside the sheet (e.g. a live console) and only applies from
   * `lg` up; below that a sheet is always modal.
   */
  modal?: boolean;
  footer?: ReactNode;
  closeLabel?: string;
  children: ReactNode;
};

export function Sheet({
  open,
  onOpenChange,
  title,
  description,
  side = 'right',
  modal = true,
  footer,
  closeLabel = 'Close',
  children,
}: SheetProps) {
  const onCloseAutoFocus = useFocusReturn(open);
  const wide = useMediaQuery('(min-width: 64rem)');
  const isModal = modal || !wide;

  useEffect(() => {
    if (!open) return;
    const close = () => onOpenChange(false);
    closers.forEach((other) => other());
    closers.add(close);
    return () => {
      closers.delete(close);
    };
    // Opening is the event; a new onOpenChange identity must not re-run it.
  }, [open]);

  const panel = (
    <D.Content
      onCloseAutoFocus={onCloseAutoFocus}
      // Non-modal Radix dialogs close on any outside click or focus; the page
      // beside a non-modal sheet has to stay usable without closing it.
      onInteractOutside={isModal ? undefined : (e) => e.preventDefault()}
      className={cx(
        PANEL,
        'fixed inset-y-0 z-modal h-full w-full sm:max-w-sheet',
        side === 'right' ? 'right-0 sm:border-l' : 'left-0 sm:border-r',
        'border-border',
      )}
    >
      <OverlayHeader
        title={title}
        description={description}
        closeLabel={closeLabel}
        onClose={() => onOpenChange(false)}
        Title={D.Title}
        Description={D.Description}
      />
      <OverlayBody>{children}</OverlayBody>
      {footer && <OverlayFooter>{footer}</OverlayFooter>}
    </D.Content>
  );

  return (
    <D.Root open={open} onOpenChange={onOpenChange} modal={isModal}>
      <D.Portal>
        {isModal ? <D.Overlay className="fixed inset-0 z-modal bg-overlay-scrim">{panel}</D.Overlay> : panel}
      </D.Portal>
    </D.Root>
  );
}

export const SheetTrigger = D.Trigger;
export const SheetClose = D.Close;
