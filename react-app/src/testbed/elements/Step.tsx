import React from 'react';

import { FC } from "react"
import { StepNumber } from "./StepNumber"

interface StepProps {
  number: number
  children: React.ReactNode
}

const Step: FC<StepProps> = ({ number, children }) => {

  return (
    <div
        className="flex
          last:animate-[appear_1s_ease-in-out_1]
          border-b-4 last:border-b-0 pt-4 pb-4
        ">
      <div className="
        flex flex-col h-full items-center justify-center
        self-center pr-4
       border-0">
        <StepNumber>{number}</StepNumber>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  )
}

export { Step }