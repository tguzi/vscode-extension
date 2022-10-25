const path = require("path");
const vscode = require('vscode');
const fs = require('fs');
const { getProjectPath } = require('./utils')

// 匹配requirePlatform引入规则
const reg = /(?<=(const(.)\{))([\S\s])*(?=(\}(.)\=(.)requirePlatform))/g

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


// const|var|let => 开始值
// ([\s]+\{[\s]+) => 空格栏目

// 
 [,$\w_\{\}\s\n:]*
// 

// ([\s]+\}[\s]+\=[\s]+) => 空格栏
// requirePlatform\([\'\"]([\w]+)[\'\"]\)\.([\w]+)[;\s]  => requirePlatform('xxxx').xxx;


 * 
 */

// const



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