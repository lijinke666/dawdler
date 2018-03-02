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

module.exports = async (_projectType = projectType['react']) => {
    console.log(_projectType);
    const {
        name
    } = await promptHelper[`show${_projectType}Prompt`]()

    //拉取项目模板
    const gitFetchShell = `git clone ${projectTemplateUrl[_projectType]} ${name} && cd ${name}/package.json`
    console.log(chalk.white('\n Start pulling the project. Please waiting ...'))

    exec(gitFetchShell, (error, stdout, stderr) => {
        if (error) {
          console.log(error)
          process.exit()
        }
        console.log(stdout);
        console.log(chalk.green('\n √ generator completed!'))
        console.log(chalk.cyan('\n ^_^ Thank you for using xx. Currently, the project is in development. I am looking forward to your participation.\n'))
        process.exit()
      })

    // const t = fs.readdirSync(path.join(__dirname,'../test333/package.json')).toString()
    // console.log(t);
}