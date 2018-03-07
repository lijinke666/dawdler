const assert = require("assert")
const fs = require('fs')

const {
    replacePkgName,
    replaceDbContent,
    replacePkgAuthorName
} = require("../lib/helper")

const promptHelper = require('../lib/promptHelper')

describe('Dawdler Tests', function(){

    describe('#replacePkgName()', () => {
        it('should replace package.json name', () => {
            const pkg = fs.readFileSync('../package.json').toString()
            const content = replacePkgName(pkg,'test')
            console.log(pkg);
            // assert.deepEqual(
            //     anagrams('ab'),
            //     ['ab','ba']
            // );
        })
    });
    describe('#replaceDbContent()', () => {
        it('should replace /api/test.js db name', () => {
            const str = "const { T_USER } = require('../db/{__DBNAME__}-models')"
            const result = "const { T_USER } = require('../db/mysql-models')"
            const content = replaceDbContent(str,"mysql")
            assert(content === result)
        })
    });

    describe('#replacePkgAuthorName()', () => {
        it('should replace package.json {name}', () => {
            const str = `
            {
                name:"{name}",
                "keywords": [
                    "dawdler",
                    "{name}"
                  ],
            }`
            const result = `
            {
                name:"author",
                "keywords": [
                    "dawdler",
                    "author"
                  ],
            }`
            const content = replacePkgAuthorName(str,"author")
            assert(content === result)
        })
    });

    describe('#promptHelper.showInitPrompt()', () => {
        it('should prompt name and project type. default name:dawdler-project.type:REACT', async () => {
            const {name,type} = await promptHelper.showInitPrompt()
            assert(name === "dawdler-project" && type==="REACT")
        })
    })
})