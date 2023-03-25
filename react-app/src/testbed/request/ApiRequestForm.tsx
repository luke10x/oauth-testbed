import React from 'react'
import { FC, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { executeRequestThunk } from "../slice";

import config from "../config";
import { RedButton } from '../elements/RedButton';
import { BlueSubmit } from '../elements/BlueSubmit';
const { backendUrlBase } = config

const endpoints = [
  { title: "root", url: `${backendUrlBase}/` },
  { title: "/secret", url: `${backendUrlBase}/secret` },
]

interface ApiRequestFormProps {}
const ApiRequestForm: FC<ApiRequestFormProps> = () => {
  const [ endpoint, setEndpoint ] = useState<string>(endpoints[0].url)
  const [ bearer, setBearer ] = useState<string>('');

  const dispatch = useAppDispatch()
  
  const onSelectEndpoint = (event: React.FormEvent<HTMLSelectElement>) => {
    setEndpoint(event.currentTarget.value)
  } 
  const onChangeBearer = (event: React.FormEvent<HTMLInputElement>) => {
    setBearer(event.currentTarget.value)
  } 

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(executeRequestThunk({endpoint, bearer}))
  }

  return (
    <div className="my-card">
      <h2 className="
      text-lg font-bold
      ">New HTTP request</h2>
      <div>
        <form onSubmit={onSubmit}>
            <label htmlFor="endpoint" className="block text-gray-700 font-bold mb-2">
              GET
            </label>
            <select onChange={onSelectEndpoint} id="endpoint" name="endpoint" className="appearance-none border rounded w-full mb-4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                {endpoints.map((e, key) => <option key={key} value={e.url}>{e.title}</option>)}
            </select>

            <label htmlFor="bearer" className="block text-gray-700 font-bold mb-2">
              Authorization: Bearer 
            </label>

            <input onChange={onChangeBearer} id="bearer" name="bearer"
            className="appearance-none border rounded w-full mb-4 py-2 px-3 text-gray-700 leading-tight 
            focus:outline-none focus:shadow-outline"
              value={bearer}
            ></input>

            <BlueSubmit>Submit</BlueSubmit>
        </form>
      </div>
    </div>
  )
}

export { ApiRequestForm }