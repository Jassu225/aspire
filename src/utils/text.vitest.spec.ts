import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { describe, expect, it } from 'vitest';
import { capitalizeSentence } from './text';

installQuasarPlugin();

describe('text utils', () => {
  it('capitalizeSentence', () => {
    expect(capitalizeSentence('hello world')).toBe('Hello world');
    expect(capitalizeSentence('HELLO WORLD')).toBe('Hello world');
    expect(capitalizeSentence('Hello World')).toBe('Hello world');
    expect(capitalizeSentence('hello world')).toBe('Hello world');
    expect(capitalizeSentence('')).toBe('');
    expect(capitalizeSentence('123')).toBe('123');
    expect(capitalizeSentence('123 hello world')).toBe('123 hello world');
    expect(capitalizeSentence('123 hello world')).toBe('123 hello world');
  });
});
