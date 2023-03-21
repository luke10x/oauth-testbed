import React, { FC } from "react";
import { useAppSelector } from "../../app/hooks";
import { PkceFlowStep1 } from "./PkceFlowStep1";
import { PkceFlowStep2 } from "./PkceFlowStep2";
import { PkceFlowStep3 } from "./PkceFlowStep3";

interface PkceFlowProps {}
const PkceFlow: FC<PkceFlowProps> = () => {
  const flow = useAppSelector(state => state.session.flow)

  const showPhase2 = flow
    && flow.phase !== "in customization"
  const showPhase3 = flow
    && flow.phase !== "in customization"
    && flow.phase !== "in authorization"
    && flow.phase !== "authorized"

  return (
    <div className="my-card">
      <p>
        This is an Authentication Code (with PKCE) flow.                
      </p>

      <PkceFlowStep1 />
      {showPhase2 && <PkceFlowStep2 />}
      {showPhase3 && <PkceFlowStep3 />}
    </div>
  )
}

export { PkceFlow }
