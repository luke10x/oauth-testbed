import { FC, useEffect, useState } from "react";
import { restoreSessions, Session } from "./slice/index";
import { useAppDispatch } from "../app/hooks";
import { SessionCreator } from "./SessionCreator";
import { SessionCard } from "./SessionCard";
import CodeDetector from "./CodeDetector";

interface TestbedProps {}
const Testbed: FC<TestbedProps> = () => {
  const data = sessionStorage.getItem('my-sessions')
  const storedSessions: Session[] = data === null ? [] : JSON.parse(data)

  const [ sessions, setSessions ] = useState<Session[]>(storedSessions)

  
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(restoreSessions(storedSessions))
    // setSessions(storedSessions)
  }, [])

  return (
    <div>
      <h1>User Sessions</h1> 
      <CodeDetector />
      <div>
        {sessions.map((session) => (
          <SessionCard
              key={session.stateString}
              stateString={session.stateString}
              // codeVerifier={session.codeVerifier} 
              // token={session.accessToken} 
            />
        ))}
      </div>
      
      <hr />

      <SessionCreator />
    </div>
  )
}

export default Testbed;
