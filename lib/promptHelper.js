/**
 * @name prompt.js
 * @description 统一处理用户的输入
 */

const {
    prompt
} = require('inquirer')

const {
    projectType,
    initQuestions,
    reactQuestions,
    nodeQuestions
} = require('./config')

const promptHelper = {
    async baseHandler(_projectType){
        try {
            switch(_projectType){
                case projectType["REACT"]: return await prompt(reactQuestions)   
                case projectType["NODE"]: return await prompt(nodeQuestions)   
                default: return await prompt(initQuestions)   
            }
        } catch (e) {
            console.error('[prompt handle error]:',e.message);
        }
    },
    async showInitPrompt(){
        return await this.baseHandler()
    },
    async showReactPrompt(){
        return await this.baseHandler(projectType.react)
    },
    async showNodePrompt(){
        return await this.baseHandler(projectType.node)
    }

}

module.exports =  promptHelper
