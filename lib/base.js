/**
 * @name base.js
 * @description 通用处理模板模块
 * @reference https://segmentfault.com/a/1190000006190814?utm_source=weekly&utm_medium=email&utm_campaign=email_weekly#articleHeader0
 */

const chalk = require('chalk')       //彩色输出
const fs = require('fs')
const {exec} = require('child_process')
const path = require('path')
const {
    projectTemplateUrl,
    projectType
} = require('./config')

const promptHelper = require('./promptHelper')

module.exports = async (_projectType = projectType['INIT']) => {
    console.log(_projectType);
    
    const {
        name,
        type
    } = await promptHelper[`show${_projectType}Prompt`]()

    const templateUrl = _projectType === projectType['INIT'] ? projectTemplateUrl[type] : projectTemplateUrl[_projectType]
    //拉取项目模板
    const gitFetchShell = `git clone ${templateUrl} ${name} && cd ${name}/package.json`
    console.log(chalk.white('\n Start pulling the project. Please waiting ...'))

    exec(gitFetchShell, (error, stdout, stderr) => {
        if (error) {
          console.log(error)
          process.exit()
        }
        console.log(chalk.green('\n √ generator completed!'))
        console.log(chalk.cyan('\n ^_^ Thank you for using xx. Currently, the project is in development. I am looking forward to your participation.\n'))
        process.exit()
      })

    //TODO 替换 package.json 里面的项目名
}