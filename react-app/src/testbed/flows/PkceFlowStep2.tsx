import React, { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CodeDetector from "./CodeDetector";
import { Step } from "../elements/Step";
import { Spinner } from "../elements/Spinner";
import { fetchTokenThunk, resetFlow } from "../slice";
import { getState } from "../../app/store";
import { RedButton } from "../elements/RedButton";
import { ResetFlowButton } from "../elements/ResetFlowButton";

interface PkceFlowStep2Props {}

const PkceFlowStep2: FC<PkceFlowStep2Props> = () => {

  const flow = useAppSelector(state => state.session.flow!)

  const dispatch = useAppDispatch()
  const [ fetching, setFetching ] = useState<boolean>(false)
  const [ codeOk, setCodeOk ] = useState<boolean>(true)

  const handleFetchToken = () => {
    setFetching(true)
    dispatch(fetchTokenThunk(flow))
    .then(() => {
      const state = getState()
      const tokens = state.session.tokens
      sessionStorage.setItem('session.tokens', JSON.stringify(tokens))
    })
  }

  const handleMissingCode = () => {
    console.log("CODE MISSING - DELETING")
    sessionStorage.removeItem('session.flow')
    dispatch(resetFlow(undefined))
  }

  return (
    <Step number={2}>
      {flow.phase !== "in authorization" && <>
        <p>Welcome back!</p>
        <CodeDetector onCodeMissing={handleMissingCode} />
        {flow.phase === "authorized" && <>
          <div className="flex gap-1">
            {codeOk && <>  
              <RedButton onClick={handleFetchToken} disabled={fetching}>
                Make POST to /token endpoint
              </RedButton>
              <ResetFlowButton />
            </>}
            {!codeOk && <>
              <div>
                <p>
                  Problem. Code from Auth Server is lost!
                </p>

                <ResetFlowButton>Cancel flow</ResetFlowButton>
              </div>
            
            </>}
          </div>
        </>}
      </>}
      {flow.phase === "in authorization" && <>
        <p>
          You are being redirected to Authentication Server.
          Please follow instructions there,
          and after succesfull authentication you will be redirected
          back here. 
          (Chances are that you will be redirected right away,
          in case you already have existing session)
        </p>
        <div className="flex justify-center items-center">
          <Spinner />
          <span>Redirecting...</span>
        </div>

      </>}
    </Step>
  )
}

export { PkceFlowStep2 }
