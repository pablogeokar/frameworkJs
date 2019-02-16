'use strict'

const variables = require('./variables')

let Connection
let uri

switch (variables.Database.type) {

    case 'mongodb':

        if (!Connection) {
            const mongoose = require('mongoose')
            Connection = mongoose

            if (variables.Database.user && variables.Database.passwd)
                uri = `mongodb://${variables.Database.user}:${variables.Database.passwd}@${variables.Database.host}:${variables.Database.port}/${variables.Database.name}`
            else
                uri = `mongodb://${variables.Database.host}:${variables.Database.port}/${variables.Database.name}`
        }

        Connection.Promise = global.Promise
        Connection.connect(uri, { useNewUrlParser: true })
        Connection.connection.on('connected', () => {
            console.info('Banco de Dados Conectado com Sucesso!');
        });
        Connection.connection.on('disconnected', () => {
            console.warn('Banco de Dados Desconectado');
        });
        Connection.connection.on('error', () => {
            console.info(`A conexão ao Banco de Dados com os parâmetros '${uri}' não atendem aos requisitos da conexão.`);
        })
        break;

    case 'mysql':

        if (!Connection) {
            const sequelize = require('sequelize')
            Connection = sequelize
        }

        console.log('O banco de dados escolhido foi Mysql')
        break;
    case 'sqlite':

        if (!Connection) {
            const sequelize = require('sequelize')
            Connection = sequelize
        }

        console.log('O banco de dados escolhido foi Sqlite3')
        break;

    default:
        break;
}

/*
console.log(variables.Database.type);
console.log(variables.Database.host);
console.log(variables.Database.port);
console.log(variables.Database.user);
console.log(variables.Database.passwd);
console.log(variables.Database.name);
*/
