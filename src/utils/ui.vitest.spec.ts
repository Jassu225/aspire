import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { describe, expect, it } from 'vitest';
import { toPx } from './ui';

installQuasarPlugin();

describe('ui utils', () => {
  it('toPx', () => {
    expect(toPx(10)).toBe('10px');
    expect(toPx(10.5)).toBe('10.5px');
    expect(toPx(10.55)).toBe('10.55px');
    expect(toPx(10.555)).toBe('10.555px');
    expect(toPx(10.5555)).toBe('10.5555px');
    expect(toPx(undefined)).toBeUndefined();
    expect(toPx()).toBeUndefined();
    expect(toPx(null as unknown as number)).toBeNull();
    expect(toPx('10px' as unknown as number)).toBe('10px');
  });
});
