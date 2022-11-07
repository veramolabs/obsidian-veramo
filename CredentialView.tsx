import * as React from "react";
import { VerifiableCredential } from "@veramo/core";

export const CredentialView = ({ credential } : { credential: VerifiableCredential }) => {

  return <div>
    <div>Type: {(credential.type as string[]).join(';')}</div>
    <div>Created at: {credential.issuanceDate}</div>
    <div>Issuer: {(credential.issuer as any).id}</div>
    <pre>{JSON.stringify(credential.credentialSubject, null, 2)}</pre>
  </div>;
};
