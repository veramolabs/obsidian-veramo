import { IResolver, createAgent, TAgent } from '@veramo/core'
import { DIDResolverPlugin } from '@veramo/did-resolver'
import { getResolver as ethrDidResolver } from 'ethr-did-resolver'
import { getResolver as webDidResolver } from 'web-did-resolver'
import { ICredentialVerifier, CredentialPlugin} from '@veramo/credential-w3c'
import {
  CredentialIssuerLD,
  ICredentialIssuerLD,
  LdDefaultContexts,
  VeramoEcdsaSecp256k1RecoverySignature2020,
  VeramoEd25519Signature2018,
} from '@veramo/credential-ld'
import { contexts as credential_contexts } from '@transmute/credentials-context'

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
      new CredentialPlugin(),
      new CredentialIssuerLD({
        contextMaps: [LdDefaultContexts, credential_contexts as any],
        suites: [new VeramoEcdsaSecp256k1RecoverySignature2020(), new VeramoEd25519Signature2018()],
      }),
    ]
  })
}
