import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Placeholder } from '@/components/ui/Placeholder';
import { site, requirements } from '@/content/site.config';
import { copy } from '@/content/messaging';

describe('site config', () => {
  it('renders a visible placeholder for null values in development', () => {
    render(<Placeholder value={null} label="phone" />);
    expect(screen.getByText('[PHONE NOT SET]')).toBeInTheDocument();
  });
  it('renders the value when set', () => {
    render(<Placeholder value="555-0100" label="phone" />);
    expect(screen.getByText('555-0100')).toBeInTheDocument();
  });
  it('tracks every BLOCK requirement against a real config path', () => {
    for (const path of Object.keys(requirements)) {
      const v = path.split('.').reduce<unknown>((o, k) => (o as Record<string, unknown>)?.[k], site);
      expect(v, path).not.toBeUndefined();
    }
  });
  it('unapproved copy falls back in production and is flagged in development', () => {
    const c = { text: 'Bold claim', approved: false, fallback: 'Plain statement' };
    expect(copy(c, true)).toEqual({ text: 'Plain statement', needsApproval: false });
    expect(copy(c, false)).toEqual({ text: 'Bold claim', needsApproval: true });
  });
});
