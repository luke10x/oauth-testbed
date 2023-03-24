import React, { FC, useState } from "react";

import config from "./config";
const {authenticateEndpoint, redirectUri} = config

interface CheckableScopeProps {
  name: string
  value: boolean
  onChange: (value: boolean) => void
}
const CheckableScope: FC<CheckableScopeProps> = ({ name, value, onChange }) => {
  const id = `check-${name}`
  const label = name
  return (
    <div className="mb-1 flex items-baseline">
      <input
        className="mr-2 leading-tight"
        type="checkbox"
        id={id}
        checked={value}
        onChange={() => onChange(!value)}
      />
      <label
        className="block text-gray-700 font-bold mb-2"
        htmlFor={id}>
        {label}
      </label>
    </div>
  )
}

interface AuthFormProps {
  stateString: string
  codeChallenge: string
  onPreSubmit: () => void
}
const AuthForm: FC<AuthFormProps> = ({ stateString, codeChallenge, onPreSubmit }) => {

  const [openid, setOpenid] = useState(true);
  const [profile, setProfile] = useState(true);
  const [messages, setMessages] = useState(false);

  const selectedScopes = [
    openid ? 'openid' : undefined,
    profile ? 'profile' : undefined,
    messages ? 'messages' : undefined,
  ].filter(v => v).join(' ')

  const handleAuthenticationSubmit = (event: { preventDefault: () => void; }) => {
    // event.preventDefault();
    onPreSubmit()
    return true
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h3 className="text-2xl font-bold mb-4">Create a new session</h3>
      <p className="mb-3" >Please select desired scopes:</p>

      <CheckableScope name="openid" value={openid} onChange={setOpenid} />
      <CheckableScope name="profile" value={profile} onChange={setProfile} />
      <CheckableScope name="messages" value={messages} onChange={setMessages} />

      <form method="GET" action={authenticateEndpoint} onSubmit={handleAuthenticationSubmit}>
        <p>Authenticate request to GET {authenticateEndpoint} with the following parameters</p>
  
        <input type="hidden" name="response_type"
          value="code" />
        <input type="hidden" name="client_id"
          value="reactclient" />
        <input type="hidden" name="redirect_uri"
          value={redirectUri} />
        <input type="hidden" name="scope"
          value={selectedScopes} />
        <input type="hidden" name="state"
          value={stateString} />
        <input type="hidden" name="code_challenge"
          value={codeChallenge} />
        <input type="hidden" name="code_challenge_method"
          value="S256" />
          
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Go to authenticate
          </button>
        </div>
      </form>
    </div>
  );
}

export { AuthForm }