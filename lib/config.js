/**
 * @name config.js 
 * @description 项目基本配置
*/
const { Separator } = require('inquirer')

//支持的项目模板类型
const projectType = {
    REACT: "React",
    NODE: "Node",
    INIT:"Init"
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
    validate(answer) {
        if (answer.length < 1) {
            return 'You must Select a project type.'
        }
        return true
    },
    default: () => projectType[0]
}]

//TODO:
const nodeQuestions = []
const reactQuestions = []



const config = {
    //项目类型
    projectType,
    projectTemplateUrl: {
        [projectType.REACT]: "https://github.com/lijinke666/react-project-template.git",
        [projectType.NODE]: "https://github.com/lijinke666/react-project-template.git",    //TODO 
    },
    initQuestions:[...initQuestions,...selectQuestion],
    nodeQuestions:[...initQuestions,...nodeQuestions],
    reactQuestions:[...initQuestions,...reactQuestions] ,
}

module.exports = config