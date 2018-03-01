/**
 * @name config.js 
 * @description 项目基本配置
*/
const { Separator } = require('inquirer')

const projectType = ['React', 'Node']

const config = {
    //项目类型
    projectType,
    //预置问题
    questions: [
        {
            type: "input",
            name: "name",
            message: "Project name",
            default: () => "dawdler-project"
        },
        {
            type: 'list',
            message: 'Select project type',
            name: 'type',
            choices: projectType,
            validate(answer) {
                if (answer.length < 1) {
                    return 'You must Select a project type.'
                }
                return true
            },
            default: () => projectType[0]
        }
    ]
}

module.exports = config