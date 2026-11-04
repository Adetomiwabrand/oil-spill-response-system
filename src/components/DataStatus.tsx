import React from 'react';

interface DataStatusProps {
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  isEmpty?: boolean;
  emptyMessage?: string;
}

export const DataStatus: React.FC<DataStatusProps> = ({
  isLoading,
  isError,
  errorMessage = 'Unable to load data. Please try again.',
  isEmpty = false,
  emptyMessage = 'No records found.',
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center gap-3 py-12 justify-center" role="status" aria-live="polite">
        <span className="animate-pulse h-2 w-2 rounded-full bg-responseGreen block" aria-hidden="true" />
        <p className="text-xs font-bold uppercase tracking-widest text-navyPanel/40">
          Loading data...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="border-l-2 border-alertRed bg-alertRed/5 px-5 py-4 my-6" role="alert">
        <p className="text-xs font-bold uppercase tracking-widest text-alertRed mb-1">
          Connection Error
        </p>
        <p className="text-sm text-navyPanel/60">{errorMessage}</p>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="border-l-2 border-navyPanel/20 bg-fieldBg px-5 py-4 my-6">
        <p className="text-sm text-navyPanel/40">{emptyMessage}</p>
      </div>
    );
  }

  return null;
};

export default DataStatus;
