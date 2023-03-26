export interface AuthProviderDetails {
  name: string,
  authenticateEndpoint: string
  redirectUri: string
  tokenEndpoint: string
  oidcClientId: string,
  audience?: string, // required for Auht0, but not KC
}

interface RuntimeConfig {
  authProviders: Array<AuthProviderDetails>,
  restrictedBackendEndpoint: string,
  backendUrlBase: string,
}

interface RuntimeConfigContainer {
  __runtimeEnvironmentConfig: RuntimeConfig
}

const globalWindow = (window as unknown as RuntimeConfigContainer)

const config: RuntimeConfig = globalWindow.__runtimeEnvironmentConfig

export default config
