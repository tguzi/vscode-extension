const path = require("path");
const vscode = require('vscode');
const fs = require('fs');
const { getProjectPath } = require('./utils')

// 跳转到定义
function provideDefinition (document, position) {
    const fileName = document.fileName;
    const workDir = path.dirname(fileName);
    const word = document.getText(document.getWordRangeAtPosition(position));
    const line = document.lineAt(position);
    const projectPath = getProjectPath(document); 
    console.log('====== 进入 provideDefinition 方法 ======');
    console.log('fileName: ' + fileName); // 当前文件完整路径
    console.log('workDir: ' + workDir); // 当前文件所在目录
    console.log('word: ' + word); // 当前光标所在单词
    console.log('line: ' + line.text); // 当前光标所在行    
    console.log('projectPath: ' + projectPath); // 当前工程目录
    console.log('/\/package\.json$/.test(fileName): ', /\/package\.json$/.test(fileName))
    // 只处理package.json文件
    if (/\\package\.json$/.test(fileName)) {
        console.log('package:', word, line.text);
        const json = document.getText();
        if (new RegExp(`"(dependencies|devDependencies)":\\s*?\\{[\\s\\S]*?${word.replace(/\//g, '\\/')}[\\s\\S]*?\\}`, 'gm').test(json)) {
            let destPath = `${workDir}/node_modules/${word.replace(/"/g, '')}/package.json`;
            if (fs.existsSync(destPath)) {
                // new vscode.Position(0, 0) 表示跳转到某个文件的第一行第一列
                return new vscode.Location(vscode.Uri.file(destPath), new vscode.Position(0, 0));
            }
        }
    }
}

module.exports = vscode.languages.registerDefinitionProvider(['json'], { provideDefinition })