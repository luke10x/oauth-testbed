import { FC } from "react"
import { restrictedBackendEndpoint } from "./config"

interface BackendRequestProps {
  accessToken: string
}
export const BackendRequest: FC<BackendRequestProps> = ({ accessToken}) => {
  const handleApiCall = () => {
    fetch(restrictedBackendEndpoint, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(result => {
      result.text()
      .then(text => console.log("Text from API obtained:", text))
      .catch(err => console.error("Obtainure of text fails", err))
    })
    .catch(err => console.error("Fetch API fails", err))
  }
  return (<button onClick={handleApiCall} className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">
    API Call
  </button>)
}