import { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getState } from "../../app/store";
import { RedButton } from "../elements/RedButton";
import { ResetFlowButton } from "../elements/ResetFlowButton";
import { Step } from "../elements/Step";
import { fetchTokenThunk } from "../slice";

interface PkceFlowStep1Props {}

const PkceFlowStep3: FC<PkceFlowStep1Props> = () => {
  const dispatch = useAppDispatch()
  const [ fetching, setFetching ] = useState<boolean>(false)
  const flow = useAppSelector(state => state.session.flow!)

  const handleFetchToken = () => {
    setFetching(true)
    dispatch(fetchTokenThunk(flow))
    .then(() => {
      const state = getState()
      const tokens = state.session.tokens
      sessionStorage.setItem('session.tokens', JSON.stringify(tokens))
    })
  }
  return (
    <Step number={3}>
      {flow.phase !== "authorized" && <>
        <p>
          You are authorized and flow is complete
          token saved........
        </p>
      </>}
      {flow.phase === "authorized" && <>
        <p>
            Authorized and code is here, call authorize endpoint with this code
        </p>
        <div className="flex gap-1">
          <RedButton onClick={handleFetchToken} disabled={fetching}>
            Make POST to /token endpoint
          </RedButton>
          <ResetFlowButton />
        </div>
      </>}
      {flow.phase === "got token" && <>
        <div>token is: {flow.tokenId}</div> 
        <ResetFlowButton>End flow</ResetFlowButton>
      </>}
    </Step>
  )
}

export { PkceFlowStep3 }
