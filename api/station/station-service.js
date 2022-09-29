const fs = require('fs')
// let gStations = require('../../data/station.json')
const ObjectId = require('mongodb').ObjectId
const dbService = require('../../services/db.service')
const utilService = require('../../services/util.service')

module.exports = {
    query,
    getById,
    add,
    update,
    remove
}

async function query(filterBy) {
    // const criteria = {}
    // const { name, price, inStock } = filterBy
    // if (name) {
    //     const regex = new RegExp(name, 'i')
    //     criteria.name = { $regex: regex }
    // }
    // if (price) {
    //     criteria.price = { $gte: price }
    // }
    // if (inStock) {
    //     criteria.inStock = { $inStock: inStock }
    // }
    try {
        console.log('query')
        const collection = await dbService.getCollection('station')
        console.log('collection :', collection)
        const stations = await collection.find({}).toArray()
        return stations
    } catch (err) {
        console.log('ERROR: cannot find stations')
        throw err
    }
}

async function add(station) {
    try {
        const collection = await dbService.getCollection('station')
        const addedStation = await collection.insertOne(station)
        return addedStation
    } catch (err) {
        logger.error('Cannot insert station', err)
        throw err
    }
}

async function update(station) {
    try {
        var id = ObjectId(station._id)
        delete station._id
        const collection = await dbService.getCollection('station')
        await collection.updateOne({ _id: id }, { $set: { ...station } })

        return station
    } catch (err) {
        logger.error(`cannot update station ${station._id}`, err)
        throw err
    }
}

// function save(station) {
//     if (station._id) {
//         const stationToUpdate = gStations.find(currStation => currStation._id === station._id)
//         stationToUpdate.name = station.name
//         stationToUpdate.price = station.price

//     } else {
//         station._id = utilService.makeId()
//         gStations.push(station)
//     }
//     return _saveStationsToFile()
//         .then(() => station)
// }

// function getById(stationId) {
//     const station = gStations.find(station => station._id === stationId)
//     if (!station) return Promise.resolve(gStations)
//     return Promise.resolve(station)
// }

async function getById(stationId) {
    try {
        const collection = await dbService.getCollection('station')
        const station = collection.findOne({ _id: ObjectId(stationId) })
        return station
    } catch (err) {
        logger.error(`While finding station ${stationId}`, err)
        throw err
    }
}

// function remove(stationId) {
//     const idx = gStations.findIndex(station => station._id === stationId)
//     gStations.splice(idx, 1)
//     return _saveStationsToFile()
// }

async function remove(stationId) {
    try {
        const collection = await dbService.getCollection('station')
        await collection.deleteOne({ _id: ObjectId(stationId) })
        return stationId
    } catch (err) {
        logger.error(`cannot remove station ${stationId}`, err)
        throw err
    }
}