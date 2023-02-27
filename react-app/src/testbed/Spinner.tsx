import { FC } from "react"

interface SpinnerProps {

}
export const Spinner: FC<SpinnerProps> = () => {
  return (
    <div>
      <svg viewBox="0 0 50 50" className="animate-spin h-6 w-6 text-indigo-600">
        <circle className="opacity-25" cx="25" cy="25" r="15"
          stroke="currentColor" fill="none" strokeWidth="5"></circle>
        <path className="opacity-25" 
          d="M25 10A15 15 0 0 1 25 40" 
          stroke="currentColor" strokeWidth="5" 
          strokeLinecap="round" fill="none"></path>
      </svg>
    </div>
  )
}