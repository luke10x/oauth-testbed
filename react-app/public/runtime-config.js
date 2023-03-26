const OIDC_AUTH = 'http://localhost:28080/realms/bigrealm'
window.__runtimeEnvironmentConfig = {
  authProviders: [
    {
      name: 'Local Keycloak',
      authenticateEndpoint: `${OIDC_AUTH}/protocol/openid-connect/auth`,
      redirectUri: "http://localhost:13000",
      tokenEndpoint: `${OIDC_AUTH}/protocol/openid-connect/token`,
      oidcClientId: 'reactclient',
      audience: 'unused',
    }
  ],
  restrictedBackendEndpoint: 'http://localhost:18080/secret',
  backendUrlBase: 'http://localhost:18080',
}