import { describe, expect, it } from 'vitest';
import { yearsInBusiness } from '../lib/business.js';

describe('years in business', () => {
  it('counts from the December 12, 2017 opening', () => {
    expect(yearsInBusiness(new Date(2026, 10, 4))).toBe(8);
    expect(yearsInBusiness(new Date(2026, 11, 11))).toBe(8);
    expect(yearsInBusiness(new Date(2026, 11, 12))).toBe(9);
  });
});
