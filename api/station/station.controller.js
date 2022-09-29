const logger = require('../../services/logger.service')
const stationService = require('./station-service')

module.exports = {
    getStations,
    getStationById,
    addStation,
    updateStation,
    removeStation
}
// router.get('/', (req, res) => {
//   let filterBy = { name: '', price: 0, inStock: true }

//     if (req.query.params) {
//         const params = JSON.parse(req.query.params)
//         filterBy = { name: params.name, price: params.price, inStock: params.inStock }
//       }

//     stationService.query(filterBy)
//         .then(stations => res.send(stations))
// })

async function getStations(req, res) {
    try {
        logger.debug('Getting Stations')
        var queryParams = req.query
        const stations = await stationService.query(queryParams)
        res.json(stations)
    } catch (err) {
        logger.error('Failed to get stations', err)
        res.status(500).send({ err: 'Failed to get stations' })
    }
}

// router.post('/', (req, res) => {
//     const station = req.body
//     stationService.save(station)
//         .then(station => res.send(station))
// })

async function addStation(req, res) {
    try {
        const station = req.body
        const addedStation = await stationService.add(station)
        res.json(addedStation)
    } catch (err) {
        logger.error('Failed to add station', err)
        res.status(500).send({ err: 'Failed to add station' })
    }
}

async function getStationById(req, res) {
    try {
        const stationId = req.params.id // maybe req.params.stationId
        const station = await stationService.getById(stationId)
        res.json(station)
    } catch (err) {
        logger.error('Failed to get station', err)
        res.status(500).send({ err: 'Failed to get station' })
    }
}

async function updateStation(req, res) {
    try {
        const station = req.body
        const updatedStation = await stationService.update(station)
        res.json(updatedStation)
    } catch (err) {
        logger.error('Failed to update station', err)
        res.status(500).send({ err: 'Failed to update station' })

    }
}

// router.get('/:stationId', (req, res) => {
//     // console.log('req.params', req.params)
//     const { stationId } = req.params
//     stationService.getById(stationId)
//         .then((station) => {
//             res.send(station)
//         })
// })

async function removeStation(req, res) {
    try {
        const stationId = req.params.id;
        const removedId = await stationService.remove(stationId)
        res.send(removedId)
    } catch (err) {
        logger.error('Failed to remove station', err)
        res.status(500).send({ err: 'Failed to remove station' })
    }
}

// router.delete('/:stationId', (req, res) => {
//     console.log('Hey');
//     const { stationId } = req.params
//     stationService.remove(stationId)
//         .then(() => res.send({ Removed: `The station ${stationId} removed succesfully` }))
// })
