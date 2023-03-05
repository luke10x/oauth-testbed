import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { PkceFlow } from "./PkceFlow";
import { FlowSelector } from "./FlowSelector";
import { loadFlow } from "../slice";

interface FlowProps {}

const Flow: FC<FlowProps> = ({}) => {
  const dispatch = useAppDispatch()
  let flow = useAppSelector(state => state.session.flow)

  useEffect(() => {
    if (flow === undefined) {
      const storedFlow = sessionStorage.getItem('session.flow')
      if (storedFlow) {
        dispatch(loadFlow(JSON.parse(storedFlow)))
        flow = JSON.parse(storedFlow)
      }
    }
  }, [])
  

  if (flow === undefined) {
    return <FlowSelector />
  }

  return <PkceFlow />
} 
export { Flow }