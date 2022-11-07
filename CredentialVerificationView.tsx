import * as React from "react";
import { IVerifyResult, VerifiableCredential } from "@veramo/core";
import { CredentialView } from "./CredentialView"

export const CredentialVerificationView = ({ verifyResult } : { verifyResult: IVerifyResult }) => {
  const credential = verifyResult.verifiableCredential as VerifiableCredential

  return <div>
    <p>Verified: {verifyResult.verified ? 'Yes' : 'No'}</p>
    {verifyResult.error && <p>Error: {verifyResult.error.message}</p>}
    {!verifyResult.error && <CredentialView credential={credential} />}
  </div>;
};
