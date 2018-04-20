/**
 * @name prompt.js
 * @description 统一处理用户的输入
 */

const { prompt } = require("inquirer");

const {
  projectType,
  initQuestions,
  reactQuestions,
  nodeQuestions,
  npmNodeQuestions,
  npmReactQuestions
} = require("./config");

const promptHelper = {
  async baseHandler(_projectType) {
    try {
      switch (_projectType) {
        case projectType["REACT"]:
          return await prompt(reactQuestions);
          break;
        case projectType["NODE"]:
          return await prompt(nodeQuestions);
          break;
        case projectType["NPM_NODE"]:
          return await prompt(npmNodeQuestions);
          break;
        case projectType["NPM_REACT"]:
          return await prompt(npmReactQuestions);
          break;
        default:
          return await prompt(initQuestions);
      }
    } catch (e) {
      console.error("[prompt handle error]:", e.message);
    }
  },
  async showInitPrompt() {
    return await this.baseHandler();
  },
  async showREACTPrompt() {
    return await this.baseHandler(projectType.REACT);
  },
  async showNODEPrompt() {
    return await this.baseHandler(projectType.NODE);
  },
  async showNPMPrompt(type = projectType.NPM_REACT) {
    return await this.baseHandler(type);
  }
};

module.exports = promptHelper;
