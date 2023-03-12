import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { addCodeFromRedirect } from '../slice';

interface CodeDetectorProps {
  onCodeMissing: () => void
}
const CodeDetector: React.FC<CodeDetectorProps> = ({ onCodeMissing }) => {

  const dispatch = useAppDispatch()

  // They will be here for first time, but then will be removed from URL bar
  const codeParam = new URLSearchParams(window.location.search).get('code')
  const stateParam = new URLSearchParams(window.location.search).get('state')

  // Therefore, they have to be persisted in the state for later access
  const [ code, _setCode ] = useState<string|null>(codeParam)
  const [ state, _setState ] = useState<string|null>(stateParam);

  useEffect(() => {
    if (code && state) {
      dispatch(addCodeFromRedirect({ code, state}))

      // Get the current URL
      const currentUrl = window.location.href;

      // Remove the query parameters
      const newUrl = currentUrl.split('?')[0];

      // Update the URL without query parameters
      window.history.replaceState({}, '', newUrl);
    } else {
      onCodeMissing()
    }
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
