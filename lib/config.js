/**
 * @name config.js 
 * @description 项目基本配置
*/
const { Separator } = require('inquirer')

//支持的项目模板类型
const projectType = {
    REACT: "REACT",
    NODE: "NODE",
    NPM: "NPM"
}

//预置问题
const initQuestions = [
    {
        type: "input",
        name: "name",
        message: "Project name",
        default: () => "dawdler-project"
    }
]

const selectQuestion = [{
    type: 'list',
    message: 'Select project type',
    name: 'type',
    choices: Object.values(projectType),
    default: () => projectType[0]
}]

//TODO:
const nodeQuestions = [
    {
        type: 'list',
        message: 'Select database',
        name: 'database',
        choices: ['mongodb | mongoose', 'mysql | sequelize'],
        default: () => "mongodb | mongoose"
    }
]
const reactQuestions = []
const npmQuestions = []



const config = {
    //项目类型
    projectType,
    projectTemplateUrl: {
        [projectType.REACT]: "https://github.com/lijinke666/react-project-template.git",
        [projectType.NODE]: "https://github.com/lijinke666/node-project-template.git",   
        [projectType.NPM]: "--",    //TODO 
    },
    initQuestions: [...initQuestions, ...selectQuestion],
    nodeQuestions: [...initQuestions, ...nodeQuestions],
    reactQuestions: [...initQuestions, ...reactQuestions],
    npmQuestions: [...initQuestions, ...npmQuestions],
}

module.exports = config