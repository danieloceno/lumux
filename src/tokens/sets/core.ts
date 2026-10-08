// The default pair: day and night, authored together at AAA.
// Ink ramp: 50 #f6f8fa · 100 #eef1f4 · 200 #e1e6ea ·
// 300 #c4ccd3 · 500 #6b7a85 · 700 #2c4150 · 800 #1a2e3a · 900 #0a1d2a.
// The source brand blue #009fda is 3.0:1 on white and is never a token:
// deepened to 7:1 it lands on #005778.

import type { ColorSet } from '../vocabulary.ts';

export const core: ColorSet = {
  day: {
    background: '#f6f8fa', // ink-50
    surface: '#ffffff',
    'surface-raised': '#eef1f4', // ink-100: inputs, hover, sidebar. The text floor every candidate is fitted to.
    foreground: '#1a2e3a', // ink-800
    'foreground-muted': '#2c4150', // ink-700
    'foreground-subtle': '#43535f', // ink-600 deepened to 7:1 on ink-100
    border: '#e1e6ea', // ink-200, decorative only
    'border-strong': '#6b7a85', // ink-500
    accent: '#005778', // primary-darker
    'accent-strong': '#00435d',
    'accent-foreground': '#ffffff',
    'accent-soft': '#e8f6fc',
    'accent-on-soft': '#005778',
    success: '#0e5e08', // source green #14860b deepened
    'success-foreground': '#ffffff',
    'success-soft': '#eaf5e9',
    'success-on-soft': '#0e5e08',
    warning: '#813e00', // source orange #e66f00 deepened
    'warning-foreground': '#ffffff',
    'warning-soft': '#fdf1e6',
    'warning-on-soft': '#813e00',
    danger: '#98270e', // source red #c93312 deepened
    'danger-foreground': '#ffffff',
    'danger-soft': '#fceeea',
    'danger-on-soft': '#98270e',
    'danger-strong': '#7a1f0b',
    info: '#005778',
    'info-foreground': '#ffffff',
    'info-soft': '#e8f6fc',
    'info-on-soft': '#005778',
    'focus-ring': '#005778',
    'overlay-scrim': '#0a1d2a80',
    // Categorical, fixed order: blue, orange, violet, green, magenta.
    'chart-1': '#0079a8',
    'chart-2': '#a04e00',
    'chart-3': '#6b4de6',
    'chart-4': '#127c0a',
    'chart-5': '#b0306a',
  },
  night: {
    background: '#0a1d2a', // ink-900
    surface: '#112634',
    'surface-raised': '#18303f',
    foreground: '#eef1f4', // ink-100
    'foreground-muted': '#c4ccd3', // ink-300
    'foreground-subtle': '#afbbc5',
    border: '#22394a',
    'border-strong': '#6b7f8d',
    accent: '#00cde0', // cyan-bright
    'accent-strong': '#4fdcea',
    'accent-foreground': '#0a1d2a',
    'accent-soft': '#0f3446',
    'accent-on-soft': '#7bf6ff', // cyan-light
    success: '#5ed27a',
    'success-foreground': '#0a1d2a',
    'success-soft': '#123526',
    'success-on-soft': '#5ed27a',
    warning: '#f6a95a',
    'warning-foreground': '#0a1d2a',
    'warning-soft': '#3a2a16',
    'warning-on-soft': '#f6a95a',
    danger: '#ffa28d',
    'danger-foreground': '#0a1d2a',
    'danger-soft': '#3d201b',
    'danger-on-soft': '#ffa28d',
    'danger-strong': '#ffbcad',
    info: '#7bf6ff',
    'info-foreground': '#0a1d2a',
    'info-soft': '#0f3446',
    'info-on-soft': '#7bf6ff',
    'focus-ring': '#00cde0',
    'overlay-scrim': '#000000a3',
    'chart-1': '#00a0b0',
    'chart-2': '#cf7a2a',
    'chart-3': '#8878e0',
    'chart-4': '#38a456',
    'chart-5': '#cf6396',
  },
};
