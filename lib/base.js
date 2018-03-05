/**
 * @name base.js
 * @description 通用处理模板模块
 * @reference https://segmentfault.com/a/1190000006190814?utm_source=weekly&utm_medium=email&utm_campaign=email_weekly#articleHeader0
 */

const chalk = require('chalk')       //彩色输出
const fs = require('fs')
const { exec } = require('child_process')
const path = require('path')
const _pkg = require('../package.json')
const {
    projectTemplateUrl,
    projectType
} = require('./config')

const promptHelper = require('./promptHelper')

module.exports = async (_projectType) => {
    const fnName = !_projectType ? 'showInitPrompt' : `show${_projectType}Prompt`
    const {
        name,
        type
    } = await promptHelper[fnName]()

    //TODO:
    if(type === projectType.NPM){
        return console.log(chalk.red('npm modules project template in development :('))
    }

    const templateUrl = !_projectType ? projectTemplateUrl[type] : projectTemplateUrl[_projectType]
    //拉取项目模板
    const gitFetchShell = `git clone ${templateUrl} ${name} && cat ${name}/package.json`
    console.log(chalk.white('\n Start pulling the project. Please waiting ...'))

    exec(gitFetchShell, (error, stdout, stderr) => {
        if (error) {
            console.log(error)
            process.exit()
        }
        // 替换 package.json 里面的项目名
        const newPkgContent = stdout.replace(/("name"\s*:)\s*(".*"),.*/gim,`$1"${name}",`)
        fs.writeFile(`${name}/package.json`,newPkgContent,(err)=>{
            if(err){
                console.log(err);
                process.exit()
            }
            console.log(chalk.green('\n √ generator completed!'))
            console.log(chalk.green(`\n ^_^ Thank you for using ${_pkg.name}. Currently, the project is in development. I am looking forward to your participation.\n`))
            process.exit()
        })
    })

}