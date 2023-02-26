import { FC, useState } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { backendUrlBase } from "./config";
import { allKnownTokensSelector, apiRequestThunk } from "./slice";



interface CreateApiRequestButtonProps {
  onClick: () => void;
}

const CreateApiRequestButton: React.FC<CreateApiRequestButtonProps> = ({ onClick }) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2"
      onClick={onClick}
    >
      {/* <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zm11.297-2.17A7.962 7.962 0 0120 12h-4c0 3.042-1.135 5.824-3 7.938l-3-2.647z"></path>
      </svg> */}
      {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path d="M3.25 3.5a.75.75 0 0 0 0 1.5h1.13A3.49 3.49 0 0 1 8 7.91v1.18a3.49 3.49 0 0 1-3.62 3.41H3.25a.75.75 0 0 0 0 1.5h1.13a4.99 4.99 0 0 0 5.12-4.91V7.91a4.99 4.99 0 0 0-5.12-4.91H3.25zM10.87 5.47a.75.75 0 0 0 0-1.06l-.8-.8a.75.75 0 0 0-1.06 0l-.8.8a.75.75 0 0 0 1.06 1.06l.2-.2v4.36a.75.75 0 0 0 1.5 0V5.27l.2.2a.75.75 0 0 0 1.06 0z"/>
      </svg> */}
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10.556 16.11c-.17.477-.774.888-1.256.888H4.22c-.483 0-1.086-.41-1.256-.888l-2.66-7.387c-.171-.477-.22-.932-.125-1.172.096-.24.463-.888 1.081-1.434C2.877 5.428 6.112 3 10 3s7.123 2.428 9.42 3.316c.618.545.985 1.194 1.082 1.434.095.24.047.695-.125 1.172l-2.66 7.387zm-5.534-1.22h5.528l2.293-6.357c.018-.05.032-.109.041-.178.01-.069.01-.16-.005-.262-.075-.37-.421-.736-1.055-1.124C11.378 7.812 9.758 7 8 7s-3.378.812-4.767 1.479c-.634.388-.98.754-1.055 1.124-.015.102-.015.193-.005.262.01.069.023.128.041.178l2.293 6.357z" clipRule="evenodd" />
        <path d="M10 13a1 1 0 100-2 1 1 0 000 2z" />
      </svg>
      <span>Create API Request</span>
    </button>
  );
};

interface CardFormProps {
  accessTokens: string[]
  onConfigured: (endpoint: string, accessToken?: string) => void
}
const CardForm: FC<CardFormProps> = ({ accessTokens, onConfigured }) => {
  
  const [
    selectedEndpoint,
    setSelectedEndpoint,
  ] = useState<string>("/")
  const [
    selectedAccessToken,
    setSelectedAccessToken
  ] = useState<string|undefined>(undefined);
  
  const onSelectEndpoint = (event: React.FormEvent<HTMLSelectElement>) => {
    setSelectedEndpoint(event.currentTarget.value)
  } 
  const onSelectAccessToken = (event: React.FormEvent<HTMLSelectElement>) => {
    setSelectedAccessToken(event.currentTarget.value)
  } 

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onConfigured(selectedEndpoint, selectedAccessToken)
  }

  return (
    <div className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
      <div className="bg-white px-4 py-5">
        <h2 className="text-xl font-medium text-gray-800 mb-4">Create API Request</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label htmlFor="endpoint" className="block text-gray-700 font-bold mb-2">
              Endpoint
            </label>
            <select onChange={onSelectEndpoint} id="endpoint" name="endpoint" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <option key="1" value={`${backendUrlBase}/`}>root</option>
                <option key="2" value={`${backendUrlBase}/secret`}>/secret</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="token" className="block text-gray-700 font-bold mb-2">
              Active Token
            </label>
            <select onChange={onSelectAccessToken} id="token" name="token" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option key="0" value="">Only pass cookie if set</option>
              {accessTokens.map((token, index) => (
                <option key={index} value={token}>{token}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}



interface RequestCreatorProps {

}

type Stage = "CallToAction" | "Configuring" | "Pending" | "Completed"
export const RequestCreator: FC<RequestCreatorProps> = () => {
  const [stage, setStage] = useState<Stage>("CallToAction")

  const accessTokens = useAppSelector(allKnownTokensSelector)
  const dispatch = useAppDispatch()

  // const [accessTokens, setAccessTokens] = useState<string[]>([])
  const handleClick = () => {
    setStage("Configuring")
    // setAccessTokens(tokens)
  }

  const handleConfigured = (endpoint: string, accessToken?: string) => {
    dispatch(apiRequestThunk({ endpoint, accessToken }))
  }

  return (
    <div>
      {stage === "CallToAction" 
        && <CreateApiRequestButton onClick={handleClick}/>}
      {stage === "Configuring" 
        && <CardForm accessTokens={accessTokens} onConfigured={handleConfigured}/>}
    </div>
  )
}