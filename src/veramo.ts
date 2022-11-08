import { IResolver, createAgent, TAgent } from '@veramo/core'
import { DIDResolverPlugin } from '@veramo/did-resolver'
import { getResolver as ethrDidResolver } from 'ethr-did-resolver'
import { getResolver as webDidResolver } from 'web-did-resolver'
import { ICredentialVerifier, CredentialPlugin} from '@veramo/credential-w3c'

interface Config {
  infuraProjectId: string
}

export type ConfiguredAgent = TAgent<IResolver & ICredentialVerifier>

export const getAgent = (config: Config) => {
  return createAgent<ConfiguredAgent>({
    plugins: [
      new DIDResolverPlugin({
        ...ethrDidResolver({ infuraProjectId: config.infuraProjectId }),
        ...webDidResolver(),
      }),
      new CredentialPlugin()
    ]
  })
}
