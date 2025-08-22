import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { describe, expect, it } from 'vitest';
import { getAssetUrl } from './url';

installQuasarPlugin();

describe('url utils', () => {
  it('getAssetUrl', () => {
    expect(getAssetUrl('https://www.google.com/images/logo.png')).toBe(
      'https://www.google.com/images/logo.png',
    );
    expect(getAssetUrl('https://www.google.com/images/logo.png?q=123')).toBe(
      'https://www.google.com/images/logo.png?q=123',
    );
    expect(getAssetUrl('https://www.google.com/images/logo.png?q=123&p=456')).toBe(
      'https://www.google.com/images/logo.png?q=123&p=456',
    );
    expect(getAssetUrl('/images/logo.png')).toBe('http://localhost:3001/images/logo.png');
    expect(getAssetUrl('/images/logo.png?q=123')).toBe(
      'http://localhost:3001/images/logo.png?q=123',
    );
    expect(getAssetUrl('/images/logo.png?q=123&p=456')).toBe(
      'http://localhost:3001/images/logo.png?q=123&p=456',
    );
  });
});
