import { FC } from "react"
import { useAppDispatch } from "../app/hooks"
import { restrictedBackendEndpoint } from "./config"
import { HttpRequestStatus } from "./HttpRequestStatus"
import { apiRequestThunk } from "./slice"


interface BackendRequestProps {
  accessToken: string
}

const BackendRequest: FC<BackendRequestProps> = ({ accessToken}) => {

  const dispatch = useAppDispatch()

  const handleApiCall = () => {
    // dispatch(apiRequestThunk(accessToken))
  }
    // .then(result => {
    //   result.text()
    //   .then(text => console.log("Text from API obtained:", text))
    //   .catch(err => console.error("Obtainure of text fails", err))
    // })
    // .catch(err => console.error("Fetch API fails", err))
  // }

  
  return (
    <>
    {/* <HttpRequestStatus url={restrictedBackendEndpoint} /> */}

    <ul>
      <li></li>
    </ul>
    <button onClick={handleApiCall} className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">
      API Call
    </button>



    </>
  )
}

export { BackendRequest }