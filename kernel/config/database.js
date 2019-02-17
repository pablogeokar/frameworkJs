'use strict'

const config = require('../../config/database')
const variables = require('./variables')
const path = require('path')

let Connection
let uri

switch (variables.Database.type) {

    case 'mongodb':

        if (!Connection) {

            try {

                const mongoose = require('mongoose')
                Connection = mongoose

                if (variables.Database.user && variables.Database.passwd)
                    uri = `mongodb://${variables.Database.user}:${variables.Database.passwd}@${variables.Database.host}:${variables.Database.port}/${variables.Database.name}`
                else
                    uri = `mongodb://${variables.Database.host}:${variables.Database.port}/${variables.Database.name}`

                Connection.Promise = global.Promise
                Connection.connect(uri, { useNewUrlParser: true })
                Connection.connection.on('connected', () => {
                    console.info('Banco de Dados MongoDB Conectado com Sucesso!');
                });
                Connection.connection.on('disconnected', () => {
                    console.warn('Banco de Dados Desconectado');
                });
                Connection.connection.on('error', () => {
                    console.info(`A conexão ao Banco de Dados com os parâmetros '${uri}' não atendem aos requisitos da conexão.`)
                })
                module.exports = Connection

            } catch (error) {
                console.error('Erro ao tentar criar uma conexão ao banco de dados', error)
            }

        } break;
    case 'mysql':

        if (!Connection) {

            try {

                const Sequelize = require('sequelize')
                Connection = Sequelize

                const sequelize = new Connection(variables.Database.name, variables.Database.user, variables.Database.passwd, {
                    host: variables.Database.host,
                    port: variables.Database.port,
                    dialect: 'mysql',
                    /*
                    // pool configuration used to pool database connections                
                    pool: {
                        max: 5,
                        min: 0,
                        acquire: 30000,
                        idle: 10000
                    },
                    */
                    operatorsAliases: false
                })
                console.info('Banco de Dados Mysql Conectado com Sucesso!')
                /*
                //test connection only
                sequelize.query('select 1 as `foo.bar.baz`').then(rows => {
                    console.log(JSON.stringify(rows))
                })
                */
                module.exports = sequelize

            } catch (error) {
                console.error('Erro ao tentar criar uma conexão ao banco de dados', error)
            }

        } break;
    case 'sqlite':

        if (!Connection) {

            try {

                const Sequelize = require('sequelize')
                Connection = Sequelize

                //const sqlite = path.resolve(config.sqlite.path, variables.Database.name)
                const sqlite = path.join(config.sqlite.path, variables.Database.name)
                uri = `sqlite:${sqlite}`

                const sequelize = new Sequelize(uri)

                console.log('Banco de dados Sqlite Conectado com Sucesso!')
                /*
                //test connection only
                sequelize.query('select 1 as `foo.bar.baz`').then(rows => {
                    console.log(JSON.stringify(rows))
                })
                */
                module.exports = sequelize

            } catch (error) {
                console.error('Erro ao tentar criar uma conexão ao banco de dados', error)
            }
        } break;

    default:
        break;
}