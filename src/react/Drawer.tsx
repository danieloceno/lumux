'use client';

import type { ReactNode } from 'react';
import { Sheet } from './Sheet.tsx';

export type DrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Names the drawer and its `<nav>`: "Menu", "Navigation". */
  title: ReactNode;
  /** The nav landmark's accessible name when `title` is not a string. */
  label?: string;
  closeLabel?: string;
  children: ReactNode;
};

// The app's navigation below `lg`, where AppShell drops the sidebar: a modal
// sheet from the left wrapping a <nav>. Always modal, never side="right".
export function Drawer({ open, onOpenChange, title, label, closeLabel, children }: DrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange} title={title} side="left" closeLabel={closeLabel}>
      <nav aria-label={label ?? (typeof title === 'string' ? title : undefined)} className="-m-4 flex flex-col p-2">
        {children}
      </nav>
    </Sheet>
  );
}
