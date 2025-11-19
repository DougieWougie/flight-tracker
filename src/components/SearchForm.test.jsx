import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchForm from './SearchForm';

describe('SearchForm', () => {
  it('should render flight number and date inputs', () => {
    const mockOnSearch = vi.fn();
    render(<SearchForm onSearch={mockOnSearch} isLoading={false} />);

    expect(screen.getByLabelText(/flight number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search flight/i })).toBeInTheDocument();
  });

  it('should set default date to today', () => {
    const mockOnSearch = vi.fn();
    render(<SearchForm onSearch={mockOnSearch} isLoading={false} />);

    const dateInput = screen.getByLabelText(/date/i);
    const today = new Date().toISOString().split('T')[0];

    expect(dateInput.value).toBe(today);
  });

  it('should call onSearch with flight number and date when submitted', async () => {
    const user = userEvent.setup();
    const mockOnSearch = vi.fn();
    render(<SearchForm onSearch={mockOnSearch} isLoading={false} />);

    const flightNumberInput = screen.getByLabelText(/flight number/i);
    const dateInput = screen.getByLabelText(/date/i);
    const submitButton = screen.getByRole('button', { name: /search flight/i });

    await user.clear(flightNumberInput);
    await user.type(flightNumberInput, 'AA1234');
    await user.clear(dateInput);
    await user.type(dateInput, '2024-12-25');
    await user.click(submitButton);

    expect(mockOnSearch).toHaveBeenCalledWith('AA1234', '2024-12-25');
  });

  it('should trim whitespace from flight number', async () => {
    const user = userEvent.setup();
    const mockOnSearch = vi.fn();
    render(<SearchForm onSearch={mockOnSearch} isLoading={false} />);

    const flightNumberInput = screen.getByLabelText(/flight number/i);
    const submitButton = screen.getByRole('button', { name: /search flight/i });

    await user.clear(flightNumberInput);
    await user.type(flightNumberInput, '  UA567  ');
    await user.click(submitButton);

    expect(mockOnSearch).toHaveBeenCalledWith('UA567', expect.any(String));
  });

  it('should disable inputs when loading', () => {
    const mockOnSearch = vi.fn();
    render(<SearchForm onSearch={mockOnSearch} isLoading={true} />);

    expect(screen.getByLabelText(/flight number/i)).toBeDisabled();
    expect(screen.getByLabelText(/date/i)).toBeDisabled();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should show "Searching..." text when loading', () => {
    const mockOnSearch = vi.fn();
    render(<SearchForm onSearch={mockOnSearch} isLoading={true} />);

    expect(screen.getByRole('button', { name: /searching/i })).toBeInTheDocument();
  });

  it('should not submit with empty flight number', async () => {
    const user = userEvent.setup();
    const mockOnSearch = vi.fn();
    render(<SearchForm onSearch={mockOnSearch} isLoading={false} />);

    const flightNumberInput = screen.getByLabelText(/flight number/i);
    const submitButton = screen.getByRole('button', { name: /search flight/i });

    await user.clear(flightNumberInput);
    await user.click(submitButton);

    // HTML5 validation should prevent submission
    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  it('should update flight number input value', async () => {
    const user = userEvent.setup();
    const mockOnSearch = vi.fn();
    render(<SearchForm onSearch={mockOnSearch} isLoading={false} />);

    const flightNumberInput = screen.getByLabelText(/flight number/i);

    await user.clear(flightNumberInput);
    await user.type(flightNumberInput, 'DL890');

    expect(flightNumberInput.value).toBe('DL890');
  });

  it('should update date input value', async () => {
    const user = userEvent.setup();
    const mockOnSearch = vi.fn();
    render(<SearchForm onSearch={mockOnSearch} isLoading={false} />);

    const dateInput = screen.getByLabelText(/date/i);

    await user.clear(dateInput);
    await user.type(dateInput, '2024-06-15');

    expect(dateInput.value).toBe('2024-06-15');
  });
});
