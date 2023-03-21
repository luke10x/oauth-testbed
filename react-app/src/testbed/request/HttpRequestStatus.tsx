import React from 'react'
import { useState } from 'react';

type CompletionStatus = 'pending' | 'success' | 'clientError' | 'serverError' | 'connectionError';

interface Props {
  url: string;
}

const HttpRequestStatus = ({ url }: Props) => {
  const [completionStatus, setCompletionStatus] = useState<CompletionStatus>('pending');
  const [statusCode, setStatusCode] = useState<number>(0);
  const [responseBody, setResponseBody] = useState('');

  const makeRequest = async () => {
    try {
      const response = await fetch(url);
      const statusCode = response.status;

      if (statusCode >= 200 && statusCode < 300) {
        setCompletionStatus('success');
        setResponseBody(await response.text());
        setStatusCode(statusCode)
      } else if (statusCode >= 400 && statusCode < 500) {
        setCompletionStatus('clientError');
        setResponseBody(await response.text());
        setStatusCode(statusCode);
      } else {
        setCompletionStatus('serverError');
        setResponseBody(await response.text());
        setStatusCode(statusCode);
      }
    } catch (error) {
      setCompletionStatus('connectionError');
      setResponseBody('');
    }
  };

  const getStatusColor = () => {
    switch (completionStatus) {
      case 'success':
        return 'text-green-500';
      case 'clientError':
        return 'text-red-500';
      case 'serverError':
        return 'text-red-700';
      default:
        return '';
    }
  };

  const getButtonColor = () => {
    switch (completionStatus) {
      case 'pending':
        return 'bg-blue-500 hover:bg-blue-700 text-white';
      default:
        return 'bg-gray-400 text-gray-700 cursor-not-allowed';
    }
  };

  return (
    <div className="flex flex-col items-center">

      {completionStatus !== 'pending' && (
        <div className={`ml-2 font-bold ${getStatusColor()}`}>
          {completionStatus === 'success' && `Success! (${url} - ${statusCode})`}
          {completionStatus === 'clientError' && `Client Error (${url} - ${statusCode})`}
          {completionStatus === 'serverError' && `Server Error (${url} - ${statusCode})`}
        </div>
      )}
      {completionStatus === 'success' && (
        <div className="mt-4">
          <textarea
            className="w-full p-2 border rounded-md resize-none"
            value={responseBody}
            readOnly
          />
        </div>
      )}
      {completionStatus !== 'success' && (
        <div className="mt-4">

          <textarea
            className="w-full p-2 border rounded-md resize-none"
            placeholder="Response Body"
            readOnly
          />
        </div>
      )}
    </div>
  );
};

export { HttpRequestStatus };