import { FC } from "react";
import { useAppSelector } from "../../app/hooks";
import { AuthorizationCodePkceFlow } from "./AuthorizationCodePkceFlow";
import { FlowSelector } from "./FlowSelector";

interface FlowProps {

}
const Flow: FC<FlowProps> = ({}) => {
  const flow = useAppSelector(state => state.session.flow)
   
   if (flow === undefined) {
    return <FlowSelector />
   }

  return <AuthorizationCodePkceFlow />
} 
export { Flow }