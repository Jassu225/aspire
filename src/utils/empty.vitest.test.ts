import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { describe, expect, it } from 'vitest';
import { emptyList } from './empty';

installQuasarPlugin();

describe('empty utils', () => {
  it('should check if array is empty', () => {
    expect(emptyList).toEqual([]);
    expect(emptyList.length).toBe(0);
  });

  it('should check if array is readonly and should throw error on mutation', () => {
    const emptyArray = emptyList as unknown as unknown[];
    expect(() => emptyArray.push(1)).toThrow();
    expect(() => emptyArray.pop()).toThrow();
    expect(() => emptyArray.shift()).toThrow();
    expect(() => emptyArray.unshift(1)).toThrow();
    expect(() => emptyArray.splice(0, 1)).toThrow();
    // for array length <= 1, sort and reverse do not mutate the array
    expect(() => emptyArray.sort()).not.toThrow();
    expect(() => emptyArray.reverse()).not.toThrow();
  });
});
