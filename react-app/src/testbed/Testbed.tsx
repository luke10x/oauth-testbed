import { FC } from "react";
import { RequestList } from "./request/RequestList";
import { Flow } from "./flows/Flow";
import { TokenList } from "./TokenList";
import { ApiRequestForm } from "./request/ApiRequestForm";

interface TestbedProps {}
const Testbed: FC<TestbedProps> = () => {

  return (
    <>
      <Flow />

      <h1>Tokens</h1> 
      <TokenList />

      <h1>API Requests</h1> 
      <RequestList />
      <ApiRequestForm />
    </>
  )
}

export default Testbed;
