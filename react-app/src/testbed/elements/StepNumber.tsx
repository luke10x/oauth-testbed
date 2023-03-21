import React from 'react';
import { FC } from "react"

interface StepNumberProps {
  children?: React.ReactNode
}
const StepNumber: FC<StepNumberProps> = ({ children }) => (
  <div
      className="flex-0 flex justify-center items-center w-12 h-12
          rounded-full bg-gray-300 text-gray-700 text-lg font-bold">
    {children}
  </div>
)

export { StepNumber }