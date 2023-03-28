import React,{ FC, useState } from "react"
import { useAppDispatch } from "../../app/hooks"
import { BlueSubmit } from "../elements/BlueSubmit"
import { RedButton } from "../elements/RedButton"
import { chooseProvider, FlowType, startAuthorizationCodePkceFlowThunk } from "../slice"
import { SelectBox } from "../ui"

import config from '../config'


const opts = config.authProviders.map((provider, key) => {
  return {
    value: key,
    title: provider.name,
  }
})

interface FlowSelectorProps {}
const FlowSelector: FC<FlowSelectorProps> = () => {
  const [ selected, setSelected ] = useState<number>(0)
  const [ submitted, setSubmitted ] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const handleChange = (value: number) => {
    setSelected(value)
    dispatch(chooseProvider(Number(value)))
    console.log("pasiringtas", Number(value))
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    dispatch(startAuthorizationCodePkceFlowThunk())
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
        <SelectBox value={selected}
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
