const provideDefinition = require('./src/provideDefinition')

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	context.subscriptions.push(provideDefinition);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
