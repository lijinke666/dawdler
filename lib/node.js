/**
 * @name node.js
 * @description 创建nodejs模板
 */
const {projectType} = require('./config')
module.exports = require('./base')(projectType.Node)