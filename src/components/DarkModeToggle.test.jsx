import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DarkModeToggle from './DarkModeToggle';

describe('DarkModeToggle', () => {
  it('should render toggle button', () => {
    const mockOnToggle = vi.fn();
    render(<DarkModeToggle isDark={false} onToggle={mockOnToggle} />);

    expect(screen.getByRole('button', { name: /toggle dark mode/i })).toBeInTheDocument();
  });

  it('should show moon icon in light mode', () => {
    const mockOnToggle = vi.fn();
    render(<DarkModeToggle isDark={false} onToggle={mockOnToggle} />);

    expect(screen.getByText('🌙')).toBeInTheDocument();
  });

  it('should show sun icon in dark mode', () => {
    const mockOnToggle = vi.fn();
    render(<DarkModeToggle isDark={true} onToggle={mockOnToggle} />);

    expect(screen.getByText('☀️')).toBeInTheDocument();
  });

  it('should call onToggle when clicked', async () => {
    const user = userEvent.setup();
    const mockOnToggle = vi.fn();
    render(<DarkModeToggle isDark={false} onToggle={mockOnToggle} />);

    const button = screen.getByRole('button', { name: /toggle dark mode/i });
    await user.click(button);

    expect(mockOnToggle).toHaveBeenCalledTimes(1);
  });

  it('should have dark-mode-toggle class', () => {
    const mockOnToggle = vi.fn();
    render(<DarkModeToggle isDark={false} onToggle={mockOnToggle} />);

    const button = screen.getByRole('button', { name: /toggle dark mode/i });
    expect(button).toHaveClass('dark-mode-toggle');
  });

  it('should toggle between icons when isDark changes', () => {
    const mockOnToggle = vi.fn();
    const { rerender } = render(<DarkModeToggle isDark={false} onToggle={mockOnToggle} />);

    expect(screen.getByText('🌙')).toBeInTheDocument();

    rerender(<DarkModeToggle isDark={true} onToggle={mockOnToggle} />);

    expect(screen.getByText('☀️')).toBeInTheDocument();
    expect(screen.queryByText('🌙')).not.toBeInTheDocument();
  });

  it('should be keyboard accessible', async () => {
    const user = userEvent.setup();
    const mockOnToggle = vi.fn();
    render(<DarkModeToggle isDark={false} onToggle={mockOnToggle} />);

    const button = screen.getByRole('button', { name: /toggle dark mode/i });

    // Focus and activate with keyboard
    button.focus();
    await user.keyboard('{Enter}');

    expect(mockOnToggle).toHaveBeenCalledTimes(1);
  });
});
