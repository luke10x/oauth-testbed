import { FC } from "react"
import { StepNumber } from "./StepNumber"

interface StepProps {
  number: number
  children: React.ReactNode
}

const Step: FC<StepProps> = ({ number, children }) => {

  return (
    <div
        className="flex">
      <div className="pr-2 ">
        <StepNumber>{number}</StepNumber>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  )
}

export { Step }