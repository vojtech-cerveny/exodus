import '@testing-library/jest-dom'; // Add this import
import { fireEvent, render, screen } from '@testing-library/react';
import { FeedbackNotification } from './feedback-notification-bar';

const localStorageMock = (function () {
  let store = {} as Record<string, string>;
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    removeItem: jest.fn((key) => {
      delete store[key];
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('FeedbackNotification', () => {
  const mockGoogleFormUrl = 'https://example.com/form';

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Mock the Date object
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should not show notification before the first date', () => {
    jest.setSystemTime(new Date('2024-09-02'));
    render(<FeedbackNotification showDates={['2024-09-03', '2024-10-10']} googleFormUrl={mockGoogleFormUrl} />);
    expect(screen.queryByText('Dej nám zpětnou vazbu')).not.toBeInTheDocument();
  });

  it('should show notification on the first date', () => {
    jest.setSystemTime(new Date('2024-09-03'));
    render(<FeedbackNotification showDates={['2024-09-03', '2024-10-10']} googleFormUrl={mockGoogleFormUrl} />);
    expect(screen.getByText('Dej nám zpětnou vazbu')).toBeInTheDocument();
  });

  it('should not show notification after dismissal until next date', () => {
    jest.setSystemTime(new Date('2024-09-03'));
    const { rerender } = render(
      <FeedbackNotification showDates={['2024-09-03', '2024-10-10']} googleFormUrl={mockGoogleFormUrl} />,
    );

    fireEvent.click(screen.getByRole('button'));

    jest.setSystemTime(new Date('2024-09-04'));
    rerender(<FeedbackNotification showDates={['2024-09-03', '2024-10-10']} googleFormUrl={mockGoogleFormUrl} />);
    expect(screen.queryByText('Dej nám zpětnou vazbu')).not.toBeInTheDocument();

    jest.setSystemTime(new Date('2024-10-11'));
    rerender(<FeedbackNotification showDates={['2024-09-03', '2024-10-10']} googleFormUrl={mockGoogleFormUrl} />);
    expect(screen.queryByText('Dej nám zpětnou vazbu')).toBeInTheDocument();
  });

  it('should show notification on subsequent dates if not dismissed', () => {
    jest.setSystemTime(new Date('2024-09-03'));
    const { rerender } = render(
      <FeedbackNotification showDates={['2024-09-03', '2024-10-10', '2024-11-22']} googleFormUrl={mockGoogleFormUrl} />,
    );
    expect(screen.getByText('Dej nám zpětnou vazbu')).toBeInTheDocument();

    jest.setSystemTime(new Date('2024-10-10'));
    rerender(
      <FeedbackNotification showDates={['2024-09-03', '2024-10-10', '2024-11-22']} googleFormUrl={mockGoogleFormUrl} />,
    );
    expect(screen.getByText('Dej nám zpětnou vazbu')).toBeInTheDocument();

    jest.setSystemTime(new Date('2024-11-22'));
    rerender(
      <FeedbackNotification showDates={['2024-09-03', '2024-10-10', '2024-11-22']} googleFormUrl={mockGoogleFormUrl} />,
    );
    expect(screen.getByText('Dej nám zpětnou vazbu')).toBeInTheDocument();
  });

  it('should show notification again on the last date even if dismissed earlier', () => {
    jest.setSystemTime(new Date('2024-09-03'));
    const { rerender } = render(
      <FeedbackNotification showDates={['2024-09-03', '2024-10-10', '2024-11-22']} googleFormUrl={mockGoogleFormUrl} />,
    );

    fireEvent.click(screen.getByRole('button'));

    jest.setSystemTime(new Date('2024-11-22'));
    rerender(
      <FeedbackNotification showDates={['2024-09-03', '2024-10-10', '2024-11-22']} googleFormUrl={mockGoogleFormUrl} />,
    );

    expect(screen.getByText('Dej nám zpětnou vazbu')).toBeVisible();
  });

  it('should not show notification after the last date if dismissed', () => {
    jest.setSystemTime(new Date('2024-11-22'));
    const { rerender } = render(
      <FeedbackNotification showDates={['2024-09-03', '2024-10-10', '2024-11-22']} googleFormUrl={mockGoogleFormUrl} />,
    );

    fireEvent.click(screen.getByRole('button'));

    jest.setSystemTime(new Date('2024-12-01'));
    rerender(
      <FeedbackNotification showDates={['2024-09-03', '2024-10-10', '2024-11-22']} googleFormUrl={mockGoogleFormUrl} />,
    );
    expect(screen.queryByText('Dej nám zpětnou vazbu')).not.toBeInTheDocument();
  });
});
