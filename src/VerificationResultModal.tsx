import * as React from "react";
import * as ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { IVerifyResult } from "@veramo/core";
import { App, Modal } from "obsidian";

export class VerificationResultModal extends Modal {
  verifyResult: IVerifyResult

  constructor(verifyResult: IVerifyResult, app: App) {
    super(app);
    this.verifyResult = verifyResult;
  }
  
  onClose() {
    this.contentEl.empty();
    ReactDOM.unmountComponentAtNode(this.contentEl);
  }

  onOpen() {
    createRoot(this.contentEl)
      .render(
        <React.StrictMode>
          <h3>Issuer</h3>
          <p>{this.verifyResult.issuer}</p>

          <h3>DID Document</h3>
          <p><pre className="veramo__pre">{JSON.stringify(this.verifyResult.didResolutionResult.didDocument, null, 2)}</pre></p>

          <h3>Signer</h3>
          <p><pre className="veramo__pre">{JSON.stringify(this.verifyResult.signer, null, 2)}</pre></p>

          <h3>Credential</h3>
          <p><pre className="veramo__pre">{JSON.stringify(this.verifyResult.verifiableCredential, null, 2)}</pre></p>
        </React.StrictMode>
      );
  }


}