import { FC } from "react";
import { useAppSelector } from "../../app/hooks";
import { ResetFlowButton } from "../elements/ResetFlowButton";
import { Step } from "../elements/Step";

interface PkceFlowStep1Props {}

const PkceFlowStep3: FC<PkceFlowStep1Props> = () => {
  const flow = useAppSelector(state => state.session.flow!)

  return (
    <Step number={3}>
      {flow.phase !== "authorized" && <>
        <p>
          You are authorized and flow is complete
          token saved........
        </p>
      </>}
      {flow.phase === "authorized" && <>
      phase=authorized
      </>}
      {flow.phase === "got token" && <>
        <div>token is: {flow.tokenId}</div> 
        <ResetFlowButton>End flow</ResetFlowButton>
      </>}
    </Step>
  )
}

export { PkceFlowStep3 }
