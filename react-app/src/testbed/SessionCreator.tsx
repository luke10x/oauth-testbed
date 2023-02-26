import { FC, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { AuthForm } from "./AuthForm";
import { generateChallengeAndVerifier, generateStateString } from "./lib/auth";
import { addSession } from "./slice";

const Spinner = () => (
  <div>
    <div className="flex justify-center items-center h-screen">
      <svg className="animate-spin h-10 w-10 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zm11.297-2.17A7.962 7.962 0 0120 12h-4c0 3.042-1.135 5.824-3 7.938l-3-2.647z"></path>
      </svg>
    </div>  
  </div>
)
interface SessionCreatorProps {

}
type CreationState =
  | { stage: "Initialized" }
  | { stage: "Generating" }
  | { stage: "Configuring",
      codeVerifier: string,
      codeChallenge: string,
      stateString: string }

const SessionCreator: FC<SessionCreatorProps>  = ({})=> {
  const [creationStatus, setCreationStatus] = useState<CreationState>(
    { stage: "Initialized" }
  )
  const dispatch = useAppDispatch()

  const handleStartGenerating = () => {
    setCreationStatus({ stage: "Generating" })
    const stateString = generateStateString()
    generateChallengeAndVerifier()
      .then(({codeChallenge, codeVerifier}) => {
        setCreationStatus({
          stage: "Configuring", codeChallenge, codeVerifier, stateString
        })
      })
  }

  const handlePreSubmit = () => {
    if (creationStatus.stage !== "Configuring") {
      throw new Error("Form posted from unexpected stage")
    }
    dispatch(addSession({
      stateString: creationStatus.stateString,
      codeVerifier: creationStatus.codeVerifier
    }))
  }

  return (
    <>
      {creationStatus.stage === "Initialized" && 
        <button onClick={handleStartGenerating} className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          <svg className="h-5 w-5 fill-current mr-2" viewBox="0 0 20 20">
            <path d="M7.5 1.5a5 5 0 000 10h5a5 5 0 000-10h-5zM6.667 6.167a2.833 2.833 0 116.666 0 2.833 2.833 0 01-6.666 0zM2.5 14.5h15a1 1 0 010 2h-15a1 1 0 010-2z"/>
          </svg>
          Create new Auth Session
        </button>
      }
      
      {creationStatus.stage === "Generating" && <Spinner />}

      {creationStatus.stage === "Configuring" && <AuthForm
          stateString={creationStatus.stateString}
          codeChallenge={creationStatus.codeChallenge}
          onPreSubmit={handlePreSubmit}
        />}
    </>
  )
}

export { SessionCreator }
