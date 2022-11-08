import * as React from "react";
import * as ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { App, MarkdownRenderChild } from 'obsidian';
import { CredentialVerificationView } from "./CredentialVerificationView";
import { ConfiguredAgent } from './veramo';

export class CredentialVerifier extends MarkdownRenderChild {

  text: string;
  agent: ConfiguredAgent
  app: App

  constructor(containerEl: HTMLElement, text: string, agent: ConfiguredAgent, app: App) {
    super(containerEl);

    this.text = text;
    this.agent = agent;
    this.app = app;
  }

  async onload() {
    try {
      const result = await this.agent.verifyCredential({
        credential: JSON.parse(this.text)
      });
  
      createRoot(this.containerEl)
        .render(
          <React.StrictMode>
            <CredentialVerificationView verifyResult={result} app={this.app}/>
          </React.StrictMode>
        );
  
    } catch (e) {
      const emojiEl = this.containerEl.createSpan({
        text: e.message,
      });
      this.containerEl.replaceWith(emojiEl);
    }
  }

  onunload(): void {
    ReactDOM.unmountComponentAtNode(this.containerEl);
  }
}
