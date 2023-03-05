import React from 'react';
import { useAppDispatch } from '../../app/hooks';
import { resetFlow } from '../slice';

interface ResetFlowProps {
  children?: React.ReactNode
}

const ResetFlowButton: React.FC<ResetFlowProps> = ({ children }) => {
  const dispatch = useAppDispatch()
  const handleClick = () => {
    dispatch(resetFlow(undefined))
  }

  return (
    <button
      className="mt-2 mb-2 py-2 px-4 font-semibold rounded-lg shadow-md text-red-500
        bg-red-50 hover:bg-red-200 hover:text-red-700 disabled:bg-gray-500
        focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
      onClick={handleClick}
    >
      {children ? children : <>Reset flow</>}
    </button>
  );
};

export { ResetFlowButton }
