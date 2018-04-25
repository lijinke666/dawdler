const assert = require("assert")
const fs = require('fs')

const {
    replacePkgName,
    replaceDbContent,
    replaceProjectName
} = require("../lib/helper")

const promptHelper = require('../lib/promptHelper')

describe('Dawdler Helper Tests', function(){

    describe('#replacePkgName()', () => {
        it('should replace package.json name', () => {
            const pkg = `
                {
                    "name":"dawdler",
                    "version": "0.2.0"
                }
            `
            const result = `
                {
                    "name":"test",
                    "version": "0.2.0"
                }
            `
            const content = replacePkgName(pkg,'test')
            assert(content === result)
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

    describe('#replaceProjectName()', () => {
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
            const content = replaceProjectName(str,"author")
            assert(content === result)
        })
        it('should replace README.md {name}', () => {
            const md = `
                # {name}
                ## Installation
                npm install {name} -g
            `
            const result = `
                # author
                ## Installation
                npm install author -g
            `
            const content = replaceProjectName(md,"author")
            assert(content === result)
        })
    });
})