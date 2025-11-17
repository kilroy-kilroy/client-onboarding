'use client'

interface FormNavigationProps {
  onBack?: () => void
  onNext?: () => void
  nextLabel?: string
  showBack?: boolean
  showNext?: boolean
  nextDisabled?: boolean
}

export default function FormNavigation({
  onBack,
  onNext,
  nextLabel = 'Next',
  showBack = true,
  showNext = true,
  nextDisabled = false,
}: FormNavigationProps) {
  return (
    <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
      {showBack ? (
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
        >
          Back
        </button>
      ) : (
        <div />
      )}

      {showNext && (
        <button
          type="submit"
          onClick={onNext}
          disabled={nextDisabled}
          className="px-6 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {nextLabel}
        </button>
      )}
    </div>
  )
}
