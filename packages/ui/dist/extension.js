"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.deactivate = exports.activate = void 0;
var vscode = __importStar(require("vscode"));
var path = __importStar(require("path"));
function activate(context) {
    console.log('Extension "ui" is now active!');
    // Register commands
    var helloDisposable = vscode.commands.registerCommand('ui.versionNumber', function () {
        vscode.window.showInformationMessage('Sol Analyzer: version 1.0.0');
    });
    var analizeCodeDisposable = vscode.commands.registerCommand('ui.analizeCode', function () {
        var _a, _b;
        var code = (_b = (_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document) === null || _b === void 0 ? void 0 : _b.getText();
        console.log('Code: ', code);
        // Create a panel to host the webview
        var panel = vscode.window.createWebviewPanel('webviewExample', 'Code analyzer', vscode.ViewColumn.Two, {
            enableScripts: true,
            localResourceRoots: [
                vscode.Uri.file(context.extensionPath),
                vscode.Uri.file(path.join(context.extensionPath, 'dist')),
            ]
        });
        var bundle = vscode.Uri.file(path.join(context.extensionPath, 'dist', 'bundle.js'));
        var styles = vscode.Uri.file(path.join(context.extensionPath, 'dist', 'styles.css'));
        var bundleSrc = panel.webview.asWebviewUri(bundle);
        var stylesSrc = panel.webview.asWebviewUri(styles);
        // Set the HTML content in the webview panel
        panel.webview.html = "\n      <!DOCTYPE html>\n      <html lang=\"en\">\n      <head>\n        <meta charset=\"UTF-8\">\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n        <link rel=\"stylesheet\" href=\"".concat(stylesSrc, "\">\n      </head>\n      <body>\n        <div id=\"root\"></div>\n        <script src=\"").concat(bundleSrc, "\" />\n      </body>\n      </html>\n    ");
        panel.webview.postMessage({ code: code });
    });
    context.subscriptions.push(helloDisposable);
    context.subscriptions.push(analizeCodeDisposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
