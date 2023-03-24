const OIDC_AUTH = 'http://localhost:28080/realms/bigrealm'

const authenticateEndpoint = `${OIDC_AUTH}/protocol/openid-connect/auth`
const redirectUri = "http://localhost:13000"
const tokenEndpoint = `${OIDC_AUTH}/protocol/openid-connect/token`;
const restrictedBackendEndpoint = 'http://localhost:18080/secret'
const backendUrlBase = 'http://localhost:18080'

window.__runtimeEnvironmentConfig = {
  authenticateEndpoint,
  redirectUri,
  tokenEndpoint,
  restrictedBackendEndpoint,
  backendUrlBase,
}