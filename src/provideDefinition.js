const path = require("path");
const vscode = require('vscode');
const fs = require('fs');
const { getProjectPath } = require('./utils')

// 匹配requirePlatform引入规则
const reg = /(const|var|let)(([\s]+\{[\s]+))(([,$\w_\{\}\s\n:]*utils[,$:\w_\{\}\s\n]*))([\s]+\}[\s]+\=[\s]+)requirePlatform\([\'\"]([\w]+)[\'\"]\)\.([\w]+)[;\s]/g

// /(const|var|let)(([\s]+\{[\s]+))(([,$\w_\{\}\s\n:]*utils[,$:\w_\{\}\s\n]*))([\s]+\}[\s]+\=[\s]+)requirePlatform\([\'\"]([\w]+)[\'\"]\)\.([\w]+)[;\s]/g

/**
 *

import config from './api.config';
import { filterSdkData } from './filterSdkData/cart';
import setCurrency from './setCurrency';
const { $tiDialog, $tiToast } = requirePlatform('titian-mp').main;
const {
  ecRequest,
  ecStore,
  getInjectionNoVid,
  utils: { getTraceLabelList, sassTamperOptions, debounce },
} = requirePlatform('ec').main;
const { CMS: cmsSdk } = requirePlatform('cms').main;
import { ECartGoodsStatus, EActivityCategory } from './components/utils/const';

[\s,]?][\w]+[]


// 声明符 => const|var|let
// 空格栏目 => ([\s]+\{[\s]+) 

// 
1. XXX,             =>  [$_\w]+[,:\s]*
2. XXX: xxx,        =>  [$_\w]+:\s+[$_\w]+[,\s]
3. xxx: { aaa }     =>  [$_\w]+:\s+\{\s+\s\}[,\s]

/(\b(\w+):\s)?({(\s[\w]+[\s,]?)+})/

// 

// 空格栏 => ([\s]+\}[\s]+\=[\s]+)
// 结尾 requirePlatform('xxxx').xxx; => requirePlatform\([\'\"]([\w]+)[\'\"]\)\.([\w]+)[;\s]



/(const|var|let)(([\s]+\{[\s]+))(([,$\w_\{\}\s\n:]*utils[,$:\w_\{\}\s\n]*))([\s]+\}[\s]+\=[\s]+)requirePlatform\([\'\"]([\w]+)[\'\"]\)\.([\w]+)[;\s]/g
/(const|var|let)(([\s]+{[s]+))(([,$w_{}s\n:]*utils[,$:w_{}s\n]*))([s]+}[s]+=[s]+)requirePlatform(['"]([w]+)['"]).([w]+)[;\s]/g
 * 
 */

/**
    /
        (const|var|let)
        ([\s]+\{[\s]+)
        (
            ([\w]+,)?
            ([\w]+(,|(:\{\s[\w]+\s\},?)))*

            [,$\w_\{\}\s\n:]*utils[,$:\w_\{\}\s\n]*
        )
        ([\s]+\}[\s]+\=[\s]+)
        requirePlatform\([\'\"]([\w]+)[\'\"]\)\.([\w]+)[;\s]/g

 */


// 跳转到定义
function provideDefinition (document, position) {
    // const fileName = document.fileName;
    // const workDir = path.dirname(fileName);
    const word = document.getText(document.getWordRangeAtPosition(position));
    const documentText = document.getText();
    // const line = document.lineAt(position);
    const projectPath = getProjectPath(document); 
    console.log('====== 进入 provideDefinition 方法 ======');
    const reg = new RegExp(`(const|var|let)(([\\s]+\\{[\\s]+))(([,$\\w_\\{\\}\\s\\n:]*${word}[,$:\\w_\\{\\}\\s\\n]*))([\\s]+\\}[\\s]+\\=[\\s]+)requirePlatform\\([\\'\\"]([\\w]+)[\\'\\"]\\)\\.([\\w]+)[;\\s]`)
    const result = documentText.match(reg);
    // 匹配到结果，进行跳转
    if (result) {
        const platformName = result[result.length - 2];
        const packageName = result[result.length - 1];
        const destPath = `${projectPath}/platforms/${platformName}/${packageName}/index.ts`;
        if (fs.existsSync(destPath)) {
            return new vscode.Location(vscode.Uri.file(destPath), new vscode.Position(0, 0));
        }
    }
}

// Activating extension 'crazyurus.miniprogram-vscode-extension' failed: Instrumentation key not found, pass the key in the config to this method or set the key in the environment variable APPINSIGHTS_INSTRUMENTATIONKEY before starting the server.

module.exports = vscode.languages.registerDefinitionProvider(['javascript'], { provideDefinition })