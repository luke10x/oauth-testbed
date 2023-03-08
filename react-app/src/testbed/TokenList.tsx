import { FC, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { Identicon } from "./elements/Identicon"
import { loadTokens } from "./slice"

interface TokenListProps {}

const TokenList: FC<TokenListProps> = () => {
  const tokens = useAppSelector(state => state.session.tokens)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (tokens.length === 0) {
      const storedTokens = sessionStorage.getItem('session.tokens')
      if (storedTokens) {
        dispatch(loadTokens(JSON.parse(storedTokens)))
      }
    }
  }, [])

  return (<div className="my-card">

    {tokens.map((t, k) => (<div key={k} className="flex gap-1 w-full justify-center items-center">
      <div className="flex justify-center items-center w-12 h-12
          text-gray-700 text-lg font-bold">
        {t.id}.
      </div>
      <div className="w-12">
        <Identicon payload={t.accessToken} />
      </div>
      <div className="flex flex-1">
        <input readOnly value={t.accessToken} className="flex-1"></input>
      </div>
      <div>
        <a href={`https://jwt.io/#debugger-io?token=${t.accessToken}`}>
          <img 
            className="border border-gray-300 border-2 rounded-full"
          src="http://jwt.io/img/badge.svg" alt="View on JWT.io"/>
        </a>
      </div>
    </div>))}
  </div>)
}

export { TokenList }