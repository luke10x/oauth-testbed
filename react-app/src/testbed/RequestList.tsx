import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Spinner } from "./Spinner";

interface RequestListProps {}
const RequestList: FC<RequestListProps> = () => {

  const requests = useAppSelector(state => state.session.requests) 
  return (
    <table>
      {requests.map(req => <tr>
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