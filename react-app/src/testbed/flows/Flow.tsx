import React, { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { PkceFlow } from "./PkceFlow";
import { FlowSelector } from "./FlowSelector";
import { loadFlow } from "../slice";

interface FlowProps {}

const Flow: FC<FlowProps> = ({}) => {
  const dispatch = useAppDispatch()
  const flow = useAppSelector(state => state.session.flow)

  useEffect(() => {
    if (flow === undefined) {
      const storedFlow = sessionStorage.getItem('session.flow')
      let parsed = undefined
      if (storedFlow) {
        try {
          parsed = JSON.parse(storedFlow)
        } catch (e) {
          console.error("Cannot parse stored flow", storedFlow)
        }
        if (typeof parsed === 'object') {

          dispatch(loadFlow(parsed))
        }
      }
    }
  }, [])
  

  if (flow === undefined) {
    return <FlowSelector />
  }

  return <PkceFlow />
} 
export { Flow }