#!/usr/bin/env node

/**
 * @description A Cli commands to facility the dev jobs
 * @created 2019/02/16 
 * @author Pablo George <pablogeokar@hotmail.com>
 */

const program = require('commander')
const { prompt } = require('inquirer')
const fs = require('fs')
const path = require('path')

const templateModel = require('./kernel/templates/mongoose.model')

console.log('use -h to see more commands');

program
    .version('0.0.1')
    .description('Zion Management command line')


program
    .command('model <name>')
    .description('Create a Mongoose Model')
    .action(function (name) {
        let Name = name + '.Model.js'
        let pathFile = path.resolve(__dirname, 'models', Name)

        fs.writeFile(pathFile, templateModel(name), err => {
            if (err) throw err
            console.log("Success on create", pathFile)
        })

    })


program.parse(process.argv)