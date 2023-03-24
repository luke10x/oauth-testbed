interface RuntimeConfig {
  authenticateEndpoint: string
  redirectUri: string
  tokenEndpoint: string
  restrictedBackendEndpoint: string
  backendUrlBase: string
  oidcClientId: string
}

interface RuntimeConfigContainer {
  __runtimeEnvironmentConfig: RuntimeConfig
}
const globalWindow = (window as unknown as RuntimeConfigContainer)

const config: RuntimeConfig = globalWindow.__runtimeEnvironmentConfig

export default config;
