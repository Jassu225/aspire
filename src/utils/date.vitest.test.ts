import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { describe, expect, it } from 'vitest';
import { formatAsDate } from './date';

installQuasarPlugin();

describe('date utils', () => {
  it('should format date', () => {
    expect(formatAsDate('2021-01-01')).toBe('01 Jan 2021');
    expect(formatAsDate('2021-03-01T00:00:00.000Z')).toBe('01 Mar 2021');
    expect(formatAsDate('2021-01-31T00:00:00.000+05:30')).toBe('31 Jan 2021');
  });
});
