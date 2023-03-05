import { FC } from "react";
import { useAppSelector } from "../../app/hooks";
import CodeDetector from "../CodeDetector";
import { Step } from "../elements/Step";

interface PkceFlowStep1Props {}

const PkceFlowStep2: FC<PkceFlowStep1Props> = () => {

  const flow = useAppSelector(state => state.session.flow!)

  return (
    <Step number={2}>
      {flow.phase !== "in authorization" && <>
        <p>
          Here you are back
        </p>
        <CodeDetector />

      </>}
      {flow.phase === "in authorization" && <>
        <p>
          Now you are about to be redirected to Authentication endpoint
        </p>
        <p>
          Please follow instructions there,
          and after succesfull authentication you will be redirected
          back here. 
          Chances are that you will be redirected right away
          in case you already have existing session on Authentication Server.

        </p>
      </>}
    </Step>
  )
}

export { PkceFlowStep2 }
