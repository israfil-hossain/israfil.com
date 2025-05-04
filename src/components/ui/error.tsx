// components/ErrorComponent.tsx
'use client';

import { IconAlertOctagonFilled } from '@tabler/icons-react';
interface ErrorComponentProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export default function ErrorComponent({
  title = 'Something went wrong!',
  message = 'We encountered an error while loading the data. Please try again.',
  onRetry,
}: ErrorComponentProps) {
  return (
    <div className="w-full max-w-md mx-auto mt-10 p-6 border border-red-200 bg-red-50 rounded-xl shadow-sm text-center">
      <div className="flex flex-col items-center gap-3">
        <IconAlertOctagonFilled className="h-8 w-8 text-red-500" />
        <h2 className="text-lg font-semibold text-red-600">{title}</h2>
        <p className="text-sm text-red-500">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-4 px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
}
