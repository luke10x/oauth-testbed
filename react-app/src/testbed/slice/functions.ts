import { AuthorizationCodePkceFlow } from "./reducer"

import config, { AuthProviderDetails } from "../config";
const { authProviders } = config
 
const buildPkceAuthParams = (flow: AuthorizationCodePkceFlow, authProvidersDetails: AuthProviderDetails) => {

  const body = new URLSearchParams()

  body.set('response_type', 'code')
  body.set('client_id', authProvidersDetails.oidcClientId)
  body.set('redirect_uri', authProvidersDetails.redirectUri)

  // body.set('scope', flow.scopes.join(' '))
  body.set('scope', 'openid profile email api offline_access')
  
  body.set('state', flow.stateString)
  body.set('code_challenge', flow.codeChallenge)
  body.set('code_challenge_method', 'S256')
  body.set('nonce', flow.codeChallenge.substring(0,5))

  return body.toString()
}

const buildTokenParams = (flow: AuthorizationCodePkceFlow, authProvidersDetails: AuthProviderDetails) => {
  const body = new URLSearchParams()

  body.set('grant_type', 'authorization_code')
  body.set('client_id', authProvidersDetails.oidcClientId)
  body.set('code_verifier', flow.codeVerifier)
  body.set('code', flow.code!)
  body.set('redirect_uri', authProvidersDetails.redirectUri)
  if (authProvidersDetails.audience !== undefined) {
    body.set('audience', authProvidersDetails.audience)
  }

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
