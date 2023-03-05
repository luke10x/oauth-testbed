import React from 'react';

interface Props {
  onClick: () => void
  children?: React.ReactNode
  disabled?: boolean
}

const RedButton: React.FC<Props> = ({ onClick, children, disabled }) => {
  return (
    <button
      className="mt-2 mb-2 py-2 px-4 font-semibold rounded-lg shadow-md text-white
        bg-red-500 hover:bg-red-700 disabled:bg-gray-500
        focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
      onClick={onClick}
      disabled={ disabled === true}
    >
      {children}
    </button>
  );
};

export { RedButton };
