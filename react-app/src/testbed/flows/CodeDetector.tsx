import React, { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { addCodeFromRedirect } from '../slice';

interface CodeDetectorProps {}
const CodeDetector: React.FC<CodeDetectorProps> = ({ }) => {

  const dispatch = useAppDispatch()

  const code = new URLSearchParams(window.location.search).get('code');
  const state = new URLSearchParams(window.location.search).get('state');

  useEffect(() => {
    if (code && state) {
      dispatch(addCodeFromRedirect({ code, state}))
    }
    console.log("Effect on code and state")
  }, [ ])

  if (!code || !state) {
    return null; // if code or state is not provided in the URL, don't render anything
  }

  return (
    <div className="p-4 rounded-md shadow-md bg-red-100">
      <div className="text-lg font-medium mb-2">Detected Code and State</div>
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Code:</span>
          <span className="font-medium">{code}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">State:</span>
          <span className="font-medium">{state}</span>
        </div>
      </div>
    </div>
  );
};

export default CodeDetector;
