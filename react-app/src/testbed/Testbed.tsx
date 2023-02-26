import { FC, useEffect, useState } from "react";
import { restoreSessions, Session } from "./slice/index";
import { useAppDispatch } from "../app/hooks";
import { SessionCreator } from "./SessionCreator";
import { SessionCard } from "./SessionCard";
import CodeDetector from "./CodeDetector";
import { RequestCreator } from "./RequestCreator";

interface TestbedProps {}
const Testbed: FC<TestbedProps> = () => {
  const data = sessionStorage.getItem('my-sessions')
  const storedSessions: Session[] = data === null ? [] : JSON.parse(data)

  const sessions = storedSessions
  
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(restoreSessions(storedSessions))
  }, [])

  return (
    <>
      <h1>User Sessions</h1> 
      <div className="flex flex-col ">
        <CodeDetector />
        <div>
          {sessions.map(s => <SessionCard key={s.stateString} stateString={s.stateString}/>)}
        </div>
        <div className="flex justify-center  ">
          <SessionCreator />
        </div>
        
      </div>
      <p>Web Requests:</p>
      <div className="flex flex-col ">

        <div className="flex justify-center">
          <RequestCreator />
        </div>
      </div>
    </>
  )
}

export default Testbed;
