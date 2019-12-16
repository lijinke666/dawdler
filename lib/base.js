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
const ora = require("ora");

const {
  replacePkgName,
  replaceDbContent,
  replaceProjectName
} = require("./helper");
const promptHelper = require("./promptHelper");

module.exports = async _projectType => {
  const { name, type, typescript } = await promptHelper.showInitPrompt();
  let dbName = "";

  switch (type) {
    case projectType["NODE"]:
      const dbInfo = await promptHelper.showNODEPrompt();
      dbName = dbInfo.dbName;
      break;
  }

  const templateUrl = !_projectType
    ? projectTemplateUrl[type]
    : projectTemplateUrl[_projectType];

  const branch = typescript ? "typescript" : "master";
  //拉取项目模板
  const gitFetchShell = `git clone -b ${branch} ${templateUrl} ${name} && cat ${name}/package.json`;
  const spinner = ora(
    "Start generating the project. Please waiting ..."
  ).start();

  exec(gitFetchShell, (error, stdout, stderr) => {
    if (error) {
      spinner.fail();
      console.log(error);
      process.exit();
    }
    // 替换 package.json 里面的项目名
    let newPkgContent = "";

    if (type === projectType["NODE"] || type === projectType["REACT"]) {
      newPkgContent = replacePkgName(stdout, name);
    } else {
      newPkgContent = replaceProjectName(stdout, name);
      try {
        const readmePath = `${name}/README.md`;
        const readme = fs.readFileSync(readmePath).toString();
        const newReadMe = replaceProjectName(readme, name);
        fs.writeFileSync(readmePath, newReadMe);
      } catch (error) {
        console.log(error);
        spinner.fail();
        process.exit();
      }
    }

    try {
      if (dbName) {
        const selectDbName = dbNames.find(name => name !== dbName);
        const dbPath = `${name}/src/db`;
        const apiPath = `${name}/src/api/test.js`;

        rimraf.sync(`${dbPath}/${selectDbName}-models`);
        rimraf.sync(`${dbPath}/${selectDbName}-schemas`);

        const apiContent = fs.readFileSync(apiPath).toString();

        fs.writeFileSync(apiPath, replaceDbContent(apiContent, dbName));
      }

      //写入项目名字
      fs.writeFileSync(`${name}/package.json`, newPkgContent);

      //删除模板.git 文件
      rimraf.sync(`${name}/.git`);

      spinner.succeed("generator completed!");
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
      spinner.fail();
      process.exit();
    }
  });
};
