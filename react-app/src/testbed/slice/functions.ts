import { AuthorizationCodePkceFlow } from "./reducer"

import config from "../config";
const { redirectUri, oidcClientId } = config
 
const buildPkceAuthParams = (flow: AuthorizationCodePkceFlow) => {

  const body = new URLSearchParams()

  body.set('response_type', 'code')
  body.set('client_id', oidcClientId)
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
  body.set('client_id', oidcClientId);
  body.set('code_verifier', flow.codeVerifier);
  body.set('code', flow.code!);
  body.set('redirect_uri', redirectUri);

  return body.toString()
}
function hashCode(str: string) {
  let hash = 0;
  for (let i = 0, len = str.length; i < len; i++) {
      let chr = str.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

export { buildPkceAuthParams, buildTokenParams, hashCode }
