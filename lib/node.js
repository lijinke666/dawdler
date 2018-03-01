/**
 * @name node.js
 * @description 创建nodejs模块
 */

const chalk = require('chalk')       //彩色输出
const fs = require('fs')
const prompt = require('./prompt')

module.exports = ()=> async ()=>{
    const answer = await prompt()
    console.log(a);
}