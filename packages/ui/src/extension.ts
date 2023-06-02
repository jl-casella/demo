import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
  console.log('Extension "ui" is now active!');

  // Register commands
  const helloDisposable = vscode.commands.registerCommand('ui.versionNumber', () => {
    vscode.window.showInformationMessage('Sol Analyzer: version 1.0.0');
  });

  const analizeCodeDisposable = vscode.commands.registerCommand('ui.analizeCode', () => {
    const code = vscode.window.activeTextEditor?.document?.getText();
    console.log('Code: ', code);

    // Create a panel to host the webview
    const panel = vscode.window.createWebviewPanel(
      'webviewExample',
      'Code analyzer',
      vscode.ViewColumn.Two,
      {
        enableScripts: true,
        localResourceRoots: [
          vscode.Uri.file(context.extensionPath),
          vscode.Uri.file(path.join(context.extensionPath, 'dist')),
        ]
      }
    );
    const bundle = vscode.Uri.file(path.join(context.extensionPath, 'dist', 'bundle.js'));
    const styles = vscode.Uri.file(path.join(context.extensionPath, 'dist', 'styles.css'));
    const bundleSrc = panel.webview.asWebviewUri(bundle);
    const stylesSrc = panel.webview.asWebviewUri(styles);

    // Set the HTML content in the webview panel
    panel.webview.html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="${stylesSrc}">
      </head>
      <body>
        <div id="root"></div>
        <script src="${bundleSrc}" />
      </body>
      </html>
    `;

    panel.webview.postMessage({ code });
  });

  context.subscriptions.push(helloDisposable);
  context.subscriptions.push(analizeCodeDisposable);
}

export function deactivate() {}
