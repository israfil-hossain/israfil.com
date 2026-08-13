import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'ghost' | 'outline'
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', loading, className, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'px-6 py-2.5 rounded-lg font-medium text-sm transition-colors inline-flex items-center justify-center gap-2',
          variant === 'primary' && 'bg-blue-600 hover:bg-blue-700 text-white disabled:bg-blue-400',
          variant === 'danger' && 'bg-red-600 hover:bg-red-700 text-white disabled:bg-red-400',
          variant === 'ghost' && 'bg-transparent hover:bg-gray-100 text-gray-700',
          variant === 'outline' && 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700',
          className
        )}
        {...props}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
