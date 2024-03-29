import React, { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RedButton } from "../elements/RedButton";
import { ResetFlowButton } from "../elements/ResetFlowButton";
import { Step } from "../elements/Step";
import { goToAuthThunk } from "../slice";
import { buildPkceAuthParams } from "../slice/functions";

interface PkceFlowStep1Props {}

const PkceFlowStep1: FC<PkceFlowStep1Props> = () => {

  const [ goingToAuth, setGoingToAuth ] = useState<boolean>(false)
  const flow = useAppSelector(state => state.session.flow!)
  const dispatch = useAppDispatch()

  const handleGoToAuth = () => {
    setGoingToAuth(true)
    dispatch(goToAuthThunk(flow))
  }

  const authProvider = useAppSelector(state => 
    state.session.authProviders[state.session.selectedAuthProvider])
  const url = buildPkceAuthParams(flow, authProvider)

  return (
    <Step number={1}>
      <p>
        Notice the verifier and the challenge 
      </p>
      <p> 
          Now you need to go to the Authorization Endpoint authenticate.
      </p>

      <textarea className="w-full px-4 py-2
        border-2 border-gray-300 rounded-lg
        focus:outline-none focus:border-blue-500" 
          rows={4} value={url} readOnly/>
      
      {flow.phase === "in customization" && <div className="flex gap-1">
        <RedButton onClick={handleGoToAuth} disabled={goingToAuth}>
          Go to Authentication
        </RedButton>
        
        <ResetFlowButton />
      </div>}
    </Step>
  )
}

export { PkceFlowStep1 }
