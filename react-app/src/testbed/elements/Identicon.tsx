import React from 'react'
import { FC } from "react";
import { toSvg } from "jdenticon";

interface IdenticonProps {
  payload: string
}
export const Identicon: FC<IdenticonProps> = ({ payload }) => {
  const image = toSvg(payload, 64)
  return (
    <div>
      <img src={`data:image/svg+xml;utf8,${encodeURIComponent(image)}`} />
    </div>
  )
}