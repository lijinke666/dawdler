const path = require("path");
const assert = require('assert')
const coffee = require("coffee");
const { version } = require("../package.json");
const { projectType,initQuestions } = require("../lib/config");
const promptHelper = require("../lib/promptHelper");

describe("Dawdler Commands Tests", () => {
  describe("#Commands", () => {
    it(`should show version ${version}`, done => {
      coffee
        .fork(path.resolve(__dirname, "../bin/dawdler"), ["-V"])
        .expect("stdout", `${version}\n`)
        .expect("code", 0)
        .end(done);
    });
    it(`should show helper infos`, done => {
      coffee
        .fork(path.resolve(__dirname, "../bin/dawdler"), ["-h"])
        .expect("stdout", /^\n*\s*usage/i)
        .expect("code", 0)
        .end(done);
    });
  });
  describe("#promptHelper.showInitPrompt()", () => {
    it("should prompt name and project type. default name:dawdler-project.type:REACT", async () => {
      const { name, type } = await promptHelper.showInitPrompt();
      assert(name === initQuestions[0].default() && type === projectType.REACT);
    });
  });
});
