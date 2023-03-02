import { FC, useState } from "react"
import { useAppDispatch } from "../../app/hooks"
import { FlowType, startAuthorizationCodePkceFlowThunk } from "../slice"
import { SelectBox } from "../ui"

const opts = [
  { 
    value: "AuthorizationCodePkce",
    title: "KC OIDC Authorization Code (with PKCE)",
  },
]

interface FlowSelectorProps {}
const FlowSelector: FC<FlowSelectorProps> = () => {
  const [ selected, setSelected ] = useState<FlowType>("AuthorizationCodePkceFlow")
  const [ submitted, setSubmitted ] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const handleChange = (value: string) => {
    setSelected(value as FlowType)
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (selected === "AuthorizationCodePkceFlow") {
      dispatch(startAuthorizationCodePkceFlowThunk())
    }
    setSubmitted(true)
  }

  return (
    <form onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <label htmlFor="select-flow"
          className="block text-gray-700 font-bold mb-2">
        Please select flow
      </label>
      <div className="flex gap-2">
          <SelectBox value="AuthorizationCodePkce"
            onChange={handleChange}
            options={opts} />
        <input
            className="bg-blue-500 disabled:bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            value="Start Flow"
            disabled={submitted}
            />
      </div>
    </form>
  )
}

export { FlowSelector }
