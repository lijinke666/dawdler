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
    async baseHandler(_projectType) {
        try {
            switch (_projectType) {
                case projectType["REACT"]:
                    await prompt(reactQuestions)
                    break
                case projectType["NODE"]:
                    await prompt(nodeQuestions)
                    break
                case projectType["NPM"]:
                    await prompt(npmQuestions)
                    break
                default: return await prompt(initQuestions)
            }
        } catch (e) {
            console.error('[prompt handle error]:', e.message);
        }
    },
    async showINITPrompt() {
        return await this.baseHandler()
    },
    async showREACTPrompt() {
        return await this.baseHandler(projectType.REACT)
    },
    async showNODEPrompt() {
        return await this.baseHandler(projectType.NODE)
    },
    async showNPMPrompt() {
        return await this.baseHandler(projectType.NPM)
    }

}

module.exports = promptHelper
