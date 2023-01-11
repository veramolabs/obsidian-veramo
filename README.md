# Veramo Obsidian Plugin

## Example VCs to Verify in Plugin

Create a code block with "json+vc" or "jwt+vc"


```json+vc
{
	"issuer": {
		"id": "did:ethr:0x03ddbdef2b1b8040a587eaaa863b2714a20fcc63d52bdbdb71aa411121c22147dd"
	},
	"issuanceDate": "2023-01-11T07:46:48.108Z",
	"@context": ["https://www.w3.org/2018/credentials/v1", "https://veramo.io/contexts/profile/v1", "https://w3id.org/security/suites/secp256k1recovery-2020/v2"],
	"type": ["VerifiableCredential", "Profile"],
	"credentialSubject": {
		"id": "did:ethr:0x03ddbdef2b1b8040a587eaaa863b2714a20fcc63d52bdbdb71aa411121c22147dd",
		"name": "IIW Agent"
	},
	"proof": {
		"type": "EcdsaSecp256k1RecoverySignature2020",
		"created": "2023-01-11T07:46:48Z",
		"verificationMethod": "did:ethr:0x03ddbdef2b1b8040a587eaaa863b2714a20fcc63d52bdbdb71aa411121c22147dd#controller",
		"proofPurpose": "assertionMethod",
		"jws": "eyJhbGciOiJFUzI1NkstUiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..X2xxAXD4wQHKkKihxTMDCPNGfDNwsAmkv3cNi_JcSbYAQD4inBcEz6qm6jpCSC5J4pH5z1G8e6LLHoLlidgECAA"
	}
}
```

```jwt+vc
eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiUHJvZmlsZSJdLCJjcmVkZW50aWFsU3ViamVjdCI6eyJzdGF0ZW1lbnQiOiJJIGFtIHRoZSBldGhyIERJRCBmb3IgdGhlIHZlcmFtbyBoZXJva3UgYWdlbnQifX0sInN1YiI6ImRpZDpldGhyOjB4MDNkZGJkZWYyYjFiODA0MGE1ODdlYWFhODYzYjI3MTRhMjBmY2M2M2Q1MmJkYmRiNzFhYTQxMTEyMWMyMjE0N2RkIiwibmJmIjoxNjczNDE5ODIzLCJpc3MiOiJkaWQ6ZXRocjoweDAzZGRiZGVmMmIxYjgwNDBhNTg3ZWFhYTg2M2IyNzE0YTIwZmNjNjNkNTJiZGJkYjcxYWE0MTExMjFjMjIxNDdkZCJ9.osrtF4Vwty07zd0VoxsL-LtYvSZ1EtX-yyLonmq7gMSSVN00gZAOTaPCAUXNSiUH2PmCIEr3cYYDKZp4idZLhw
```

## How to use

- Clone this repo.
- `npm i` or `yarn` to install dependencies
- `npm run dev` to start compilation in watch mode.

## Manually installing the plugin

- Copy over `main.js`, `styles.css`, `manifest.json` to your vault `VaultFolder/.obsidian/plugins/your-plugin-id/`.

## Improve code quality with eslint (optional)
- [ESLint](https://eslint.org/) is a tool that analyzes your code to quickly find problems. You can run ESLint against your plugin to find common bugs and ways to improve your code. 
- To use eslint with this project, make sure to install eslint from terminal:
  - `npm install -g eslint`
- To use eslint to analyze this project use this command:
  - `eslint main.ts`
  - eslint will then create a report with suggestions for code improvement by file and line number.
- If your source code is in a folder, such as `src`, you can use eslint with this command to analyze all files in that folder:
  - `eslint .\src\`


## API Documentation

See https://github.com/obsidianmd/obsidian-api
