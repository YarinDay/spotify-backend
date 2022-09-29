const MongoClient = require('mongodb').MongoClient

const config = require('../config')

module.exports = {
    getCollection
}

// Database Name
const dbName = 'spotify_db'

var dbConn = null

async function getCollection(collectionName) {
    try {
        console.log('pre test')
        const db = await connect()
        console.log(db)
        console.log('test')
        const collection = await db.collection(collectionName)
        console.log('test2')
        return collection
    } catch (err) {
        logger.error('Failed to get Mongo collection', err)
        throw err
    }
}

async function connect() {
    console.log('dbconn', dbConn)
    if (dbConn) return dbConn
    try {
        const client = await MongoClient.connect(config.dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log('client',client)
        const db = client.db(dbName)
        dbConn = db
        console.log('db :', db)
        return db
    } catch (err) {
        logger.error('Cannot Connect to DB', err)
        throw err
    }
}




