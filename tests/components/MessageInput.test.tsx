import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MessageInput } from '@/components/analysis/MessageInput';

describe('MessageInput Component', () => {
  const defaultProps = {
    message: '',
    onMessageChange: vi.fn(),
    source: 'email' as const,
    onSourceChange: vi.fn(),
    onAnalyze: vi.fn(),
    isLoading: false,
  };

  it('renders all input fields', () => {
    render(<MessageInput {...defaultProps} />);
    expect(screen.getByLabelText(/where did you receive/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/paste the suspicious message/i)).toBeInTheDocument();
  });

  it('shows character count', () => {
    const testMessage = 'Hello world test message content that is long enough';
    render(<MessageInput {...defaultProps} message={testMessage} />);
    expect(screen.getByText(new RegExp(testMessage.length + ' \\/ 10000 characters'))).toBeInTheDocument();
  });

  it('disables analyze button when message is too short', () => {
    render(<MessageInput {...defaultProps} message="Short" />);
    const analyzeButton = screen.getByRole('button', { name: /analyze message/i });
    expect(analyzeButton).toBeDisabled();
  });

  it('enables analyze button when message is valid', () => {
    render(<MessageInput {...defaultProps} message={'Valid message with enough characters to pass'} />);
    const analyzeButton = screen.getByRole('button', { name: /analyze message/i });
    expect(analyzeButton).not.toBeDisabled();
  });

  it('disables analyze button when loading', () => {
    render(<MessageInput {...defaultProps} isLoading={true} />);
    const analyzeButton = screen.getByRole('button', { name: /analyze message/i });
    expect(analyzeButton).toBeDisabled();
  });

  it('calls onAnalyze when analyze button is clicked', async () => {
    const onAnalyze = vi.fn();
    render(
      <MessageInput
        {...defaultProps}
        message={'Valid message with enough characters to pass'}
        onAnalyze={onAnalyze}
      />
    );
    const analyzeButton = screen.getByRole('button', { name: /analyze message/i });
    await userEvent.click(analyzeButton);
    expect(onAnalyze).toHaveBeenCalled();
  });

  it('calls onMessageChange when text is entered', async () => {
    const onMessageChange = vi.fn();
    render(<MessageInput {...defaultProps} onMessageChange={onMessageChange} />);
    const textarea = screen.getByPlaceholderText(/paste the full message/i);
    await userEvent.type(textarea, 'test message');
    expect(onMessageChange).toHaveBeenCalled();
  });

  it('shows error when message is provided', () => {
    render(<MessageInput {...defaultProps} error="Test error message" />);
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('changes source when select changes', async () => {
    const onSourceChange = vi.fn();
    render(<MessageInput {...defaultProps} onSourceChange={onSourceChange} />);
    const select = screen.getByLabelText(/where did you receive/i);
    await userEvent.selectOptions(select, 'sms');
    expect(onSourceChange).toHaveBeenCalledWith('sms');
  });
});
