import React,{ FC, useState } from "react"
import { useAppDispatch } from "../../app/hooks"
import { BlueSubmit } from "../elements/BlueSubmit"
import { RedButton } from "../elements/RedButton"
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
        className="my-card">
      <label htmlFor="select-flow"
          className="block text-gray-700 font-bold mb-2">
        Please select flow
      </label>
      <div className="flex gap-2">
        <SelectBox value="AuthorizationCodePkce"
          onChange={handleChange}
          options={opts}
        />
        <BlueSubmit
          disabled={submitted}
        >Start Flow</BlueSubmit>
      </div>
    </form>
  )
}

export { FlowSelector }
