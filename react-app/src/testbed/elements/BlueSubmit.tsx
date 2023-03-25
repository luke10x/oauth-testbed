import React from 'react'

interface Props {
  children?: React.ReactNode
  disabled?: boolean
}

const BlueSubmit: React.FC<Props> = ({ children, disabled }) => {
  return (
    <button
      className="py-2 px-4 font-semibold rounded-lg shadow-md 
        bg-blue-500 disabled:bg-gray-500 hover:bg-blue-700 
        text-white font-bold py-2 px-4 rounded
        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75
        "
      disabled={ disabled === true}
      type="submit"
    >
      {children}
    </button>
  );
};

export { BlueSubmit };
