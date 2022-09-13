const fs = require('fs')
// let gToys = require('../../data/toy.json')
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
        const collection = await dbService.getCollection('toy')
        const toys = await collection.find({}).toArray()
        console.log(toys);
        return toys
    } catch (err) {
        console.log('ERROR: cannot find toys')
        throw err
    }
}

async function add(toy) {
    try {
        const collection = await dbService.getCollection('toy')
        console.log('toy', toy);
        const addedToy = await collection.insertOne(toy)
        console.log('Hey DICK V_2');
        return addedToy
    } catch (err) {
        logger.error('Cannot insert toy', err)
        throw err
    }
}

async function update(toy) {
    try {
        var id = ObjectId(toy._id)
        delete toy._id
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ _id: id }, { $set: { ...toy } })
        return toy
    } catch (err) {
        logger.error(`cannot update toy ${toy._id}`, err)
        throw err
    }
}

// function save(toy) {
//     if (toy._id) {
//         const toyToUpdate = gToys.find(currToy => currToy._id === toy._id)
//         toyToUpdate.name = toy.name
//         toyToUpdate.price = toy.price

//     } else {
//         toy._id = utilService.makeId()
//         gToys.push(toy)
//     }
//     return _saveToysToFile()
//         .then(() => toy)
// }

// function getById(toyId) {
//     const toy = gToys.find(toy => toy._id === toyId)
//     if (!toy) return Promise.resolve(gToys)
//     return Promise.resolve(toy)
// }

async function getById(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        const toy = collection.findOne({ _id: ObjectId(toyId) })
        return toy
    } catch (err) {
        logger.error(`While finding toy ${toyId}`, err)
        throw err
    }
}

// function remove(toyId) {
//     const idx = gToys.findIndex(toy => toy._id === toyId)
//     gToys.splice(idx, 1)
//     return _saveToysToFile()
// }

async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.deleteOne({ _id: ObjectId(toyId) })
        return toyId
    } catch (err) {
        logger.error(`cannot remove toy ${toyId}`, err)
        throw err
    }
}