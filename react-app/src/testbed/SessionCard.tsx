

import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { redirectUri, tokenEndpoint } from './config';
import { Identicon } from './Identicon';
import { attachToken, redirectSelector, selectSessionByStateStringSelector } from './slice'; 

interface FetchTokenButtonProps {
  onClick: () => void;
}

const FetchTokenButton: React.FC<FetchTokenButtonProps> = ({ onClick }) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={onClick}
    >
      Fetch token
    </button>
  );
};

interface SessionCardProps {
  stateString: string;
}

export const SessionCard: React.FC<SessionCardProps> = ({
  stateString: sessionState,
}) => {

  const redirect = useAppSelector(redirectSelector)
  const dispatch = useAppDispatch()

  const session = useAppSelector(state => selectSessionByStateStringSelector(state, sessionState))

  const codeVerifier = session?.codeVerifier || ''
  const accessToken = session?.accessToken || ''

  const handleFetchToken = () => {
    const body = new URLSearchParams();
    body.set('grant_type', 'authorization_code');
    body.set('client_id', 'reactclient');
    body.set('code_verifier', codeVerifier);
    body.set('code', redirect!.code);
    body.set('redirect_uri', redirectUri);

    fetch(tokenEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString()
    })  .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Network response was not ok');
      }
    })
    .then(data => {
      console.log(data);
      dispatch(attachToken({
        sessionState, 
        accessToken: data.access_token
      }))
    })
    .catch(error => {
      // Handle errors here
      console.error('There was a problem with the fetch operation:', error);
    });
  }

  const stateMatches = redirect?.state === sessionState
  const bg = stateMatches ? 'bg-yellow-500' : 'bg-white'
  const canGetToken = stateMatches && !accessToken;


  return (
    <div className={`p-4 mt-2 mb-2 rounded-md shadow-md ${bg}`}>
      <div className="text-lg font-medium mb-2">
        {sessionState} <Identicon payload={sessionState} />
     
      </div>
      <div className="flex flex-col space-y-2">
        
        <div className="flex justify-between">
          <span className="text-gray-600">Session Stateddd:</span>
          <span className="font-medium">{sessionState}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Code Verifier:</span>
          <span className="font-medium">{codeVerifier}</span>
        </div>

        {canGetToken && <FetchTokenButton onClick={handleFetchToken}/>}
        {accessToken && (
          <div className="flex justify-between">
            <span className="text-gray-600">Token:</span>
            <span className="font-medium">{accessToken}</span>
          </div>
        )}
      </div>
    </div>
  );
};


