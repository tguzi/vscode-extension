const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

/**
 * 获取当前所在工程根目录
 * @param {*} document 
 * @returns 
 */
function getProjectPath (document) {
    let projectPath = null;
    if (!document) {
        document = vscode.window.activeTextEditor ? vscode.window.activeNotebookEditor.document : null;
    }    
    if (!document) {
        console.error('当前插件不可执行');
        return projectPath;
    }
    const currentFile = (document.uri ? document.uri : document).path;
    let workspaceFolders = vscode.workspace.workspaceFolders.map(item => item.uri.path);
    // 由于存在Multi-root工作区，暂时没有特别好的判断方法，先这样粗暴判断
    // 如果发现只有一个根文件夹，读取其子文件夹作为 workspaceFolders
    if (workspaceFolders.length == 1 && workspaceFolders[0] === vscode.workspace.rootPath) {
        const rootPath = workspaceFolders[0];
        var files = fs.readdirSync(rootPath);
        workspaceFolders = files.filter(name => !/^\./g.test(name)).map(name => path.resolve(rootPath, name));
    }
    console.log('projectPath: ', workspaceFolders);
    workspaceFolders.forEach(folder => {
        console.log('currentFile: ', folder, currentFile, currentFile.indexOf(folder));
        if (currentFile.indexOf(folder) === 0) {
            projectPath = folder;
        }
        // /c:/Users/WEIMOB/Desktop/weimob/saas-fe-xapp-mall
        // c:\Users\WEIMOB\Desktop\weimob\saas-fe-xapp-mall\package.json
    })
    if (!projectPath) {
        console.error('获取工程根路径异常！');
        return projectPath;
    }
    return projectPath;
}

module.exports = {
    getProjectPath
}