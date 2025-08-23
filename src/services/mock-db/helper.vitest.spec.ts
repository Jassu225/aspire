import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { describe, it } from 'vitest';
import { getIndexNameFromKeys } from './helper';

installQuasarPlugin();

describe('mock-db/helper', () => {
  it('should be able to get the index name from keys', ({ expect }) => {
    expect(getIndexNameFromKeys(['cardUid', 'createdAt'])).toBe('cardUid-createdAt');
    expect(getIndexNameFromKeys(['createdAt', 'cardUid'])).toBe('cardUid-createdAt');
    expect(getIndexNameFromKeys(['cardUid', 'createdAt', 'type'])).toBe('cardUid-createdAt-type');
  });
});
