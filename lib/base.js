/**
 * @name base.js
 * @description 通用处理模板模块
 * @reference https://segmentfault.com/a/1190000006190814?utm_source=weekly&utm_medium=email&utm_campaign=email_weekly#articleHeader0
 */

const chalk = require("chalk"); //彩色输出
const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");
const _pkg = require("../package.json");
const { projectTemplateUrl, projectType, dbNames } = require("./config");
const rimraf = require("rimraf");

const {
  replacePkgName,
  replaceDbContent,
  replacePkgAuthorName
} = require("./helper");
const promptHelper = require("./promptHelper");

module.exports = async _projectType => {
  const { name, type } = await promptHelper.showInitPrompt();
  let dbName = "";

  switch (type) {
    case projectType["NPM_NODE"]:
      return console.log(
        chalk.red("npm modules project template for node in development :(")
      );
    case projectType["NODE"]:
      const dbInfo = await promptHelper.showNODEPrompt();
      dbName = dbInfo.dbName;
      break;
  }

  const templateUrl = !_projectType
    ? projectTemplateUrl[type]
    : projectTemplateUrl[_projectType];
  //拉取项目模板
  const gitFetchShell = `git clone ${templateUrl} ${name} && cat ${name}/package.json`;
  console.log(chalk.cyan("\n Start generating the project. Please waiting ..."));

  exec(gitFetchShell, (error, stdout, stderr) => {
    if (error) {
      console.log(error);
      process.exit();
    }
    // 替换 package.json 里面的项目名
    let newPkgContent = replacePkgName(stdout, name);

    if (type === projectType["NPM_REACT"]) {
      newPkgContent = replacePkgAuthorName(newPkgContent, name);
    }

    try {
      if (dbName) {
        const other = dbNames.filter(name => name !== dbName)[0];
        const dbPath = `${name}/src/db`;
        const apiPath = `${name}/src/api/test.js`;

        rimraf.sync(`${dbPath}/${other}-models`);
        rimraf.sync(`${dbPath}/${other}-schemas`);

        const apiContent = fs.readFileSync(apiPath).toString();

        fs.writeFileSync(apiPath, replaceDbContent(apiContent, dbName));
      }

      fs.writeFileSync(`${name}/package.json`, newPkgContent);
      console.log(chalk.green("\n √ generator completed!"));
      console.log(
        chalk.green(
          `\n ^_^ Thank you for using ${
            _pkg.name
          }. Currently, the project is in development. I am looking forward to your participation.\n`
        )
      );
      process.exit();
    } catch (error) {
      console.log(error);
      process.exit();
    }
  });
};
