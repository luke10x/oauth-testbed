import { FC, useEffect } from "react";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addSession, fetchSessionsThunk, sessionSelector, SessionsState } from "./slice/index";
import { useAppDispatch } from "../app/hooks";

interface TestbedProps {
}
const Testbed: FC<TestbedProps> = () => {


  // State for new session name
  const [newSessionName, setNewSessionName] = useState("")

  const session = useSelector(sessionSelector)

  // Dispatch function for adding a new session
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchSessionsThunk())
  }, [])
  const handleAddSession = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(addSession(newSessionName))
    setNewSessionName("")
  }

  return (
    <div>
      <h1>User Sessions</h1> 
      
      {session.loading === false && <div>
        {session.sessions.map((session) => (
          <div key={session.id}>
            <h3>{session.name}</h3>
            <p>ID: {session.id}</p>
            {/* TODO: Add additional session details as needed */}
          </div>
        ))}
      </div>}
      {session.loading === true && <div>Loading...</div>}
      <hr />
      <form onSubmit={handleAddSession}>
        <label>
          New Session Name:
          <input
            type="text"
            value={newSessionName}
            onChange={(event) => setNewSessionName(event.target.value)}
          />
        </label>
        <button type="submit">Create Session</button>
      </form>
    </div>
  )
}

export default Testbed;
function createThunk(arg0: string, arg1: () => SessionsState) {
  throw new Error("Function not implemented.");
}

