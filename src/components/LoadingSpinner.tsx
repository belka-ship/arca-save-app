import React from 'react'

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large'
}

/**
 * Minimal loading spinner component
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = React.memo(
  ({ size = 'medium' }) => {
    const sizeMap = {
      small: 16,
      medium: 24,
      large: 40,
    }

    const pixelSize = sizeMap[size]

    return (
      <div
        style={{
          width: pixelSize,
          height: pixelSize,
          border: '2px solid #E5E5E5',
          borderTopColor: 'rgb(32 78 65)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
          display: 'inline-block',
        }}
        role="status"
        aria-label="Loading"
      />
    )
  }
)

LoadingSpinner.displayName = 'LoadingSpinner'
