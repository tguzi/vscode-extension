const path = require("path");
const vscode = require('vscode');
const fs = require('fs');
const { getProjectPath } = require('./utils')

// 匹配requirePlatform引入规则
const reg = /(?<=(const(.)\{))([\S\s])*(?=(\}(.)\=(.)requirePlatform))/g

// 跳转到定义
function provideDefinition (document, position) {
    // const fileName = document.fileName;
    // const workDir = path.dirname(fileName);
    const word = document.getText(document.getWordRangeAtPosition(position));
    const documentText = document.getText();
    const line = document.lineAt(position);
    // const projectPath = getProjectPath(document); 
    console.log('====== 进入 provideDefinition 方法 ======');
    // const reg = /^(const|var|let).(=.requirePlatform)/
}

module.exports = vscode.languages.registerDefinitionProvider(['javascript'], { provideDefinition })