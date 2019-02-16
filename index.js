require('dotenv').config()
const variables = require('./kernel/config/variables')
const database = require('./kernel/config/database')
const app = require('./kernel/bin/express')

app.listen(variables.Api.port, ()=>{
    console.log(`Servidor ${variables.consoleColors.FgGreen}iniciado${variables.consoleColors.Reset} com Sucesso na porta ${variables.consoleColors.FgCyan} ${variables.Api.port}${variables.consoleColors.Reset}`)
})