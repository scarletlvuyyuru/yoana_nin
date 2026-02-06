import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  message = 'Loading...' 
}) => {
  const sizeClasses = {
    small: 'w-6 h-6 border-2',
    medium: 'w-10 h-10 border-4',
    large: 'w-16 h-16 border-4'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-48" role="status" aria-label={message}>
      <div 
        className={`
          ${sizeClasses[size]} 
          border-solid
          border-gray-300 
          border-t-blue-600 
          rounded-full 
          animate-spin
        `}
        style={{
          borderColor: 'var(--border-color)',
          borderTopColor: 'var(--color-blue)'
        }}
      ></div>
      <span className="mt-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
        {message}
      </span>
      <span className="sr-only">{message}</span>
    </div>
  );
};

export default LoadingSpinner;