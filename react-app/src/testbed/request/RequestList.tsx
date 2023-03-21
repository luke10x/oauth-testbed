import React from 'react'
import { FC } from "react";
import { useAppSelector } from "../../app/hooks";
import { Spinner } from "../elements/Spinner";

interface RequestListProps {}
const RequestList: FC<RequestListProps> = () => {

  const requests = useAppSelector(state => state.session.requests) 
  return (
    <table className="my-card w-full">
      {requests.map(req => <tr key={req.id}>
        <td>{req.id}</td>
        <td>
          {req.response === undefined && <Spinner />}
          {req.response !== undefined && <>
            {req.response.httpStatus}
          </>}
        </td>
        <td>{req.endpoint}:</td>
      </tr>)}
    </table>
  )
}

export { RequestList }