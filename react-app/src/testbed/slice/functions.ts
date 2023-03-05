import { redirectUri } from "../config"
import { AuthorizationCodePkceFlow } from "./reducer"

 
const buildPkceAuthParams = (flow: AuthorizationCodePkceFlow) => {

  const body = new URLSearchParams()

  body.set('response_type', 'code')
  body.set('client_id', 'reactclient')
  body.set('redirect_uri', redirectUri)
  body.set('scope', flow.scopes.join(' '))
  body.set('state', flow.stateString)
  body.set('code_challenge', flow.codeChallenge)
  body.set('code_challenge_method', 'S256')

  return body.toString()
}

const buildTokenParams = (flow: AuthorizationCodePkceFlow) => {
  const body = new URLSearchParams()

  body.set('grant_type', 'authorization_code');
  body.set('client_id', 'reactclient');
  body.set('code_verifier', flow.codeVerifier);
  body.set('code', flow.code!);
  body.set('redirect_uri', redirectUri);

  return body.toString()
}

export { buildPkceAuthParams, buildTokenParams }
