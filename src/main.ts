import { App, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { ConfiguredAgent, getAgent } from './veramo'
import { CredentialVerifier } from './CredentialVerifier'
interface VeramoPluginSettings {
	infuraProjectId: string;
}

const DEFAULT_SETTINGS: VeramoPluginSettings = {
	infuraProjectId: '1ee6c910f3444c2e8fb7d52fe226e70f'
}

export default class VeramoPlugin extends Plugin {
	settings: VeramoPluginSettings;
	agent: ConfiguredAgent;

	async onload() {
		await this.loadSettings();
		this.agent = getAgent({ infuraProjectId: this.settings.infuraProjectId })

		this.addSettingTab(new VeramoSettingTab(this.app, this));

		this.registerMarkdownCodeBlockProcessor(
			"jwt+vc", 
			(source, el, ctx) => {
				const credential = {
					proof: {
						type: "JwtProof2020",
						jwt: source
					}
				}
				ctx.addChild(new CredentialVerifier(el, JSON.stringify(credential), this.agent, this.app))
			}
		);

		this.registerMarkdownCodeBlockProcessor(
			"json+vc", 
			(source, el, ctx) => {
				ctx.addChild(new CredentialVerifier(el, source, this.agent, this.app))
			}
		);
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}


class VeramoSettingTab extends PluginSettingTab {
	plugin: VeramoPlugin;

	constructor(app: App, plugin: VeramoPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Settings for Veramo plugin.'});

		new Setting(containerEl)
			.setName('Infura project ID')
			.setDesc('You can register your project at https://infura.io')
			.addText(text => text
				.setPlaceholder('Enter your Infura project ID')
				.setValue(this.plugin.settings.infuraProjectId)
				.onChange(async (value) => {
					console.log('Secret: ' + value);
					this.plugin.settings.infuraProjectId = value;
					await this.plugin.saveSettings();
				}));
	}
}
