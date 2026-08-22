import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RiskBadge } from '@/components/ui/RiskBadge';

describe('RiskBadge Component', () => {
  it('renders low risk correctly', () => {
    render(<RiskBadge level="low" />);
    const badge = screen.getByRole('status');
    expect(badge).toHaveTextContent('Low Risk');
    expect(badge).toHaveClass('bg-emerald-900');
  });

  it('renders medium risk correctly', () => {
    render(<RiskBadge level="medium" />);
    const badge = screen.getByRole('status');
    expect(badge).toHaveTextContent('Medium Risk');
    expect(badge).toHaveClass('bg-amber-900');
  });

  it('renders high risk correctly', () => {
    render(<RiskBadge level="high" />);
    const badge = screen.getByRole('status');
    expect(badge).toHaveTextContent('High Risk');
    expect(badge).toHaveClass('bg-red-900');
  });

  it('renders uncertain correctly', () => {
    render(<RiskBadge level="uncertain" />);
    const badge = screen.getByRole('status');
    expect(badge).toHaveTextContent('Unable to Determine');
    expect(badge).toHaveClass('bg-purple-900');
  });

  it('applies custom className', () => {
    render(<RiskBadge level="low" className="custom-class" />);
    const badge = screen.getByRole('status');
    expect(badge).toHaveClass('custom-class');
  });

  it('renders different sizes', () => {
    const { rerender } = render(<RiskBadge level="low" size="sm" />);
    let badge = screen.getByRole('status');
    expect(badge).toHaveClass('text-xs');

    rerender(<RiskBadge level="low" size="lg" />);
    badge = screen.getByRole('status');
    expect(badge).toHaveClass('text-base');
  });

  it('has accessible label', () => {
    render(<RiskBadge level="high" />);
    const badge = screen.getByRole('status');
    expect(badge).toHaveAttribute('aria-label', 'High risk level');
  });
});
