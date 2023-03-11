import { FC } from "react";
import { useAppSelector } from "../../app/hooks";
import CodeDetector from "./CodeDetector";
import { Step } from "../elements/Step";
import { Spinner } from "../elements/Spinner";

interface PkceFlowStep2Props {}

const PkceFlowStep2: FC<PkceFlowStep2Props> = () => {

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
          <Spinner />
          You about to be redirected to Authetication Server!
        </p>
        <p>
          Please follow instructions there,
          and after succesfull authentication you will be redirected
          back here. 
          (Chances are that you will be redirected right away,
          in case you already have existing session)
        </p>
      </>}
    </Step>
  )
}

export { PkceFlowStep2 }
