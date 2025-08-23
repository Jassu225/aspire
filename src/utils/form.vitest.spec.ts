import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { describe, expect, it } from 'vitest';
import { MAX_LENGTH_TEMPLATE_KEY, maxLengthRule, nameRule, requiredRule } from './form';

installQuasarPlugin();

describe('form utils', () => {
  it('required rule - default text"', () => {
    expect(requiredRule()('')).toBe('Required');
    expect(requiredRule()(null)).toBe('Required');
    expect(requiredRule()(undefined)).toBe('Required');
    expect(requiredRule()('jaswanth sai sattenapalli')).toBe(true);
  });

  it('required rule - custom text', () => {
    expect(requiredRule('Needed')('')).toBe('Needed');
    expect(requiredRule('Needed')(null)).toBe('Needed');
    expect(requiredRule('Needed')(undefined)).toBe('Needed');
    expect(requiredRule('Needed')('jaswanth sai sattenapalli')).toBe(true);
  });

  it('max length rule - default text', () => {
    expect(maxLengthRule(10)('123456789011')).toBe("Shouldn't exceed 10 characters.");
    expect(maxLengthRule(8)('12345678901')).toBe("Shouldn't exceed 8 characters.");
    expect(maxLengthRule(8)('12345678')).toBe(true);
  });

  it('max length rule - custom text', () => {
    expect(maxLengthRule(9, 'Too long')('1234567890134')).toBe('Too long');
    expect(
      maxLengthRule(
        16,
        "Shouldn't exceed more than required characters.",
      )('jaswanth sai sattenapalli'),
    ).toBe("Shouldn't exceed more than required characters.");
    expect(maxLengthRule(9, 'Too long')('123456789')).toBe(true);
  });

  it('max length rule - default text with MAX_LENGTH_TEMPLATE_KEY', () => {
    expect(
      maxLengthRule(10, `Too long. Max length is ${MAX_LENGTH_TEMPLATE_KEY}`)('1234567890134'),
    ).toBe('Too long. Max length is 10');
    expect(
      maxLengthRule(
        10,
        `Too long. Max length is ${MAX_LENGTH_TEMPLATE_KEY}. So don't go over ${MAX_LENGTH_TEMPLATE_KEY} characters`,
      )('1234567890134'),
    ).toBe("Too long. Max length is 10. So don't go over 10 characters");
    expect(
      maxLengthRule(10, `Too long. Max length is ${MAX_LENGTH_TEMPLATE_KEY}`)('1234567890'),
    ).toBe(true);
  });

  it('name rule - default text', () => {
    expect(nameRule()('jaswanth sai sattenapalli')).toBe(true);
    expect(nameRule()('jaswanth 1')).toBe('Only letters and spaces are allowed');
  });

  it('name rule - custom text', () => {
    expect(nameRule('Only alphabets with spaces are allowed')('jaswanth 2')).toBe(
      'Only alphabets with spaces are allowed',
    );
    expect(nameRule('Only alphabets with spaces are allowed')('jaswanth ')).toBe(true);
  });
});
