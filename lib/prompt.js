/**
 * @name prompt.js
 * @description 统一处理用户的输入
 */

 const {
    prompt
 } = require('inquirer')

 const {
     questions
 } = require('./config')

//  module.exports = ()=> async ()=>{
//      const answer = await prompt(questions)
//      return answer
//  }

prompt(questions).then((a)=>{
    console.log(a);
})