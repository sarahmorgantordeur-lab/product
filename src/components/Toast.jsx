import { useEffect } from 'react'

export default function Toast({message, type ='info', onClose, duration = 3000}) {

    useEffect(() => {
        if (duration && onClose) {
            const timer = setTimeout(() => {
                onClose()
            }, duration)
            return () => clearTimeout(timer)
        }
    }, [onClose, duration])

    const styles = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        info: 'bg-blue-500',
        warning: 'bg-yellow-500',
    }
 

    return (
    <div className={`fixed top-4 right-4 z-50 min-w-80 max-w-md border px-4 py-3 rounded shadow-lg flex items-start justify-between ${styles[type]}`}>
      <div className="flex items-start gap-3">
        <span className="text-xl font-bold"></span>
        <p className="flex-1">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 text-xl font-bold opacity-70 hover:opacity-100"
        >
          ×
        </button>
      )}
    </div>
  )
}