import { App, Plugin, PluginSettingTab, Setting } from 'obsidian';
import decode from 'jwt-decode';
import { ConfiguredAgent, getAgent } from './veramo'

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
		
		this.registerMarkdownCodeBlockProcessor("jwt+vc", (source, el, ctx) => {
			try {
				const decoded = decode(source)
				el.createEl('pre', {text: JSON.stringify(decoded, null, 2)})

			} catch (e) {
				el.createDiv({text: source})
			}
    });

		this.registerMarkdownCodeBlockProcessor("json+vc", async (source, el, ctx) => {
			try {
				const result = await this.agent.verifyCredential({
					credential: JSON.parse(source)
				})
				el.createEl('pre', {text: JSON.stringify(result, null, 2)})

			} catch (e) {
				el.createDiv({text: source})
			}
    });

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
