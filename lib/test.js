const test = `
    "name": "react-project-template",
    "version": "1.2.0",
    "description": "react project template",
    "private": true,
    "main": "src/index.js"
`

test.replace(/("name")\s*:\s*(".*"),.*/,'$1:"test",')

console.log(test);