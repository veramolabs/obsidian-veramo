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

  onOpen() {
    // this.contentEl.setText("Look at me, I'm a modal! 👀");
    // this.containerEl.
    createRoot(this.contentEl)
    .render(
      <React.StrictMode>
        <h2>Verification result</h2>
        <pre>{JSON.stringify(this.verifyResult, null, 2)}</pre>
      </React.StrictMode>
    );
  }

  onClose() {
    this.contentEl.empty();
    ReactDOM.unmountComponentAtNode(this.contentEl);
  }
}