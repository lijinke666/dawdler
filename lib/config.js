/**
 * @name config.js
 * @description 项目基本配置
 */
const { Separator } = require("inquirer");

//支持的项目模板类型
const projectType = {
  REACT: "REACT",
  NODE: "NODE",
  NPM_REACT: "NPM-REACT-COMPONENT",
  NPM_NODE: "NPM-NODE-MODULE"
};

const dbNames = ["mysql", "mongodb"];
const npmModuleTypes = {
  REACT: "REACT",
  NODE: "NODE"
};

//预置问题
const initQuestions = [
  {
    type: "input",
    name: "name",
    message: "Project name",
    default: () => "dawdler-project"
  }
];

const selectQuestion = [
  {
    type: "list",
    message: "Select project type",
    name: "type",
    choices: Object.values(projectType),
    default: () => projectType[0]
  },
  {
    type: "confirm",
    message: `Use TypeScript ? (only support ${projectType.REACT})`,
    name: "typescript"
  }
];

//TODO:
const nodeQuestions = [
  {
    type: "list",
    message: "Select database",
    name: "dbName",
    choices: dbNames,
    default: () => dbNames[0]
  }
];
const reactQuestions = [];

const npmReactQuestions = [];
const npmNodeQuestions = [];

const config = {
  //项目类型
  dbNames,
  projectType,
  npmModuleTypes,
  projectTemplateUrl: {
    [projectType.REACT]:
      "https://github.com/lijinke666/react-project-template.git",
    [projectType.NODE]:
      "https://github.com/lijinke666/node-project-template.git",
    [projectType.NPM_REACT]:
      "https://github.com/lijinke666/react-component-project-template.git",
    [projectType.NPM_NODE]:
      "https://github.com/lijinke666/npm-module-template.git"
  },
  initQuestions: [...initQuestions, ...selectQuestion],
  nodeQuestions,
  reactQuestions,
  npmNodeQuestions,
  npmReactQuestions
};

module.exports = config;
